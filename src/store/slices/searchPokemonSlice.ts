import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Pokemon } from "../api/types";
import { getPokemonByName } from "../thunks/get-pokemon-by-name";

type InitialState = {
  search: string;
  pokemon: Pokemon | null;
  searchError: string | null;
  isSearching: boolean;
};

const initialState: InitialState = {
  search: "",
  pokemon: null,
  searchError: null,
  isSearching: false,
};

export const searchPokemonSlice = createSlice({
  name: "searchPokemon",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setSearchError: (state, action: PayloadAction<null>) => {
      state.searchError = action.payload;
    },

    setPokemon: (state, action: PayloadAction<null | Pokemon>) => {
      state.pokemon = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPokemonByName.pending, (state) => {
      state.isSearching = true;
    });
    builder.addCase(getPokemonByName.fulfilled, (state, action) => {
      state.pokemon = action.payload;
      state.searchError = null;
      state.isSearching = false;
    });
    builder.addCase(getPokemonByName.rejected, (state) => {
      state.searchError = "Pokemon not found";
      state.pokemon = null;
      state.isSearching = false;
    });
  },
});
export const { setSearch, setPokemon, setSearchError } =
  searchPokemonSlice.actions;
export default searchPokemonSlice;
