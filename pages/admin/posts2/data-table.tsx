'use client'

import { useEffect, useState } from 'react'

import {
  ColumnDef,
  flexRender,
  SortingState,
  VisibilityState,
  ColumnFiltersState,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table'

import {
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'

import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onReload?: () => Promise<void>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onReload,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const rowsPerPageOptions = [10, 25, 50, 100, 200];
  const [reloadCounter, setReloadCounter] = useState(0); // Add reloadCounter state

  useEffect(() => {
    // If onReload prop changes, fetch posts and update state
    if (onReload) {
    //   const fetchData = async () => {
    //     try {
    //       const posts: TData[] = await onReload();
    //       setData(posts);
    //     } catch (error) {
    //       console.error('Error fetching data:', error);
    //     }
    //   };

    //   fetchData();
    }
  }, [onReload, reloadCounter]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  return (
    <>
      {/* Filters */}

      <div className='flex items-center justify-between'>
        <div className='flex items-center py-4'>
          <Input style={{ background: 'white' }}
            placeholder='Search by title...'
            value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
            onChange={event =>
              table.getColumn('title')?.setFilterValue(event.target.value)
            }
            className='max-w-sm'
          />
        </div>
         {/* Reload Table Button */}
      
      <div className='flex items-center justify-end py-4'>
      <Button
        onClick={() => setReloadCounter(prevCounter => prevCounter + 1)}
        variant='outline'
        className='ml-2'
      >
        Reload
      </Button>
      </div>
        

 {/* Rows per page dropdown */}
 <DropdownMenu >
          <DropdownMenuTrigger asChild style={{ background: 'white' }}>
            <Button variant='outline' className='ml-2'>
              Rows/Page
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' style={{ background: 'white' }}>
            {rowsPerPageOptions.map(option => (
              <DropdownMenuItem
                key={option}
                onClick={() => table.setPageSize(Number(option))}
                className='capitalize'
              >
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      
        
        {/* Column visibility */}
        <DropdownMenu >
          <DropdownMenuTrigger asChild style={{ background: 'white' }}>
            <Button variant='outline' className='ml-auto'>
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' style={{ background: 'white' }}>
            {table
              .getAllColumns()
              .filter(column => column.getCanHide())
              .map(column => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={value => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className='rounded-md border'>
        <Table style={{ background: 'white' }}>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className='flex items-center justify-end space-x-2 py-4'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          style={{ background: 'white' }}
        >
          Previous
        </Button>
        <div style={{ background: 'white' }}>
  <Button
    variant='outline'
    size='sm'
    onClick={() => table.nextPage()}
    disabled={!table.getCanNextPage()}
  >
    Next
  </Button>
</div>
      </div>
    </>
  )
}