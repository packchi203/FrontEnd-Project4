// edit_post.tsx

import React, { useState } from 'react';
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

interface EditPostFormProps {
  post: Post;
  onCancel: () => void;
  onSubmit: (updatedPost: Post) => void;
}

const EditPostForm: React.FC<EditPostFormProps> = ({ post, onCancel, onSubmit }) => {
  const [updatedPost, setUpdatedPost] = useState<Post>({ ...post });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(updatedPost);
  };

  return (
    <div style={modalStyles}>
      <form onSubmit={handleSubmit} style={formStyles}>
        {/* Add your form fields here, e.g., title, content, etc. */}
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={updatedPost.title}
          onChange={handleChange}
        />
        {/* Add other form fields as needed */}

        <button type="submit">Update Post</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

const modalStyles: React.CSSProperties = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const formStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

export default EditPostForm;
