import _ from 'lodash'
import React, { useState, useEffect } from 'react';
import { Post, columns } from './columns';
import { DataTable } from '../data-table';
import { AdminLayout } from '@/components/layouts'
import { NextPageWithLayout, PostModel } from '@/models'

const Home: NextPageWithLayout = () => {
  function Page() {
    const [data, setData] = useState<Post[] | null>(null);

    const [token, setToken] = useState<string>('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiYWNoY2hpMjAwM3ZuQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlzcyI6IkFQVEVDSCIsImV4cCI6MTcwMDM4NDA0Mn0.GiolGkFY74uweBihRIUSoO96I2YQteLbPQOM5eBDtUE'); // Added state for the authentication token
    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async () => {
      try {
       
        const response = await fetch('http://localhost:8080/api/posts/list', {
          headers: {
            Authorization: `Bearer ${token}`, // Include the authentication token in the request headers
          },
        });
    
        if (!response.ok) {
          // Handle error response
          console.error(`Error fetching data: ${response.statusText}`);
          return;
        }
    
        const result: Post[] = await response.json();
        // Đảo ngược danh sách trước khi cập nhật state
        setData(result.reverse());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    const handleTokenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setToken(event.target.value);
    };
    

    return (
      <section className='py-24'>
        <div className='container'>
        <input type="text" value={token} onChange={handleTokenChange} />
          <h1 className='mb-6 text-3xl font-bold'>All Posts</h1>
          {data ? (
            <DataTable columns={columns} data={data} />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </section>
    );
  }

  return (
    <>
      <Page />
      
    </>
  );
}

Home.Layout = AdminLayout
Home.sidebarRight = true
Home.SidebarLeft = true
Home.requestAuth = false
export default Home
