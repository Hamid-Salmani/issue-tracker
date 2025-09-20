'use client';

import { Issue } from "@/generated/prisma";

const statusOptions = ['OPEN', 'IN_PROGRESS', 'CLOSED'];
interface Props {
    issue: Issue
}
const SelectInput = ({issue}: Props) => {
    
  return (
  <select
    defaultValue={issue.status}
    onChange={async (e) => {
      const newStatus = e.target.value;
      await fetch(`/api/issues/updateStatus/${issue.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
    }}
    className="bg-white/80 border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-800 shadow-sm focus:outline-none"
  >
    {statusOptions.map((status) => (
      <option key={status} value={status}>
        {status.replace('_', ' ')}
      </option>
    ))}
  </select>  )
}

export default SelectInput