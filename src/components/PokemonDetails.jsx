import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { getPokemonDetails } from '../api';

const Container = styled.div`
  width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  line-height: 2rem;
`;

const Artwork = styled.img`
  width: 500px;
  height: 500px;
  margin: 0 auto;
`;

const Title = styled.h3`
  font-size: 1.75rem;
  text-transform: capitalize;
  text-align: center;
`;

const DexNumber = styled.span`
  font-size: 1.25rem;
  vertical-align: text-top;
`;

const Type = styled.div`
  display: flex;
  margin: 0 auto;
`;

const TypeName = styled.div`
  margin-right: 10px;
  text-transform: uppercase;
`;

const displayGenderRate = (gender_rate) => {
  if (gender_rate < 0) return '⚲';
  let genderRateString = '';
  for (let i = 0; i < 8; i++) {
    if (gender_rate > i) genderRateString += '♀ ';
    else genderRateString += '♂ ';
  }
  return genderRateString;
};

const PokemonDetails = () => {
  const [searchParams] = useSearchParams();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDetails();
  }, [searchParams]);

  const getDetails = async () => {
    setLoading(true);
    const id = searchParams.get('id');
    if (!id) return setLoading(false);
    const result = await getPokemonDetails(id);
    setDetails(result);
    setLoading(false);
  };

  return (
    <Container>
      {loading ? (
        <div>Carregando, segura fera...</div>
      ) : (
        <>
          <Artwork src={details.artwork} alt={details.name} />
          <DexNumber>#{details.id}</DexNumber>
          <Title>{details.name?.replace('-', ' ')}</Title>
          <Type>
            {details.types?.map((type) => (
              <TypeName>{type}</TypeName>
            ))}
          </Type>
          <p>Altura: {details.height / 10}m</p>
          <p>Peso: {details.weight / 10}kg</p>
          <p>{displayGenderRate(details.gender_rate)}</p>
        </>
      )}
    </Container>
  );
};

export default PokemonDetails;
