export const searchPokemon = async (pokemon) => {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log('Error:', error);
  }
};

export const getPokemons = async ({ offset = 0, limit = 50 }) => {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${
      limit * offset
    }`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log('Error:', error);
  }
};
