import { Option } from '@/components/dropdown/Dropdown.types';

export type Filter = {
  categories: string[],
  minPrice: number,
  maxPrice: number,
  searchText: string | number | null | undefined
}

export interface FilterProps {
  filters: Filter,
  categoriesList: Option[],
  onSelectChange: (field: string, values: string[] | string | number | null | undefined) => void;
  onMobileSelect: (filtersObject: Filter) => void;
  onResetFilters: () => void;
}