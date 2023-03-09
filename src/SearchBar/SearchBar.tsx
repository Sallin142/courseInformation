import React, { useState } from 'react';
import { Wrapper } from "./SearchBar.styles";
interface SearchBarProps {
  onSubmit: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(query);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <Wrapper>
        <form onSubmit={handleSubmit}>
            <input type="text" value={query} onChange={handleChange} placeholder="Cmpt 255/Cmpt 225 d100" />
            <button type="submit" >Search</button>
        </form>
    </Wrapper>
    
  );
};

export default SearchBar;