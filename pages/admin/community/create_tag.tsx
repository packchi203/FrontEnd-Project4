// CreateTagForm.tsx
import React, { useState } from 'react';
import styles from './create_tag.module.css';

interface CreateTagFormProps {
    onCreateTag: (tagData: { name: string; description: string; slug: string }) => void;
    onClose: () => void; // Add onClose prop to handle closing the form
  }

const CreateTagForm: React.FC<CreateTagFormProps> = ({ onCreateTag, onClose }) => {
  const [tagName, setTagName] = useState('');
  const [description, setDescription] = useState('');
  const [slug, setSlug] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate the form data if needed
    onCreateTag({ name: tagName, description, slug });
  };

  
  return (
    <div className={styles.createTagForm}>
      <button className={styles.closeButton} onClick={onClose}>
        <span aria-hidden="true">×</span>
      </button>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="tagName">Tag Name:</label>
          <input type="text" id="tagName" value={tagName} onChange={(e) => setTagName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label htmlFor="slug">Slug:</label>
          <input type="text" id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
        </div>
        <button type="submit">Create Tag</button>
      </form>
    </div>
  );
};

export default CreateTagForm;
