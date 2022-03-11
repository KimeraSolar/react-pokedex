export const fetchPokemon = async (url) => {
  try {
    const response = await fetch(url);
    return response;
  } catch (error) {
    console.log('Error:', error);
  }
};

export const searchPokemon = async (pokemon) => {
  try {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    let result = await fetchPokemon(url);
    let resultJson = result.status === 200 ? await result.json() : {};

    url = resultJson.species
      ? resultJson.species.url
      : `https://pokeapi.co/api/v2/pokemon-species/${pokemon}`;
    result = await fetchPokemon(url);
    resultJson = await result.json();
    const defaultVariety = resultJson.varieties.filter(
      (variety) => variety.is_default
    );
    result = await fetchPokemon(defaultVariety[0].pokemon.url);
    return await result.json();
  } catch (error) {
    console.log('Error:', error);
  }
};

export const getPokemons = async ({ offset = 0, limit = 50 } = {}) => {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon-species?limit=${limit}&offset=${
      limit * offset
    }`;
    const result = await fetchPokemon(url);
    return await result.json();
  } catch (error) {
    console.log('Error:', error);
  }
};
