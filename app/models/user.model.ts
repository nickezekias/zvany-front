export default class User {
  id: string
  address: string
  email: string
  firstName: string
  fullName: string
  gender: string
  initials: string
  isActive: boolean
  lastName: string
  password: string
  phone: string
  roles: Array<string>
  createdAt: string
  updatedAt: string
  deletedAt: string

  public static readonly GENDERS = {
    MALE: 'MALE',
    FEMALE: 'FEMALE',
    OTHER: 'OTHER',
  }

  public static readonly ROLES_LIST = {
    ADMIN: 'admin',
    CUSTOMER: 'customer',
    VENDOR: 'vendor'
  }

  constructor(
    id: string,
    address: string,
    email: string,
    firstName: string,
    fullName: string,
    gender: string,
    initials: string,
    isActive: boolean,
    lastName: string,
    password: string,
    phone: string,
    roles: Array<string>,
    createdAt: string,
    updatedAt: string,
    deletedAt: string
  ) {
    this.id = id
    this.address = address
    this.email = email
    this.firstName = firstName
    this.fullName = fullName
    this.gender = gender
    this.isActive = isActive
    this.initials = initials
    this.lastName = lastName
    this.password = password
    this.phone = phone
    this.roles = roles
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.deletedAt = deletedAt
  }

  static fromObject(data: {
    id: string
    address: string
    email: string
    firstName: string
    fullName: string
    gender: string
    initials: string
    isActive: boolean
    lastName: string
    password: string
    phone: string
    roles: Array<string>
    createdAt: string
    updatedAt: string
    deletedAt: string
  }) {
    return new User(
      data.id,
      data.address,
      data.email,
      data.firstName,
      data.fullName,
      data.gender,
      data.initials,
      data.isActive,
      data.lastName,
      data.password,
      data.phone,
      data.roles,
      data.createdAt,
      data.updatedAt,
      data.deletedAt
    )
  }

  static initEmpty(): User {
    return new User(
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      true,
      '',
      '',
      '',
      [],
      '',
      '',
      ''
    )
  }

  public checkIsActive(): boolean {
    return this.isActive
  }

  public isAdmin(): boolean {
    return this.roles.includes(User.ROLES_LIST.ADMIN)
  }

  public isVendor(): boolean {
    return this.roles.includes(User.ROLES_LIST.VENDOR)
  }
}
