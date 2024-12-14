export interface Option {
  id: string | number;
  label: string | number;
  disabled?: boolean | null; 
  icon?: string | null;
  deleteIcon?: boolean;
}

export interface DropdownProps {
  selectedValue: string | null | number;
  label?: string | null | undefined | number; 
  options?: Option[];
  disabled?: boolean | null;
  errorText?: string | null;
  size?: string | null; // 'small' | 'medium' | 'large';
  searchPlaceholder?: string | null;
  notFoundText?: string | null;
  onSelectChange: (newSelectedValue: string | number | null) => void;
  onOpenList?: () => void;
  onCloseList?: () => void;
  onClearValue?: () => void;
  onCreateNewValue?: (newValue: string | number | null | undefined) => Promise<{ success: boolean; error?: string }>;
  onDeleteOption?: (id: string | number) => Promise<{ success: boolean; error?: string }>;
  onEditOption?: (id: string | number, value: string | number | null | undefined) => Promise<{ success: boolean; error?: string }>;
}