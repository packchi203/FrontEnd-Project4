import _ from 'lodash'
import React, { useState, useEffect } from 'react';
import { Tag, columns } from './columns';
import { DataTable } from '../data-table';
import { AdminLayout } from '@/components/layouts'
import { NextPageWithLayout, PostModel } from '@/models'
import toast from 'react-hot-toast';
import CreateTagForm from './create_tag'; // Adjust the path as needed
import {PlusIcon} from '@heroicons/react/24/outline'
import styles from './create_tag.module.css';

const Home: NextPageWithLayout = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  function Page() {
    const [data, setData] = useState<Tag[] | null>(null);

    const [token, setToken] = useState<string>('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiYWNoY2hpMjAwM3ZuQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlzcyI6IkFQVEVDSCIsImV4cCI6MTcwMDM4NDA0Mn0.GiolGkFY74uweBihRIUSoO96I2YQteLbPQOM5eBDtUE'); // Added state for the authentication token
    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async () => {
      try {
        // Make sure to include the protocol (http/https)
        const response = await fetch('http://localhost:8080/api/admin/tags', {
          headers: {
            Authorization: `Bearer ${token}`, // Include the authentication token in the request headers
          },
        });
    
        if (!response.ok) {
          // Handle error response
          console.error(`Error fetching data: ${response.statusText}`);
          return;
        }
    
        const result: Tag[] = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const handleCreateTag = async (tagData: { name: string; description: string; slug: string }) => {
      try {
        // Check for empty values
        if (!tagData.name.trim() || !tagData.description.trim() || !tagData.slug.trim()) {
          toast.error('Vui lòng điền đầy đủ thông tin.', {
            icon: '❌',
          });
          return;
        }
    
        const response = await fetch('http://localhost:8080/api/tags', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(tagData),
        });
    
        if (!response.ok) {
          if (response.status === 500) {
            // Handle specific case where name is already used
            toast.error('Tên đã được sử dụng. Vui lòng chọn một tên khác.', {
              icon: '❌',
            });
          } else {
            // Handle other error responses
            console.error(`Error creating tag: ${response.statusText}`);
            toast.error('Đã xảy ra lỗi khi tạo tag.', {
              icon: '❌',
            });
          }
          return;
        }
    
        // Refresh the data after creating a new tag
        fetchData();
        // Optionally, you can close the form after creating a tag
        setShowCreateForm(false);
        // Show a success message
        toast.success('Tag đã được tạo thành công!', {
          icon: '👍',
        });
      } catch (error) {
        console.error('Error creating tag:', error);
        toast.error('Đã xảy ra lỗi khi tạo tag.', {
          icon: '❌',
        });
      }
    };
    const handleCloseForm = () => {
      setShowCreateForm(false);
    };
    
    
    const handleTokenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setToken(event.target.value);
    };

    return (
      <section className='py-24'>
      <div className='container'>
        <input type="text" value={token} onChange={handleTokenChange} />
        <h1 className='mb-6 text-3xl font-bold'>All Tags</h1>
        <button onClick={() => setShowCreateForm(true)} className={`${styles.createTagButton} inline-flex`}>
  <PlusIcon className='-ml-1 mr-2 h-5 w-5 text-gray-500 dark:text-gray-100' aria-hidden='true' />
  Create New Community
</button>

        {showCreateForm && <CreateTagForm onCreateTag={handleCreateTag} onClose={handleCloseForm} />}
        {data ? (
          <DataTable columns={columns} data={data} />
        ) : (
          <p></p>
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
