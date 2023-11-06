'use client'
import { Booking } from '@/interfaces/booking.interface'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from 'react'

interface BookingProvider {
  bookings: Booking[]
  setBookings: Dispatch<SetStateAction<Booking[]>>
  isBookingValid: (checkin: Date, checkout: Date, property: string) => boolean
}

export const BookingContext = createContext<BookingProvider>(
  {} as BookingProvider
)

export const BookingContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [bookings, setBookings] = useState<Booking[]>([])

  const isBookingValid = (checkin: Date, checkout: Date, property: string) => {
    const propertyBookings = bookings.filter(
      (booking) => booking.property.name === property
    )
    // console.log(propertyBookings)

    for (const booking of propertyBookings) {
      if (
        (checkin >= booking.checkin && checkin <= booking.checkout) ||
        (checkout >= booking.checkin && checkout <= booking.checkout) ||
        (checkin <= booking.checkin && checkout >= booking.checkout)
      ) {
        return false // Overlap detected
      }
    }
    return true // No overlap detected
  }

  const bookingContextMemoized = useMemo(
    () => ({
      bookings,
      setBookings,
      isBookingValid,
    }),
    [bookings]
  )

  return (
    <BookingContext.Provider value={bookingContextMemoized}>
      {children}
    </BookingContext.Provider>
  )
}
