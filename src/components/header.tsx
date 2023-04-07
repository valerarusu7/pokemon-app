import Image from "next/image";
import React, { useEffect } from "react";
import pokeball from "@/assets/pokeball.png";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { searchSelector } from "@/store/selector/searchSelector";
import {
  setPokemon,
  setSearch,
  setSearchError,
} from "@/store/slices/searchPokemonSlice";
import { getPokemonByName } from "@/store/thunks/get-pokemon-by-name";

const Header = () => {
  const { search } = useAppSelector(searchSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (search.length === 0) {
      dispatch(setPokemon(null));
      dispatch(setSearchError(null));
    }
  }, [dispatch, search]);

  const searchPokemon = () => {
    void dispatch(getPokemonByName(search));
  };

  return (
    <header className="flex w-full select-none gap-4">
      <div className="flex grow rounded-xl border border-slate-100 bg-white p-2 shadow-sm">
        <input
          placeholder="Search your Pokémon!"
          type="text"
          className="mr-2 grow pl-4 outline-none"
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          onKeyDown={(e) => {
            if (e.key === "Enter" && search.length > 0) {
              searchPokemon();
            }
          }}
        />
        <button
          disabled={search.length === 0}
          onClick={searchPokemon}
          className="group transform rounded-xl bg-[#e56449] p-3 shadow-lg shadow-red-500 transition-transform hover:opacity-75 active:scale-75"
        >
          <Image
            className="h-[20px] w-[20px] group-hover:animate-spin sm:w-[30px] sm:h-[30px]"
            src={pokeball}
            alt="Search"
            width={30}
            height={30}
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
