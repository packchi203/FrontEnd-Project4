import { AdminLayout } from '@/components/layouts'
import React, { useEffect, useState } from 'react';
import DataTable from './DataTable';
import { NextPageWithLayout, PostModel } from '@/models'

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
  const [token, setToken] = useState<string>('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiYWNoY2hpMjAwM3ZuQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlzcyI6IkFQVEVDSCIsImV4cCI6MTcwMDM4NDA0Mn0.GiolGkFY74uweBihRIUSoO96I2YQteLbPQOM5eBDtUE'); // Added state for the authentication token

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Make sure to include the protocol (http/https)
      const response = await fetch('http://localhost:8080/api/admin/accounts', {
        headers: {
          Authorization: `Bearer ${token}`, // Include the authentication token in the request headers
        },
      });
  
      if (!response.ok) {
        // Handle error response
        console.error(`Error fetching data: ${response.statusText}`);
        return;
      }
  
      const result: User[] = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleTokenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToken(event.target.value);
  };

  return (
    <div>
      <h1>User Accounts</h1>
      
      {/* Input field for the authentication token */}
      <label>
        Authentication Token:
        <input type="text" value={token} onChange={handleTokenChange} />
      </label>

      <DataTable data={data} />
    </div>
  );
};

HomePage.Layout = AdminLayout
HomePage.requestAuth = false
export default HomePage;
