import css from './SearchBox.module.css';
import type { ChangeEvent } from 'react';
import { useState } from 'react';

interface SearchBoxProps {
  value: string;
  onSearch: (value: string) => void;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBox({ value, onInputChange }: SearchBoxProps) {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    onInputChange(event);
  };

  return (
    <input
      className={css.input}
      type="text"
      value={inputValue}
      onChange={handleChange}
      placeholder="Search notes"
    />
  );
}
