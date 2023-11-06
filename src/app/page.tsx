'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import { BookingContext } from './booking-provider'
import { Booking } from '@/interfaces/booking.interface'
import Link from 'next/link'

const Home = () => {
  const router = useRouter()
  const [deletingBooking, setDeletingBooking] = useState<Booking | null>()
  const [deletingIndex, setDeletingIndex] = useState<number | null>()
  const { bookings, setBookings } = useContext(BookingContext)

  return (
    <main className='container mx-auto px-4 py-6 lg:p-24'>
      <header className='border-b-[1px] pb-5'>
        <div className='flex lg:flex-row flex-col justify-between items-center'>
          <h1 className='text-lg underline underline-offset-8'>
            Your bookings
          </h1>
          <button
            className='px-6 py-2 border rounded hover:border-gray-800 mt-4 w-full lg:w-fit lg:mt-0'
            onClick={() => router.push('/create')}
          >
            Add booking
          </button>
        </div>
      </header>
      <section className='grid grid-cols-1 divide-y'>
        {bookings.length === 0 && (
          <div className='mt-6 text-center lg:text-start'>
            <span>There is no bookings to show.</span>
          </div>
        )}
        {bookings.length > 0 &&
          bookings.map((booking, index) => (
            <div
              key={`${booking.property.name}+${booking.checkout.getTime()}`}
              className='lg:p-8 py-8 flex flex-row justify-between'
            >
              <div className='flex flex-row items-center'>
                <div>
                  <Image
                    className='rounded h-auto'
                    src={booking.property.photo!}
                    alt={booking.property.name!}
                    priority
                    width={110}
                    height={0}
                  />
                </div>
                <div className='ml-4 flex flex-col'>
                  <h4 className='font-semibold'>{booking.property.name}</h4>
                  <span className='text-sm text-gray-600'>
                    {booking.checkin.toLocaleDateString()} -{' '}
                    {booking.checkout.toLocaleDateString()}
                  </span>
                  <span className='text-sm text-gray-600'>
                    {booking.property.location}
                  </span>
                  <span className='text-sm text-gray-600'>
                    {booking.checkout <= new Date() ? 'Completed' : 'Booked'}
                  </span>
                </div>
              </div>
              <div className='flex flex-col items-center justify-center'>
                {deletingIndex !== index ? (
                  <div className='grid grid-cols-2 divide-x'>
                    <Link
                      className='hover:border-b-2 p-2'
                      href={`/edit/${booking.id}`}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-6 h-6'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                        />
                      </svg>
                    </Link>
                    <button
                      className='hover:border-b-2 p-2'
                      onClick={() => {
                        setDeletingBooking(booking)
                        setDeletingIndex(index)
                      }}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-6 h-6'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className='flex lg:flex-row flex-col justify-between items-center gap-x-8'>
                    <span className='text-sm lg:flex hidden'>
                      Are you sure you want to delete this booking?
                    </span>
                    <span className='text-sm lg:hidden block'>
                      Are you sure?
                    </span>
                    <div>
                      <span
                        className='text-sm hover:underline hover:underline-offset-8 mr-4 cursor-pointer'
                        onClick={() => {
                          const newBookingsArr = bookings.filter(
                            (booking, arrIndex) => index !== arrIndex
                          )
                          setBookings(newBookingsArr)
                          setDeletingBooking(null)
                          setDeletingIndex(null)
                        }}
                      >
                        Yes
                      </span>
                      <span
                        className='text-sm hover:underline hover:underline-offset-8 cursor-pointer'
                        onClick={() => {
                          setDeletingBooking(null)
                          setDeletingIndex(null)
                        }}
                      >
                        No
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
      </section>
    </main>
  )
}

export default Home
