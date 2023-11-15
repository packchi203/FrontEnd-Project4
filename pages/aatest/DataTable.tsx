// components/DataTable.tsx
import React from 'react';
import { adminApi } from 'api-client/admin-api'; // Import từ admin_api.tsx


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
  data: User[] | null;
  accessToken: string;
}

const DataTable: React.FC<DataTableProps> = ({ data, accessToken }) => {
  // ... (phần còn lại của mã)
  if (!data || !Array.isArray(data)) {
    // Nếu data không phải là mảng hoặc là null, trả về thông báo hoặc hiển thị gì đó khác
    return <p>No data available.</p>;
  }
  const fetchData = async () => {
    try {
      const response = await adminApi.getAccounts(); // Sử dụng hàm từ adminApi
      // ... (phần còn lại của mã)
    } catch (error) {
      console.error('Lỗi khi truy xuất dữ liệu:', error);
    }
  };

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
