'use client';

import { useQuery, useLazyQuery } from '@apollo/client';
import {
  GET_ALL_EMPLOYEES,
  GET_EMPLOYEES_BY_DEPARTMENT,
} from '@/graphql/queries';
import Link from 'next/link';
import { useState } from 'react';

export default function HomePage() {
  const { loading, error, data } = useQuery(GET_ALL_EMPLOYEES);
  const [selectedDept, setSelectedDept] = useState('');
  const [getByDept, { data: deptData }] = useLazyQuery(GET_EMPLOYEES_BY_DEPARTMENT);

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const dept = e.target.value;
    setSelectedDept(dept);

    if (dept === '') {
      // Show all employees
      return;
    } else {
      getByDept({ variables: { department: dept } });
    }
  };

  const employees =
    selectedDept === ''
      ? data?.getAllEmployees || []
      : deptData?.getEmployeesByDepartment || [];

  if (loading && !data) return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error.message}</p>;

  return (
    <main className="max-w-3xl mx-auto p-4">

      <h1 className="text-2xl font-bold mb-4 text-center">Employee Directory</h1>

      <div className="mb-4 flex justify-between items-center">
  <Link href="/add-employee" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
    Add New Employee
  </Link>
  <select
    value={selectedDept}
    onChange={handleFilter}
    className="border p-2 rounded"
  >
    <option value="">All Departments</option>
    <option value="Developer">Developer</option>
    <option value="QA">QA</option>
    <option value="Designer">Designer</option>
    <option value="DevOps">DevOps</option>
    <option value="Manager">Manager</option>
    <option value="Intern">Intern</option>
  </select>
</div>


      <table className="w-full border border-gray-300 rounded-md overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-2 border">Name</th>
            <th className="text-left p-2 border">Position</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan={2} className="text-center p-4 text-gray-500">
                No employees found.
              </td>
            </tr>
          ) : (
            employees.map((emp: any) => (
              <tr key={emp.id} className="hover:bg-gray-50">
                <td className="p-2 border text-blue-600 underline">
                  <Link href={`/employee/${emp.id}`}>{emp.name}</Link>
                </td>
                <td className="p-2 border">{emp.position}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </main>
  );
}
