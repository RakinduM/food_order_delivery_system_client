
import React, { useMemo, useState } from 'react';
import Card from '../components/common/Card';
import UserTable from '../components/user/UserTable';
import UserFilters from '../components/user/UserFilters';
import AddUserModal from '../components/user/AddUsermodal';
import EditUserModal from '../components/user/EditUserModal';
import DeleteConfirmationModal from '../components/user/DeleteConfirmationModal';
import { PlusIcon, DownloadIcon, UploadIcon } from 'lucide-react';
const UserManagement: React.FC = () => {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [filters, setFilters] = useState({
    name: '',
    role: '',
    status: ''
  });
  const [users, setUsers] = useState([{
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    role: 'admin' as const,
    status: 'active' as const,
    dateJoined: 'Jan 10, 2023'
  }, {
    id: '2',
    name: 'Maria Garcia',
    email: 'maria@example.com',
    role: 'customer' as const,
    status: 'active' as const,
    dateJoined: 'Feb 15, 2023'
  }, {
    id: '3',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    role: 'delivery' as const,
    status: 'active' as const,
    dateJoined: 'Mar 5, 2023'
  }, {
    id: '4',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    role: 'customer' as const,
    status: 'inactive' as const,
    dateJoined: 'Apr 20, 2023'
  }, {
    id: '5',
    name: 'Michael Brown',
    email: 'michael@example.com',
    role: 'delivery' as const,
    status: 'active' as const,
    dateJoined: 'May 8, 2023'
  }]);
  const handleFilterChange = (name: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const nameMatch = user.name.toLowerCase().includes(filters.name.toLowerCase());
      const roleMatch = !filters.role || user.role === filters.role;
      const statusMatch = !filters.status || user.status === filters.status;
      return nameMatch && roleMatch && statusMatch;
    });
  }, [users, filters]);
  const handleAddUser = (userData: {
    name: string;
    email: string;
    role: 'admin' | 'customer' | 'delivery';
    status: 'active' | 'inactive';
  }) => {
    const newUser = {
      id: (users.length + 1).toString(),
      dateJoined: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      ...userData
    };
    setUsers([...user, newUser]);
  };
  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };
  const handleDeleteUser = (user: any) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };
  const handleUpdateUser = (updatedUser: any) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };
  const handleConfirmDelete = () => {
    setUsers(users.filter(user => user.id !== selectedUser.id));
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
  };
  return <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage users, their roles, and permissions
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <UploadIcon size={16} className="mr-2" />
            Import
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <DownloadIcon size={16} className="mr-2" />
            Export
          </button>
          <button onClick={() => setIsAddUserModalOpen(true)} className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#06C167] hover:bg-[#05a75a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#06C167]">
            <PlusIcon size={16} className="mr-2" />
            Add User
          </button>
        </div>
      </div>
      <AddUserModal isOpen={isAddUserModalOpen} onClose={() => setIsAddUserModalOpen(false)} onSubmit={handleAddUser} />
      <EditUserModal isOpen={isEditModalOpen} onClose={() => {
      setIsEditModalOpen(false);
      setSelectedUser(null);
    }} onSubmit={handleUpdateUser} user={selectedUser} />
      <DeleteConfirmationModal isOpen={isDeleteModalOpen} onClose={() => {
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
    }} onConfirm={handleConfirmDelete} userName={selectedUser?.name || ''} />
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <UserFilters filters={filters} onFilterChange={handleFilterChange} />
        </div>
        <UserTable users={filteredUsers} onEditUser={handleEditUser} onDeleteUser={handleDeleteUser} />
        <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{' '}
                <span className="font-medium">{filteredUsers.length}</span> of{' '}
                <span className="font-medium">{users.length}</span> users
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-[#06C167] text-sm font-medium text-white">
                  2
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  3
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default UserManagement;
