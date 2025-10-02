"use client";
import { useSearchInput } from "./hooks/use-search-input";
import { SearchInputUI } from "./components/search-input-ui";

interface SearchInputProps {
  placeholder?: string;
  onSearch?: (term: string) => void;
}

export function SearchInputWrapper(props: SearchInputProps) {
  const logic = useSearchInput("", props.onSearch);

  return <SearchInputUI {...logic} placeholder={props.placeholder} />;
}
