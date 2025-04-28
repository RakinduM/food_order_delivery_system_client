import React, { useState, useRef, useEffect } from "react";
import { XIcon } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

interface RegisterModalProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export function RegisterModal({
  onClose,
  onSwitchToLogin,
}: RegisterModalProps) {
  const [resName, setResName] = useState("");
  const [resAdmin, setResAdmin] = useState("");
  const [type, setType] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [busDoc, setBusDoc] = useState<File | null>(null);
  const [isAvailable, setIsAvailable] = useState(false);
  const [password, setPassword] = useState("");
  const { register, isLoading, error } = useAuth();
  const resNameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Automatically focus on the restaurant name input when the modal opens
    resNameInputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("resName", resName);
    formData.append("resAdmin", resAdmin);
    formData.append("type", type);
    formData.append("address", address);
    formData.append("email", email);
    formData.append("number", number);
    if (busDoc) {
      formData.append("busDoc", busDoc);
    }
    formData.append("isAvailable", isAvailable.toString());
    formData.append("password", password);

    const success = await register(formData);
    if (success) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-labelledby="register-modal-title"
      aria-modal="true"
    >
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close registration modal"
        >
          <XIcon className="h-6 w-6" />
        </button>
        <h2 id="register-modal-title" className="text-2xl font-bold mb-6">
          Register
        </h2>
        {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="resName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Restaurant Name
            </label>
            <input
              id="resName"
              type="text"
              value={resName}
              onChange={(e) => setResName(e.target.value)}
              ref={resNameInputRef}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label
              htmlFor="resAdmin"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Admin Name
            </label>
            <input
              id="resAdmin"
              type="text"
              value={resAdmin}
              onChange={(e) => setResAdmin(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Type
            </label>
            <input
              id="type"
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Address
            </label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label
              htmlFor="number"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <input
              id="number"
              type="tel"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label
              htmlFor="busDoc"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Business Document
            </label>
            <input
              id="busDoc"
              type="file"
              onChange={(e) => setBusDoc(e.target.files?.[0] || null)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label
              htmlFor="isAvailable"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Is Available
            </label>
            <input
              id="isAvailable"
              type="checkbox"
              checked={isAvailable}
              onChange={(e) => setIsAvailable(e.target.checked)}
              className="mr-2"
            />
            <span>Available</span>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button
            onClick={onSwitchToLogin}
            className="text-green-600 hover:text-green-700"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}