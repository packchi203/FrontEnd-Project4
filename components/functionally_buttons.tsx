import { Fragment, useEffect, useRef, useState } from 'react'
import {
  BellIcon,
  EllipsisHorizontalIcon,
  ChevronDownIcon,
  FlagIcon,
  ShareIcon,
} from '@heroicons/react/24/outline'
import { ComponentRequestAuth } from './layouts/common'
import HeroIcon from './hero_icon'
import { postApi, commentApi } from '@/api-client'
import { useAuth, useBookmarks } from '@/hooks'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Menu, Transition } from '@headlessui/react'

interface PropsComponent {
  id: number
  isBookmark: boolean
  subject: string
}
export function FunctionallyButtons({
  id,
  subject,
  isBookmark,
}: PropsComponent) {
  const router = useRouter()
  const [statusBookmark, setStatusBookmark] = useState(isBookmark)
  const { profile, fistLoading } = useAuth()
  const [load, setLoad] = useState(false)
  const [share, setShare] = useState(false)
  const { bookmarkPost, bookmarkComment } = useBookmarks()
  let linkShare = 'https://itforum.site' + router?.asPath
  useEffect(() => {
    console.log(router)
    setStatusBookmark(isBookmark)
  }, [isBookmark])
  useEffect(() => {
    if (!profile?.name) {
      setStatusBookmark(false)
    }
  }, [profile?.name])
  const handleBookmark = async (e: any) => {
    e.preventDefault()
    if (!profile.name) {
      return
    }
    setLoad(true)
    setStatusBookmark(!statusBookmark)
    try {
      setStatusBookmark(!statusBookmark)
      if (subject == 'POST') {
        await bookmarkPost(id).then((res: any) => {
          if (res.status == 200) {
            setStatusBookmark(res.data)
            setLoad(false)
            return
          }
          setStatusBookmark(res)
          setLoad(false)
        })
      } else if (subject == 'COMMENT') {
        await bookmarkComment(id).then((res: any) => {
          if (res.status == 200) {
            setStatusBookmark(res.data)
            setLoad(false)
            return
          }
          setStatusBookmark(res)
          setLoad(false)
        })
      }
    } catch (err) {
      console.log('error', err)
    }
  }
  return (
    <>
      <div className='flex flex-wrap'>
        <ComponentRequestAuth>
          <button
            disabled={load}
            onClick={handleBookmark}
            className='flex items-center mr-2 text-sm p-1 text-gray-500 hover:bg-gray-200 rounded-sm'>
            <HeroIcon
              name='BookmarkIcon'
              className='w-5 h-45  text-gray-400'
              outline={statusBookmark}
            />
            <span className='ml-1 font-medium hidden md:block'>Lưu lại</span>
          </button>
        </ComponentRequestAuth>
        {/* <button className='flex items-center mr-2 text-sm p-1 text-gray-500 hover:bg-gray-200 rounded-sm'>
          <BellIcon className='w-5 h-5 text-gray-400' />
          <span className='ml-1 font-medium'>Nhận Thông báo</span>
        </button> */}
        <Menu as='div' className='relative inline-block text-left'>
          <div>
            <Menu.Button className='flex items-center mr-2 text-sm p-1 text-gray-500 hover:bg-gray-200 rounded-sm'>
            <ShareIcon className='w-5 h-5 text-gray-400' />
            <span className='ml-1 font-medium hidden md:block'>Chia sẻ</span>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'>
            <Menu.Items className='absolute right-0 z-30 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
              <div className='px-1 py-1 '>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      target={'_blank'}
                      href={`https://www.facebook.com/sharer.php?u=${linkShare}`}>
                      <a
                        target={'_blank'}
                        className=' hover:bg-gray-50 py-2 flex text-sm px-2 rounded-lg'>
                        Facebook
                      </a>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                   <Link
                   target={'_blank'}
                   href={`https://twitter.com/intent/tweet?text=${linkShare}`}>
                   <a
                     target={'_blank'}
                     className=' hover:bg-gray-50 py-2 flex text-sm px-2 rounded-lg'>
                     Twitter
                   </a>
                 </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                   <Link
                   target={'_blank'}
                   href={`https://www.linkedin.com/shareArticle?mini=true&url=${linkShare}`}>
                   <a
                     target={'_blank'}
                     className=' hover:bg-gray-50 py-2 flex text-sm px-2 rounded-lg'>
                     LinkedIn
                   </a>
                 </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                <Link
                target={'_blank'}
                href={`https://www.reddit.com/submit?url=${linkShare}`}>
                <a
                  target={'_blank'}
                  className=' hover:bg-gray-50 py-2 flex text-sm px-2 rounded-lg'>
                  Reddit
                </a>
              </Link>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        <ComponentRequestAuth>
          <button className='flex items-center mr-2 text-sm p-1 text-gray-500 hover:bg-gray-200 rounded-sm'>
            <FlagIcon className='w-5 h-5 text-gray-400' />
            <span className='ml-1 font-medium hidden md:block'>Báo cáo</span>
          </button>
        </ComponentRequestAuth>
      </div>
    </>
  )
}
