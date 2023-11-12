// components/DataTable.tsx
import React from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  reputation: number;
  role: string;
  createdAt: string;
}

interface DataTableProps {
  data: User[] | null; // Thêm kiểu dữ liệu cho data, có thể là mảng hoặc null
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  if (!data || !Array.isArray(data)) {
    // Nếu data không phải là mảng hoặc là null, trả về thông báo hoặc hiển thị gì đó khác
    return <p>No data available.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Username</th>
          <th>Reputation</th>
          <th>Role</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.username}</td>
            <td>{item.reputation}</td>
            <td>{item.role}</td>
            <td>{item.createdAt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
