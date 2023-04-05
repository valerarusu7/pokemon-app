// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type Pokemon, type Pokemons, type SpeciesResponse } from "./types";

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
      keepUnusedDataFor: 1200,
    }),
    getPokemons: builder.query<Pokemons, number>({
      query: (page = 1) =>
        `/pokemon?offset=${page === 1 ? 0 : (page - 1) * 15}&limit=15`,
      keepUnusedDataFor: 1200,
    }),
    getPokemonSpeciesByName: builder.query<SpeciesResponse, string>({
      query: (name) => `/pokemon-species/${name}`,
      keepUnusedDataFor: 1200,
    }),
  }),
});
export const {
  useGetPokemonByNameQuery,
  useGetPokemonsQuery,
  useGetPokemonSpeciesByNameQuery,
} = pokemonApi;
