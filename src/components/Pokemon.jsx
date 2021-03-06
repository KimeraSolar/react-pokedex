import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import FavoritedContext from '../contexts/favoritedContext';
import FavoritedButton from './FavoritedButton';

const Card = styled.div`
  display: flex;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  cursor: pointer;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 10px 10px 0;
  flex: 1;
`;

const CardBottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CardTop = styled(CardBottom)`
  h3 {
    text-transform: capitalize;
  }
`;

const ImageContainer = styled.div`
  padding: 0 5px;
`;

const Image = styled.img`
  width: 70px;
  height: 70px;
  margin-right: 10px;
`;

const Type = styled.div`
  display: flex;
`;

const TypeName = styled.div`
  margin-right: 10px;
  text-transform: uppercase;
`;

const Pokemon = ({ id, name, types, image }) => {
  const navigate = useNavigate();
  const [favorited, setFavorited] = useState(false);
  const { updateFavoritedPokemons } = useContext(FavoritedContext);

  const favoriteHandler = () => {
    updateFavoritedPokemons(name, id);
    setFavorited(!favorited);
  };

  const onClickHandler = () => {
    navigate(`/pokemon?id=${id}`);
  };

  useEffect(() => {
    const favoritedPokemons = JSON.parse(
      window.localStorage.getItem('favoritedPokemon')
    );
    const favorite = favoritedPokemons.filter(
      (pokemon) => pokemon.name === name
    );
    if (favorite.length) setFavorited(true);
  }, [name]);

  return (
    <Card onClick={onClickHandler}>
      <ImageContainer>
        <Image src={image} alt={name} />
      </ImageContainer>
      <CardBody>
        <CardTop>
          <h3>{name.replace('-', ' ')}</h3>
          <div>{`#${id}`}</div>
        </CardTop>
        <CardBottom>
          <Type>
            {types.map((item, index) => {
              return <TypeName key={index}>{item.type.name}</TypeName>;
            })}
          </Type>
          <FavoritedButton isFavorited={favorited} onClick={favoriteHandler}>
            &#9829;
          </FavoritedButton>
        </CardBottom>
      </CardBody>
    </Card>
  );
};

export default Pokemon;
