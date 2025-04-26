import React from 'react';
import Modal from '../common/Modal';
interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
}
const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  userName
}) => {
  return <Modal isOpen={isOpen} onClose={onClose} title="Delete User">
      <div className="mt-2">
        <p className="text-sm text-gray-500">
          Are you sure you want to delete user "{userName}"? This action cannot
          be undone.
        </p>
      </div>
      <div className="mt-5 sm:mt-6 flex space-x-3">
        <button type="button" onClick={onClose} className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#06C167] focus:ring-offset-2 sm:w-auto">
          Cancel
        </button>
        <button type="button" onClick={onConfirm} className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto">
          Delete
        </button>
      </div>
    </Modal>;
};
export default DeleteConfirmationModal;