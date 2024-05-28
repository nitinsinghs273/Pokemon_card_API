import React from "react";

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="pokemon-card">
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
      <p>ID: {pokemon.id}</p>
      <p>Type: {pokemon.types.map((type) => type.type.name).join(", ")}</p>
    </div>
  );
};

export default PokemonCard;