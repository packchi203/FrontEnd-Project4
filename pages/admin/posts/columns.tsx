// components/colum/index.tsx

import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, ArrowUpDown } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



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
  //   header: 'Content',
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
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => {
      const date = new Date(String(row.getValue('createdAt')));
      const formatted = date.toLocaleDateString();
      return <div className='font-medium'>{formatted}</div>;
    },
  },
 
 // ...

 {
  header: 'Actions',
  id: 'actions',
  cell: ({ row }) => {
    const post = row.original; // Đổi tên user thành post để phản ánh mục đích
    const handleDelete = () => {
      // Hiển thị thông báo xác nhận
      toast.warn(`Are you sure you want to delete the post for ${post.id}?`, {
        position: 'top-right',
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        closeButton: true,
        onClose: () => {
          // Xử lý xác nhận xóa ở đây
          // Nếu người dùng đồng ý xóa, thực hiện hành động xóa
          // Nếu không, bạn có thể không cần thực hiện gì cả hoặc đóng modal/xác nhận
        },
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
          <DropdownMenuItem onClick={handleDelete} style={{ color: 'red' }}>
            Delete Post
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
},



]
