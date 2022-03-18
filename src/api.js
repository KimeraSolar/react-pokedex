const API_URL = 'http://localhost:3003';

export const searchPokemon = async ({
  pokemon,
  offset = 0,
  limit = 30,
} = {}) => {
  try {
    let url = `${API_URL}/search-pokemon?pokemon=${pokemon}&offset=${
      limit * offset
    }&limit=${limit}`;
    let result = await fetch(url);
    return await result.json();
  } catch (error) {
    console.log('Error:', error);
  }
};

export const getPokemons = async ({ offset = 0, limit = 30 } = {}) => {
  try {
    const url = `${API_URL}/get-pokemons?limit=${limit}&offset=${
      limit * offset
    }`;
    const result = await fetch(url);
    return await result.json();
  } catch (error) {
    console.log('Error:', error);
  }
};
