import React from 'react';
type Role = 'admin' | 'customer' | 'delivery';
interface RoleBadgeProps {
  role: Role;
}
const RoleBadge: React.FC<RoleBadgeProps> = ({
  role
}) => {
  const getBadgeStyles = () => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'customer':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'delivery':
        return 'bg-[#DDFBE8] text-[#06C167] border-[#BCEFD3]';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  const getRoleLabel = () => {
    switch (role) {
      case 'admin':
        return 'Admin';
      case 'customer':
        return 'Customer';
      case 'delivery':
        return 'Delivery Person';
      default:
        return role;
    }
  };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getBadgeStyles()}`}>
      {getRoleLabel()}
    </span>;
};
export default RoleBadge;