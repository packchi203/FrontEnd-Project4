// pages/aatest/index.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
  tags: { name: string }[];
  content: string;
  account: { name: string };
  commentCount: number;
  viewCount: number;
  voteCount: number;
  createdAt: string;
}

const Home = () => {
  const [data, setData] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('URL_API'); // Thay 'URL_API' bằng đường link API thực tế
        setData(response.data.content);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Post List</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Tags</th>
            <th>Content</th>
            <th>Author</th>
            <th>Comment Count</th>
            <th>View Count</th>
            <th>Vote Count</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {data.map(post => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>{post.tags.map(tag => tag.name).join(', ')}</td>
              <td>{post.content}</td>
              <td>{post.account.name}</td>
              <td>{post.commentCount}</td>
              <td>{post.viewCount}</td>
              <td>{post.voteCount}</td>
              <td>{post.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
