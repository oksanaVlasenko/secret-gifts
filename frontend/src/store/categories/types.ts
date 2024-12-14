export type Category = {
  id: string | number,
  label: string | number,
  deleteIcon?: boolean,
}

export interface CategoryState {
  categories: Category[]
}