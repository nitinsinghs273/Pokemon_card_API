import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemonCard from "./Component/PokemonCard";
import SearchBar from "./Component/SearchBar";
import "./App.css";

const App = () => {
  const [pokemon, setPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
        const results = await Promise.all(
          response.data.results.map(async (p) => {
            const pokeData = await axios.get(p.url);
            return pokeData.data;
          })
        );
        setPokemon(results);
      } catch (error) {
        console.error("Error fetching Pokémon data", error);
      }
    };
    fetchPokemon();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPokemon = pokemon.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <h1>Pokémon Gallery</h1>
      <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
      <div className="pokemon-container">
        {filteredPokemon.map((p) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </div>
    </div>
  );
};

export default App;
