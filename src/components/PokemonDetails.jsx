import React from 'react';
import { useSearchParams } from 'react-router-dom';

const PokemonDetails = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getDetails = () => {
    const id = searchParams.get('id');
    if (!id) return;

    return {
      id: 773,
      gender_rate: -1,
      habitat: null,
      varieties: ['silvally'],
      type: ['normal'],
      artwork:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/773.png',
      name: 'silvally',
      height: 23,
      weight: 1005,
      forms: ['silvally-normal', 'silvally-flying', 'silvally-fairy'],
      abilities: [
        {
          name: 'rks-system',
          is_hidden: false,
        },
      ],
    };
  };

  return <h1>Ohayo</h1>;
};

export default PokemonDetails;
