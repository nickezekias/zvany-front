export default class User {
  id: string
  address: string
  email: string
  firstName: string
  lastName: string
  password: string
  phone: string
  roles: Array<string>

  public static readonly ROLES_LIST = {
    "ADMIN": "admin"
  }

  constructor (
    id: string,
    address: string,
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    phone: string,
    roles: Array<string>
  ) {
    this.id = id
    this.address = address
    this.email = email
    this.firstName = firstName
    this.lastName = lastName
    this.password = password
    this.phone = phone
    this.roles = roles
  }

  static fromObject(data: {
    id: string
    address: string
    email: string
    firstName: string
    lastName: string
    password: string
    phone: string
    roles: Array<string>
  }) {
    return new User(
      data.id,
      data.address,
      data.email,
      data.firstName,
      data.lastName,
      data.password,
      data.phone,
      data.roles
    ) 
  }

  static initEmpty(): User {
    return new User("", "", "", "", "", "", "", [])
  }

  public isAdmin(): boolean {
    return this.roles.includes(User.ROLES_LIST.ADMIN)
  }
}