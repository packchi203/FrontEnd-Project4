
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { DataTable } from './data-table';
import { AdminLayout } from '@/components/layouts'
import { NextPageWithLayout, PostModel } from '@/models'
import EditPostForm from './edit_post';
interface Post {
  id: number;
  title: string;
  slug: string;
  tags: { name: string }[];
  content: string;
  account: { name: string };
  commentCount: number;
  viewCount: number;
  voteCount: number;
  createdAt: string;
}
const Home: NextPageWithLayout = () => {
  const [data, setData] = useState<Post[]>([]);
  const [token] = useState<string>('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiYWNoY2hpMjAwM3ZuQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlzcyI6IkFQVEVDSCIsImV4cCI6MTcwMDM4NDA0Mn0.GiolGkFY74uweBihRIUSoO96I2YQteLbPQOM5eBDtUE');
  const [showEditForm, setShowEditForm] = useState(false); // Add this line
  const [editPost, setEditPost] = useState<Post | null>(null); // Add this line
  const router = useRouter();
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
    
    const handleEdit = (postId: number) => {
      const postToEdit = data.find((post) => post.id === postId);
      if (postToEdit) {
        setEditPost(postToEdit);
        setShowEditForm(true);
      }
    };
    const handleEditSubmit = async (updatedPost: Post) => {
      try {
        const response = await fetch(`http://localhost:8080/api/admin/posts/${updatedPost.id}`, {
          method: 'PUT', // Use PUT for updating the entire resource
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedPost),
        });
    
        if (!response.ok) {
          console.error(`Error updating post: ${response.statusText}`);
          return;
        }
    
        // Update the data array with the updated post
        setData((prevData) =>
          prevData.map((post) => (post.id === updatedPost.id ? updatedPost : post))
        );
    
        // Hide the edit form
        setShowEditForm(false);
      } catch (error) {
        console.error('Error updating post:', error);
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
            <button onClick={() => router.push(`/bai-dang/${post.slug}`)}>View Post</button>
              <button onClick={() => handleEdit(post.id)}>Edit</button>
              <button onClick={() => handleDelete(post.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
      {/* Add the following code to render the edit form conditionally */}
      {showEditForm && editPost && (
      <EditPostForm
        post={editPost}
        onCancel={() => setShowEditForm(false)}
        onSubmit={handleEditSubmit}
      />
    )}
  </div>
  );
}

Home.Layout = AdminLayout
Home.sidebarRight = true
Home.SidebarLeft = true
Home.requestAuth = false
export default Home
