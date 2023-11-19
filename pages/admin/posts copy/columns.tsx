// components/column.tsx

import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, ArrowUpDown } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { useState } from 'react';
export interface Post{
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
export const columns: ColumnDef<Post>[] = [

  {
    accessorKey: 'title',
    header: ({ column }) => (
      <Button onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Title <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
  },
  {
    accessorKey: 'tags',
    header: 'Community',
    cell: ({ row }) => (
      <td>{row.original.tags.map(tag => tag.name).join(', ')}</td>
    ),
  },
  {
    accessorKey: 'author',
    header: 'Author',
    cell: ({ row }) => <td>{row.original.account.name}</td>,
  },
  {
    accessorKey: 'commentCount',
    header: 'Comments',
  },

  {
    accessorKey: 'voteCount',
    header: 'Vote',
  },
  {
    accessorKey: 'viewCount',
    header: 'View',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => {
      const date = new Date(String(row.getValue('createdAt')));
      const formatted = ` ${date.toLocaleTimeString()} ${date.toLocaleDateString()}`;
      return <div className='font-medium'>{formatted}</div>;
    },
  },
 
 // ...

 {
  header: 'Actions',
  id: 'actions',
  cell: ({ row }) => {
    const [token] = useState<string>('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiYWNoY2hpMjAwM3ZuQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlzcyI6IkFQVEVDSCIsImV4cCI6MTcwMDM4NDA0Mn0.GiolGkFY74uweBihRIUSoO96I2YQteLbPQOM5eBDtUE'); // Added state for the authentication token
    const post = row.original; // Đổi tên post thành post để phản ánh mục đích
    const handleDelete = (postId: number) => {
      confirmAlert({
        message: `Are you sure you want to delete the post with ID "${postId}"?`,
        buttons: [
          {
            label: 'No',
            onClick: () => {
              toast.info('Deletion canceled.', {
                position: 'top-left',
                autoClose: 300,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            },
          },
          {
            label: 'Yes',
            onClick: () => {
              // Handle the deletion without using an async function
              fetch(`http://localhost:8080/api/admin/posts/${postId}`, {
                method: 'DELETE',
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error(`Error deleting post: ${response.statusText}`);
                  }
                  return response.text(); // Change to text() instead of json()
                })
                .then((data) => {
                  console.log(data); // Log the response for debugging
                  toast.success(`Post with ID ${postId} has been deleted successfully.`, {
                    position: 'top-right',
                    autoClose: 300,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                  // Implement logic to update the UI after deletion
                  // This might involve fetching the updated data or updating the state directly
                })
                .catch((error) => {
                  console.error('Error deleting post:', error);
                });
            },
          },
        ],
      });
    };
    
    
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild style={{ background: 'white' }}>
          <Button className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' style={{ background: 'white' }}>
          <DropdownMenuItem>View Post</DropdownMenuItem>
          <DropdownMenuItem>Edit Post</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDelete(post.id)} style={{ color: 'red' }}>
            Delete Post
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
},



]

