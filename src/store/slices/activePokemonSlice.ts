import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Pokemon } from "../api/types";
import { initialPokemon } from "@/data/initial-pokemon";

type InitialState = {
  activePokemon: Pokemon;
};

const initialState: InitialState = {
  activePokemon: initialPokemon,
};

export const activePokemonSlice = createSlice({
  name: "searchPokemon",
  initialState,
  reducers: {
    setActivePokemon: (state, action: PayloadAction<Pokemon>) => {
      state.activePokemon = action.payload;
    },
  },
});

export const { setActivePokemon } = activePokemonSlice.actions;
export default activePokemonSlice;
