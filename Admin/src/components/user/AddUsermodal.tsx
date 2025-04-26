import React, { useState } from 'react';
import Modal from '../common/Modal';
interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (userData: {
    name: string;
    email: string;
    role: 'admin' | 'customer' | 'delivery';
    status: 'active' | 'inactive';
  }) => void;
}
const AddUserModal: React.FC<AddUserModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'customer' as const,
    status: 'active' as const
  });
  const [errors, setErrors] = useState({
    name: '',
    email: ''
  });
  const validateForm = () => {
    const newErrors = {
      name: '',
      email: ''
    };
    let isValid = true;
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setFormData({
        name: '',
        email: '',
        role: 'customer',
        status: 'active'
      });
      onClose();
    }
  };
  return <Modal isOpen={isOpen} onClose={onClose} title="Add New User">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input type="text" id="name" value={formData.name} onChange={e => setFormData({
          ...formData,
          name: e.target.value
        })} className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#06C167] focus:ring-[#06C167] sm:text-sm ${errors.name ? 'border-red-500' : ''}`} />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input type="email" id="email" value={formData.email} onChange={e => setFormData({
          ...formData,
          email: e.target.value
        })} className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#06C167] focus:ring-[#06C167] sm:text-sm ${errors.email ? 'border-red-500' : ''}`} />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select id="role" value={formData.role} onChange={e => setFormData({
          ...formData,
          role: e.target.value as 'admin' | 'customer' | 'delivery'
        })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#06C167] focus:ring-[#06C167] sm:text-sm">
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
            <option value="delivery">Delivery Person</option>
          </select>
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select id="status" value={formData.status} onChange={e => setFormData({
          ...formData,
          status: e.target.value as 'active' | 'inactive'
        })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#06C167] focus:ring-[#06C167] sm:text-sm">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="mt-5 sm:mt-6 flex space-x-3">
          <button type="button" onClick={onClose} className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#06C167] focus:ring-offset-2 sm:w-auto">
            Cancel
          </button>
          <button type="submit" className="inline-flex w-full justify-center rounded-md border border-transparent bg-[#06C167] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#05a75a] focus:outline-none focus:ring-2 focus:ring-[#06C167] focus:ring-offset-2 sm:w-auto">
            Add User
          </button>
        </div>
      </form>
    </Modal>;
};
export default AddUserModal;