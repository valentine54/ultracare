import React, { useEffect, useState } from "react";
import Article1 from "../../../assets/Article1.png";
import Article2 from "../../../assets/Article2.png";
import Article3 from "../../../assets/Article3.png";

const BlogSection = () => {
  const blogs = [
    {
      id: 1,
      category: "INSURANCE",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      description:
        "Massa ultricies mi quis hendrerit dolor magna. Tortor dignissim convallis ornare suspendisse sed nisi lacus sed",
      image: Article1,
    },
    {
      id: 2,
      category: "FUNDING",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      description:
        "Massa ultricies mi quis hendrerit dolor magna. Tortor dignissim convallis ornare suspendisse sed nisi lacus sed",
      image: Article2,
    },
    {
      id: 3,
      category: "PAYMENT",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      description:
        "Massa ultricies mi quis hendrerit dolor magna. Tortor dignissim convallis ornare suspendisse sed nisi lacus sed",
      image: Article3,
    },
  ];

  // Calculate how many sets we need to ensure no gaps
  const [containerWidth, setContainerWidth] = useState(0);
  const [numDuplicates, setNumDuplicates] = useState(3);

  useEffect(() => {
    const updateDuplicates = () => {
      const cardWidth = 350; // Width of each card in pixels
      const screenWidth = window.innerWidth;
      // Calculate how many sets we need to fill twice the screen width
      const setsNeeded = Math.ceil(
        (screenWidth * 2) / (cardWidth * blogs.length)
      );
      setNumDuplicates(Math.max(setsNeeded, 3)); // Minimum of 3 sets

      // Update container width for animation
      const totalWidth = blogs.length * cardWidth;
      setContainerWidth(totalWidth);
    };

    updateDuplicates();
    window.addEventListener("resize", updateDuplicates);
    return () => window.removeEventListener("resize", updateDuplicates);
  }, [blogs.length]);

  // Create array with sufficient duplicates
  const duplicatedBlogs = Array(numDuplicates).fill(blogs).flat();

  return (
    <section className="w-full bg-gray-50 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-lg text-blue-600 font-medium mb-2">
            Learn more about Insure
          </h2>
        </div>

        <div className="relative">
          <div
            className="flex animate-scroll gap-6"
            style={{
              "--container-width": `${containerWidth}px`,
            }}
          >
            {duplicatedBlogs.map((blog, index) => (
              <div
                key={`${blog.id}-${index}`}
                className="flex-shrink-0 w-full sm:w-[350px] bg-white rounded-lg overflow-hidden shadow-sm"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm text-blue-600 font-medium uppercase mb-2">
                    {blog.category}
                  </p>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {blog.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-1 * var(--container-width)));
          }
        }

        .animate-scroll {
          animation: scroll 40s linear infinite;
          width: fit-content;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default BlogSection;
