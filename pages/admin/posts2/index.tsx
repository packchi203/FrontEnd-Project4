import _ from 'lodash'
import React, { useState, useEffect } from 'react';
import { Post, columns } from './columns';
import { DataTable } from './data-table';
import { AdminLayout } from '@/components/layouts'
import { NextPageWithLayout, PostModel } from '@/models'
import { getPosts, deletePost } from './api';


const Home: NextPageWithLayout = () => {
  const [data, setData] = useState<Post[]>([]);3
  const [token] = useState<string>('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiYWNoY2hpMjAwM3ZuQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlzcyI6IkFQVEVDSCIsImV4cCI6MTcwMDM4NDA0Mn0.GiolGkFY74uweBihRIUSoO96I2YQteLbPQOM5eBDtUE'); // Added state for the authentication token
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
    const handleDelete = async (postId: number) => {
      try {
        const response = await fetch(`http://localhost:8080/api/admin/posts/${postId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          console.error(`Error deleting post: ${response.statusText}`);
          return;
        }
  
        // Xóa bài viết khỏi danh sách khi xóa thành công
        setData((prevData) => prevData.filter((post) => post.id !== postId));
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    };

 return (
    <div>
    <h1>Post List</h1>
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Tags</th>
          <th>Author</th>
          <th>Comment Count</th>
          <th>View Count</th>
          <th>Vote Count</th>
          <th>Created At</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((post) => (
          <tr key={post.id}>
            <td>{post.title}</td>
            <td>{post.tags.map((tag) => tag.name).join(', ')}</td>
            <td>{post.account.name}</td>
            <td>{post.commentCount}</td>
            <td>{post.viewCount}</td>
            <td>{post.voteCount}</td>
            <td>{post.createdAt}</td>
            <td>
              <button onClick={() => handleDelete(post.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
}
Home.Layout = AdminLayout
Home.sidebarRight = true
Home.SidebarLeft = true
Home.requestAuth = false
export default Home
