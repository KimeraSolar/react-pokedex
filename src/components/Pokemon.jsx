import React from 'react';
import styled from 'styled-components';

const Card = styled.div``;

const CardBody = styled.div``;

const CardTop = styled.div``;

const CardBottom = styled.div``;

const ImageContainer = styled.div``;

const Type = styled.div``;

const TypeName = styled.div``;

const Pokemon = ({ id, name, types, image }) => {
  return (
    <Card>
      <ImageContainer>
        <img src={image} alt={name} />
      </ImageContainer>
      <CardBody>
        <CardTop>
          <h3>{name}</h3>
          <div>{`#${id}`}</div>
        </CardTop>
        <CardBottom>
          <Type>
            {types.map((item, index) => {
              return <TypeName key={index}>{item.type.name}</TypeName>;
            })}
          </Type>
        </CardBottom>
      </CardBody>
    </Card>
  );
};

export default Pokemon;
