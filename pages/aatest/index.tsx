import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

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
  const [token, setToken] = useState<string>('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiYWNoY2hpMjAwM3ZuQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlzcyI6IkFQVEVDSCIsImV4cCI6MTcwMDM4NDA0Mn0.GiolGkFY74uweBihRIUSoO96I2YQteLbPQOM5eBDtUE'); 
  const [page, setPage] = useState(1);
  const [noMore, setNoMore] = useState(false);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/posts?page=${page}`);
      setData((prevData) => [...prevData, ...response.data.content]);
      setPage(page + 1);
      if (response.data.content.length === 0) {
        setNoMore(true);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleTokenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToken(event.target.value);
  };

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
          {data.map((post) => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>{post.tags.map((tag) => tag.name).join(', ')}</td>
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
      <InfiniteScroll
        dataLength={data.length}
        next={fetchData}
        hasMore={!noMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more items</p>} children={undefined} />
    </div>
  );
};

export default Home;
