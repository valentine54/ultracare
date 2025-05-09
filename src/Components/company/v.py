def solution(S):
    stack = []
    for char in S:
        if char == '(':
            stack.append(char)
        else:  # char == ')'
            if not stack:
                return 0
            stack.pop()
    return 1 if not stack else 0
