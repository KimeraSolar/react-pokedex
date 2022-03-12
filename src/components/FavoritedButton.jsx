import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  color: ${({ isFavorited }) => (isFavorited ? 'red' : 'black')};
  color: 'red';
  border: none;
  background-color: transparent;
  padding: 4px;
  font-size: 1.25rem;
  cursor: pointer;
`;

const FavoritedButton = ({ children, onClick, isFavorited }) => {
  return (
    <Button isFavorited={isFavorited} onClick={onClick}>
      {children}
    </Button>
  );
};

export default FavoritedButton;
