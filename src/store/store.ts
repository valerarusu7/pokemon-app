import { configureStore } from "@reduxjs/toolkit";
import { type TypedUseSelectorHook, useSelector } from "react-redux";
import { pokemonApi } from "./api/api";
import searchPokemonSlice from "./slices/searchPokemonSlice";
import {
  type AnyAction,
  type Dispatch,
  type ThunkDispatch,
} from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import activePokemonSlice from "./slices/activePokemonSlice";

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    searchPokemon: searchPokemonSlice.reducer,
    activePokemon: activePokemonSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = (): Dispatch<AnyAction> &
  ThunkDispatch<RootState, undefined, AnyAction> => useDispatch<AppDispatch>();
