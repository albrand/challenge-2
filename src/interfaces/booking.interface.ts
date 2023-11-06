import { Property } from './property.interface'

export interface Booking {
  id: string
  property: Partial<Property>
  checkin: Date
  checkout: Date
}
