'use client'
import { useRouter } from 'next/navigation'
import { properties } from '@/mocks/properties.mock'
import { useContext, useEffect, useState } from 'react'
import { BookingContext } from '../booking-provider'
import { v4 as uuidv4 } from 'uuid'

const CreateBooking = () => {
  const router = useRouter()
  const [checkin, setCheckin] = useState<Date>(new Date())
  const [checkout, setCheckout] = useState<Date>(new Date())
  const [property, setProperty] = useState<string>()

  const { isBookingValid, setBookings } = useContext(BookingContext)

  useEffect(() => {
    if (checkout < checkin) {
      setCheckout(checkin)
    }
  }, [checkin, checkout])

  const submitBooking = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setBookings((prev) => [
      ...prev,
      {
        id: uuidv4(),
        property: {
          name: property,
          photo: properties.find((propertyEl) => propertyEl.name === property)
            ?.photo,
          location: properties.find(
            (propertyEl) => propertyEl.name === property
          )?.location,
        },
        checkin,
        checkout,
      },
    ])
    router.push('/')
  }

  return (
    <main className='container mx-auto p-24'>
      <header className='border-b-[1px] pb-5'>
        <div className='flex lg:flex-row flex-col justify-between items-center'>
          <h1 className='text-lg underline underline-offset-8'>Add booking</h1>
        </div>
      </header>
      <section>
        <form
          className='flex flex-row flex-wrap py-8 gap-x-6'
          onSubmit={submitBooking}
        >
          <div className='flex flex-col gap-y-2'>
            <span>Check-in:</span>
            <input
              className='border-b-[1px]'
              type='date'
              onChange={(e) => setCheckin(new Date(e.target.value))}
              min={new Date().toISOString().split('T')[0]}
              defaultValue={checkin.toISOString().split('T')[0]}
            />
          </div>
          <div className='flex flex-col gap-y-2'>
            <span>Check-out:</span>
            <input
              className='border-b-[1px]'
              type='date'
              onChange={(e) => setCheckout(new Date(e.target.value))}
              min={checkin.toISOString().split('T')[0]}
              defaultValue={checkout.toISOString().split('T')[0]}
            />
          </div>
          <div className='flex flex-col gap-y-2'>
            <span>Select the property:</span>
            <select
              className='pb-1 rounded hover:background-transparent border-b-[1px]'
              onChange={(e) => setProperty(e.target.value)}
            >
              {properties.map((property) => (
                <option
                  key={`${property.name}-${property.location}`}
                  value={property.name}
                >
                  {property.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type='submit'
            disabled={
              !isBookingValid(checkin, checkout, property!) || !property
            }
            className={`w-fit ml-6 border rounded px-6 ${
              isBookingValid(checkin, checkout, property!) &&
              property &&
              'hover:border-gray-800'
            }`}
          >
            Save
          </button>
          <button
            type='button'
            className='w-fit border rounded px-6 hover:border-gray-800'
            onClick={() => router.push('/')}
          >
            Cancel
          </button>
        </form>
      </section>
    </main>
  )
}

export default CreateBooking
