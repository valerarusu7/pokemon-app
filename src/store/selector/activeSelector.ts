import { createSelector } from "@reduxjs/toolkit";
import { type RootState } from "../store";

export const activeSelector = createSelector(
  (state: RootState) => state.activePokemon,
  (state) => state
);
