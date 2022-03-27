import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPokemonDetails } from '../api';

const PokemonDetails = () => {
  const [searchParams] = useSearchParams();
  const [details, setDetails] = useState({});

  useEffect(() => {
    getDetails();
  }, [searchParams]);

  const getDetails = async () => {
    const id = searchParams.get('id');
    if (!id) return;
    const result = await getPokemonDetails(id);
    setDetails(result);
  };

  return (
    <>
      <h1>{details.name}</h1>
      <img src={details.artwork} alt={details.name} />
      <h4>Id: #{details.id}</h4>
      <p>Altura: {details.height / 10}m</p>
      <p>Peso: {details.weight / 10}kg</p>
      <p>
        Tipo:
        {details.types?.map((type) => (
          <span> {type}</span>
        ))}
      </p>
      <p>Habitat: {details.habitat}</p>
      <p>
        Distribuição de gênero:{' '}
        {details.gender_rate < 0
          ? 'sem gênero'
          : `${details.gender_rate} a cada 8 são fêmeas`}
      </p>
    </>
  );
};

export default PokemonDetails;
