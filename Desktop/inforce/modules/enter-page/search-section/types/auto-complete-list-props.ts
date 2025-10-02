export interface AutocompleteListProps<T> {
  items: T[];
  onSelect: (item: T) => void;
  renderItem?: (item: T) => React.ReactNode;
}
