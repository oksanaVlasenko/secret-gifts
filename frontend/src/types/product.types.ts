export type Product = {
  title: string | number | null | undefined,
  price: string | number | null | undefined,
  images: Images[],
  description: string | number | null | undefined,
  currency: string,
  url?: string,
  selected?: boolean,
  id?: string,
  category: string | number | null,
  wishlist: string | number | null
}

export type Images = {
  id: string,
  src: string,
  _id?: string
}