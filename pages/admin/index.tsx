import _ from 'lodash'
import React, { useState, useEffect } from 'react';
import { User, columns } from './columns';
import { DataTable } from './data-table';
import { AdminLayout } from '@/components/layouts'
import { NextPageWithLayout, PostModel } from '@/models'

const Home: NextPageWithLayout = () => {
  function Page() {
    const [data, setData] = useState<User[] | null>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch('https://64a6f5fc096b3f0fcc80e3fa.mockapi.io/api/users');
          const fetchedData = await res.json();
          setData(fetchedData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);

    return (
      <section className='py-24'>
        <div className='container'>
          <h1 className='mb-6 text-3xl font-bold'>All Users</h1>
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
