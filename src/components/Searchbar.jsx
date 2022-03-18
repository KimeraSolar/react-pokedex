import React from 'react';
import styled from 'styled-components';

const SearchbarContainer = styled.div`
  display: flex;
  margin: 0;
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

const Searchbar = ({ search, setSearch, onSearch }) => {
  const onChangeHandler = (event) => {
    setSearch(event.target.value);
  };

  const onSearchHandler = () => {
    onSearch(search);
  };

  const onKeyPressHandler = (event) => {
    if (event.key === 'Enter') onSearchHandler();
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
      <Button onClick={onSearchHandler}>Buscar</Button>
    </SearchbarContainer>
  );
};

export default Searchbar;
