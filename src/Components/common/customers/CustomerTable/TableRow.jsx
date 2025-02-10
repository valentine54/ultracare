import React from 'react';
import { MoreHorizontal } from 'lucide-react';

const TableRow = ({ customer }) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <img 
            src={customer.logo} 
            alt="" 
            className="w-8 h-8 rounded-lg"
          />
          <div>
            <div className="font-medium text-gray-900">{customer.name}</div>
            <div className="text-sm text-gray-500">{customer.type}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-gray-500">{customer.startDate}</td>
      <td className="px-6 py-4 text-gray-500">{customer.premium}</td>
      <td className="px-6 py-4">
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          customer.status === 'Active' 
            ? 'bg-blue-100 text-blue-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {customer.status}
        </span>
      </td>
      <td className="px-6 py-4 text-gray-500">{customer.dueDate}</td>
      <td className="px-6 py-4">
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal size={20} />
        </button>
      </td>
    </tr>
  );
};

export default TableRow;