import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  type EvolutionResponse,
  type Pokemon,
  type Pokemons,
  type SpeciesResponse,
} from "./types";

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
    getEvolutionChainById: builder.query<EvolutionResponse, string>({
      query: (id) => `/evolution-chain/${id}`,
      keepUnusedDataFor: 1200,
    }),
  }),
});
export const {
  useGetPokemonByNameQuery,
  useGetPokemonsQuery,
  useGetPokemonSpeciesByNameQuery,
  useGetEvolutionChainByIdQuery,
} = pokemonApi;
