import jsonData from "../data/pokedex.json" assert { type: "json" };

export const getPokemon = async (req, res) => {
  res.json(jsonData);
};

export const getPokemonById = async (req, res) => {
  const searchId = Number(req.params.id);
  console.log(searchId);
  const treffer = jsonData.find((element) => element.id === searchId);
  res.json(treffer);
};
