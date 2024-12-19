export default class Product {
  id: string
  barcode: string
  brand: string
  categories: Array<string>
  cost: number
  description: string
  name: string
  publishedAt: string  | null
  price: number
  quantity: number
  sku: string
  status: string
  stockTracked: boolean
  type: string
  businessId: string
  createdAt: string
  updatedAt: string
  deletedAt: string

  public static readonly STATUSES = {
    "IN_STOCK": "in stock",
    "OUT_OF_STOCK": "out of stock"
  }

  constructor(
    id: string,
    barcode: string,
    brand: string,
    categories: Array<string>,
    cost: number,
    description: string,
    name: string,
    publishedAt: string  | null,
    price: number,
    quantity: number,
    sku: string,
    status: string,
    stockTracked: boolean,
    type: string,
    businessId: string,
    createdAt: string,
    updatedAt: string,
    deletedAt: string
  ) {
    this.id = id
    this.barcode = barcode
    this.brand = brand
    this.categories = categories
    this.cost = cost
    this.description = description
    this.name = name
    this.publishedAt = publishedAt
    this.price = price
    this.quantity = quantity
    this.sku = sku
    this.status = status
    this.stockTracked = stockTracked
    this.type = type
    this.businessId = businessId
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.deletedAt = deletedAt
  }

  static fromObject(data: {
    id: string
    barcode: string
    brand: string
    categories: Array<string>
    cost: number
    description: string
    name: string
    publishedAt: string  | null
    price: number
    quantity: number
    sku: string
    status: string
    stockTracked: boolean
    type: string
    businessId: string
    createdAt: string
    updatedAt: string
    deletedAt: string
  }) {
    return new Product(
      data.id,
      data.barcode,
      data.brand,
      data.categories,
      data.cost,
      data.description,
      data.name,
      data.publishedAt,
      data.price,
      data.quantity,
      data.sku,
      data.status,
      data.stockTracked,
      data.type,
      data.businessId,
      data.createdAt,
      data.updatedAt,
      data.deletedAt
    )
  }

  static initEmpty(): Product {
    return new Product(
      '',
      '',
      '',
      [],
      0,
      '',
      '',
      null,
      0,
      0,
      '',
      '',
      true,
      '',
      '',
      '',
      '',
      ''
    )
  }
}