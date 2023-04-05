import { createSelector } from "@reduxjs/toolkit";
import { type RootState } from "../store";

export const searchSelector = createSelector(
  (state: RootState) => state.searchPokemon,
  (state) => state
);
