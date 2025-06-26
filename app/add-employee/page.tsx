'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_EMPLOYEE } from '@/graphql/mutations';
import { useRouter } from 'next/navigation';

export default function AddEmployeePage() {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    department: '',
    salary: ''
  });
  const [addEmployee, { loading, error }] = useMutation(ADD_EMPLOYEE);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.name || !formData.position || !formData.department || !formData.salary) {
      alert('All fields are required');
      return;
    }

    try {
      await addEmployee({
        variables: {
          name: formData.name,
          position: formData.position,
          department: formData.department,
          salary: parseInt(formData.salary),
        }
      });

      // Redirect to home page
      router.push('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="name"
          placeholder="Employee Name"
          className="w-full border p-2 rounded"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="position"
          placeholder="Position"
          className="w-full border p-2 rounded"
          value={formData.position}
          onChange={handleChange}
        />

        <select
          name="department"
          className="w-full border p-2 rounded"
          value={formData.department}
          onChange={handleChange}
        >
          <option value="">Select Department</option>
          <option value="Developer">Developer</option>
          <option value="QA">QA</option>
          <option value="Designer">Designer</option>
          <option value="DevOps">DevOps</option>
          <option value="Manager">Manager</option>
          <option value="Intern">Intern</option>
        </select>

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          className="w-full border p-2 rounded"
          value={formData.salary}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Adding...' : 'Add Employee'}
        </button>

        {error && (
          <p className="text-red-500 text-sm text-center mt-2">
            Error: {error.message}
          </p>
        )}
      </form>
    </main>
  );
}
