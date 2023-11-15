
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

import { Account } from '@/models/account';
import { TagModel } from "@/models/tag"


export interface Post{
  id: number
  title?: string
  slug?: string
  tags?: Array<TagModel>
  content?: string
  author?: Account
  createdAt?: string
  commentCount?: number
  voteCount?: number
  viewCount?:number
}

export const columns: ColumnDef<Post>[] = [
  {
    accessorKey: 'title', // Thay đổi 'name' thành 'title' hoặc tên cột thực tế trong dữ liệu
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          title
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    }
  },
  {
    accessorKey: 'tags',
    header: 'Community'
  },
  {
    accessorKey: 'content',
    header: 'content'
  },
  {
    accessorKey: 'author',
    header: 'Author'
  },
  {
    accessorKey: 'commentCount',
    header: 'Comment Count'
  },
  {
    accessorKey: 'voteCount',
    header: 'Vote Count'
  },
  {
    accessorKey: 'viewCount',
    header: 'View Count'
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => {
      const date = new Date(String(row.getValue('createdAt')))
      const formatted = date.toLocaleDateString()
      return <div className='font-medium'>{formatted}</div>
    }
  },
 // ...

 {
  header: 'Actions',
  id: 'actions',
  cell: ({ row }) => {
    const post = row.original; // Đổi tên user thành post để phản ánh mục đích
    const handleDelete = () => {
      // Hiển thị thông báo xác nhận
      toast.warn(`Are you sure you want to delete the post for ${post.title}?`, {
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

