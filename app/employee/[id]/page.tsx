'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { GET_EMPLOYEE_DETAILS } from '@/graphql/queries';
import Link from 'next/link';

export default function EmployeeDetailPage() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_EMPLOYEE_DETAILS, {
    variables: { id },
  });

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error.message}</p>;

  const emp = data.getEmployeeDetails;

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Employee Details</h1>

      <div className="bg-white shadow rounded-md p-4 space-y-2 border">
        <p><strong>Name:</strong> {emp.name}</p>
        <p><strong>Position:</strong> {emp.position}</p>
        <p><strong>Department:</strong> {emp.department}</p>
        <p><strong>Salary:</strong> ₹{emp.salary}</p>
      </div>

      <div className="text-center mt-6">
        <Link href="/" className="text-blue-600 underline">← Back to Home</Link>
      </div>
    </main>
  );
}
