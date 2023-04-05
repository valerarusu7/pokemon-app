import React, { useState } from "react";
import Header from "@/components/header";
import Pagination from "@/components/pagination";
import Pokemon from "@/components/pokemon";
import { useGetPokemonsQuery } from "@/store/api/api";
import { type NextPage } from "next";
import Head from "next/head";
import ActivePokemon from "@/components/active-pokemon";
import { useAppSelector } from "@/store/store";
import { searchSelector } from "@/store/selector/searchSelector";
import { activeSelector } from "@/store/selector/activeSelector";

const Home: NextPage = () => {
  const [page, setPage] = useState(1);
  const { pokemon, searchError } = useAppSelector(searchSelector);
  const { activePokemon } = useAppSelector(activeSelector);
  const { data } = useGetPokemonsQuery(page);

  return (
    <>
      <Head>
        <title>RTK with Pokémons</title>
        <meta name="description" content="RTK with Pokémons" />
        <link rel="icon" href="/pokeball.png" />
      </Head>
      <main className="overflow-none flex h-screen justify-center bg-slate-100 p-2">
        <div className="flex h-full w-full flex-col justify-between md:max-w-7xl">
          <Header />
          {pokemon && (
            <section className="mb-2 mt-10 flex grow gap-4">
              <div className="grid grow grid-cols-3 grid-rows-5 gap-x-4 gap-y-10">
                <Pokemon name={pokemon.name} />
              </div>

              <div className="grid grid-cols-1 ">
                <ActivePokemon pokemon={activePokemon} />
              </div>
            </section>
          )}

          {!pokemon && !searchError && (
            <section className="mb-2 mt-10 flex grow gap-4">
              <div className="grid grow grid-cols-3 grid-rows-5 gap-x-4 gap-y-10">
                {data?.results.map((pokemon, index) => (
                  <Pokemon key={index} name={pokemon.name} />
                ))}
              </div>

              <div className="grid grid-cols-1 ">
                <ActivePokemon pokemon={activePokemon} />
              </div>
            </section>
          )}

          {searchError && (
            <div className="items-center justify-center text-center text-2xl font-extrabold text-slate-600">
              {searchError}
            </div>
          )}
          {!pokemon && (
            <Pagination
              page={page}
              setPage={setPage}
              totalPages={data?.count}
            />
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
