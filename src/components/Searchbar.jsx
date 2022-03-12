import React, { useState } from 'react';
import styled from 'styled-components';

const SearchbarContainer = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 0 20px;
  align-items: center;
`;

const InputWrapper = styled.div`
  background-color: white;
  margin-right: 20px;
`;

const Input = styled.input`
  padding: 10px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  border: none;
`;

const Button = styled.button`
  background-color: #0e6f9f;
  border: none;
  border-radius: 10px;
  height: 44px;
  color: white;
  padding: 10px 12px;
`;

const Searchbar = ({ onSearch }) => {
  const [search, setSearch] = useState('');

  const onChangeHandler = (e) => {
    setSearch(e.target.value);
  };

  const onSearchHandler = () => {
    onSearch(search);
  };

  const onKeyPressHandler = (event) => {
    if (event.key === 'Enter') onSearch(search);
  };

  return (
    <SearchbarContainer>
      <InputWrapper>
        <Input
          placeholder="Buscar pokémon"
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}
          value={search}
        />
      </InputWrapper>
      <div>
        <Button onClick={onSearchHandler}>Buscar</Button>
      </div>
    </SearchbarContainer>
  );
};

export default Searchbar;
