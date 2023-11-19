// components/column.tsx
import { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, ArrowUpDown } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as api from './api'; 
import {baseUrl, token} from './api'

import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
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
      <td>{row.original.tags.map((tag) => tag.name).join(', ')}</td>
    ),
  },
  // {
  //   accessorKey: 'content',
  //   header: 'Content',v
  //   cell: ({ row }) => {
  //     const content = row.original.content;
  //     const truncatedContent = content.length > 100 ? `${content.slice(0, 100)}...` : content;
  //     return <td>{truncatedContent}</td>;
  //   },
  // },
  {
    accessorKey: 'author',
    header: 'Author',
    cell: ({ row }) => <td>{row.original.account.name}</td>,
  },
  {
    accessorKey: 'commentCount',
    header: 'Comment Count',
  },

  {
    accessorKey: 'voteCount',
    header: 'Vote Count',
  },
  {
    accessorKey: 'viewCount',
    header: 'View Count',
  },
  {
    header: 'Actions',
    id: 'actions',
    cell: ({ row }) => {
      const post = row.original;
      const [data, setData] = useState<Post[] | null>(null);
      const getPosts = async (): Promise<Post[]> => {
        try {
          const response = await fetch(`${baseUrl}/posts/list`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      
          if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
          }
      
          const result: Post[] = await response.json();
          return result.reverse();
        } catch (error) {
          console.error('Error fetching data:', error);
          throw error;
        }
      };
      
      const handleDelete = async () => {
        const postId = post.id;
        try {
          await api.deletePost(postId);
      
          // Update the UI or show a success message
          toast.success(`Post with ID ${postId} has been deleted successfully.`, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          // Refresh the data after deletion
          await fetchData();
      
        } catch (error) {
          console.error('Error deleting post:', error);
          // Handle the error, show an error message, or log it
        }
      };
      
      const fetchData = async () => {
        try {
          const posts: Post[] = await getPosts();
          setData(posts);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
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
            <DropdownMenuItem onClick={handleDelete} style={{ color: 'red' }}>
              Delete Post
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];