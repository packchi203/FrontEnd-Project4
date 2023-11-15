// index.tsx
import { AdminLayout } from '@/components/layouts';
import React, { useEffect, useState } from 'react';
import DataTable from './DataTable';
import { NextPageWithLayout, PostModel } from '@/models';
import { adminApi } from 'api-client/admin-api'; 
import handler from 'pages/api/[...path]'; // Import từ token.tsx

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  reputation: number;
  role: string;
  createdAt: string;
}

const HomePage: NextPageWithLayout = () => {
  const [data, setData] = useState<User[]>([]);
  const [token, setToken] = useState<string>(
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiYWNoY2hpMjAwM3ZuQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlzcyI6IkFQVEVDSCIsImV4cCI6MTcwMDM4NDA0Mn0.GiolGkFY74uweBihRIUSoO96I2YQteLbPQOM5eBDtUE'
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await adminApi.getAccounts(); // Sử dụng hàm từ adminApi
      // ... (phần còn lại của mã)
    } catch (error) {
      console.error('Lỗi khi truy xuất dữ liệu:', error);
    }
  };

  const handleTokenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToken(event.target.value);
  };

  return (
    <div>
      <h1>Tài khoản Người dùng</h1>
      <label>
        Token Xác thực:
        <input type="text" value={token} onChange={handleTokenChange} />
      </label>

      {/* Pass accessToken as a prop to DataTable */}
      <DataTable data={data} accessToken={token} />
    </div>
  );
};

HomePage.Layout = AdminLayout;
HomePage.requestAuth = false;
export default HomePage;
