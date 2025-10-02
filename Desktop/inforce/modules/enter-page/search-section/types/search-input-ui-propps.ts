import { Post } from "@/shared/types/post";

export interface SearchInputUIProps {
  value: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  placeholder?: string;
  suggestions: Post[];
  open: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  onFocus: () => void;
  handleSelect: (item: Post) => void;
  onSubmit: (e: React.FormEvent) => void;
}
