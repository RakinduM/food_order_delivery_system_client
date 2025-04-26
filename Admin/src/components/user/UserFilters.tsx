import React from 'react';
import { SearchIcon } from 'lucide-react';
interface UserFiltersProps {
  filters: {
    name: string;
    role: string;
    status: string;
  };
  onFilterChange: (name: string, value: string) => void;
}
const UserFilters: React.FC<UserFiltersProps> = ({
  filters,
  onFilterChange
}) => {
  return <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-6">
      <div className="relative max-w-xs flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon size={16} className="text-gray-400" />
        </div>
        <input type="text" placeholder="Search by name..." value={filters.name} onChange={e => onFilterChange('name', e.target.value)} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-[#06C167] focus:border-[#06C167] sm:text-sm" />
      </div>
      <div className="relative max-w-xs">
        <select value={filters.role} onChange={e => onFilterChange('role', e.target.value)} className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#06C167] focus:border-[#06C167] sm:text-sm rounded-md">
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="customer">Customer</option>
          <option value="delivery">Delivery Person</option>
        </select>
      </div>
      <div className="relative max-w-xs">
        <select value={filters.status} onChange={e => onFilterChange('status', e.target.value)} className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#06C167] focus:border-[#06C167] sm:text-sm rounded-md">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
    </div>;
};
export default UserFilters;