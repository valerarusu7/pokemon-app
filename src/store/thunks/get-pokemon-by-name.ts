import { createAsyncThunk } from "@reduxjs/toolkit";
import { type Pokemon } from "../api/types";

export const getPokemonByName = createAsyncThunk(
  "search/getPokemonByName",
  async (name: string) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

    return (await response.json()) as Pokemon;
  }
);
