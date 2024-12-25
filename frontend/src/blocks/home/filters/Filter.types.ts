import { Option } from '@/components/dropdown/Dropdown.types';

export type Filter = {
  categories: string[]
}

export interface FilterProps {
  filters: Filter,
  categoriesList: Option[],
  onSelectChange: (field: string, values: string[]) => void;
  onMobileSelect: (filtersObject: Filter) => void;
  onResetFilters: () => void;
}