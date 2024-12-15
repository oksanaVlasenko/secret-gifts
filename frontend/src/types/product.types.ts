export type Product = {
  title: string | number | null | undefined,
  price: string | number | null | undefined,
  images: Images[],
  description: string | number | null | undefined,
  currency: string,
  url?: string | number | null | undefined,
  selected?: boolean,
  id?: string,
  categoryId: string | number | null,
  wishlist: string | number | null
  deletedImages?: Images[]
}

export type Images = {
  id: string,
  src: string,
  _id?: string
}