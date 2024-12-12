import { useState } from 'react'

import { useDropdownContext } from '@/context/dropdownContext';

interface SearchInputProps {
  onSearch: (newSearchValue: string | null) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  onSearch
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('')

  const { searchPlaceholder = 'Search...', disabled } = useDropdownContext()

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    onSearch(e.target.value)
  }

  return (
    <input
      type="text"
      className="dropdown-search-input"
      value={searchQuery}
      placeholder={String(searchPlaceholder)}
      disabled={Boolean(disabled)}
      onChange={handleSearchChange}
    />
  )
}

export default SearchInput