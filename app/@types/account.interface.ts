import type Business from "../models/business.model"
import type User from "../models/user.model"

interface DBGetQueryFilter {
  sortBy: Array<string>
  itemsPerPage?: number
  sortDesc?: Array<string>
  page?: number
}

interface LoginRequest {
  email: string
  password: string
}

interface PasswordResetRequest {
  password: string
  passwordConfirmation: SVGStringList
}

interface RegisterRequest {
  accountType: string
  businessAddress: Business['address']
  businessDescription: Business['description']
  businessEmail: Business['email']
  businessName: Business['name']
  businessPhone: Business['phone']
  businessWebsite: Business['website']
  email: User['email']
  firstName: User['firstName']
  gender: User['gender']
  lastName: User['lastName']
  password: User['password']
  password_confirmation: string
  phone: User['phone']
}

export type { DBGetQueryFilter, LoginRequest, PasswordResetRequest, RegisterRequest }
