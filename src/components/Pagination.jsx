import React from 'react';
import styled from 'styled-components';

const Container = styled.div``;

const Pagination = ({ page, totalPages, handlePageChange }) => {
  return (
    <Container>
      <button
        onClick={() => {
          handlePageChange(page - 1);
        }}
      >
        &#9664;
      </button>
      <div>{`${page} de ${totalPages}`}</div>
      <button
        onClick={() => {
          handlePageChange(page + 1);
        }}
      >
        &#9654;
      </button>
    </Container>
  );
};

export default Pagination;
