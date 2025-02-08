import React, { useState } from 'react';

interface ProfileFormProps {
  onSubmit: (data: {
    firstName: string;
    lastName: string;
    email: string;
    organization: string;
  }) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    organization: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-300">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          required
          className="mt-1 block w-full rounded-lg bg-dark-light border border-gold-light/20 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold-light"
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-300">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          required
          className="mt-1 block w-full rounded-lg bg-dark-light border border-gold-light/20 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold-light"
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
          Email
        </label>
        <input
          type="email"
          id="email"
          required
          className="mt-1 block w-full rounded-lg bg-dark-light border border-gold-light/20 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold-light"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="organization" className="block text-sm font-medium text-gray-300">
          Organization
        </label>
        <input
          type="text"
          id="organization"
          className="mt-1 block w-full rounded-lg bg-dark-light border border-gold-light/20 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold-light"
          value={formData.organization}
          onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-gold-light to-gold-dark text-dark font-semibold px-6 py-3 rounded-lg hover:from-gold-dark hover:to-gold-light transition-colors"
      >
        Submit Profile Request
      </button>
    </form>
  );
};

export default ProfileForm;