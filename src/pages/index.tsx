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
import Loading from "@/components/loading";

const Home: NextPage = () => {
  const [page, setPage] = useState(1);
  const { pokemon, searchError, isSearching } = useAppSelector(searchSelector);
  const { data, isFetching } = useGetPokemonsQuery(page);

  return (
    <>
      <Head>
        <title>RTK with Pokémons</title>
        <meta name="description" content="RTK with Pokémons" />
        <link rel="icon" href="/pokeball.png" />
      </Head>
      <main
        className="overflow-none flex min-h-screen justify-center bg-slate-100 bg-gradient-to-b
                 from-slate-50 to-slate-100 p-2 xl:h-screen"
      >
        <div className="flex h-full w-full flex-col justify-between md:max-w-7xl">
          <Header />
          {pokemon && (
            <section className="mb-2 mt-10 flex grow gap-4">
              <div className="flex grow grid-rows-5 flex-col gap-y-10 sm:grid-cols-1 sm:gap-x-4 md:grid md:grid-cols-2 md:gap-x-4 lg:grid-cols-3">
                <Pokemon name={pokemon.name} />
              </div>

              <div className="hidden sm:grid sm:grid-cols-1 ">
                <ActivePokemon />
              </div>
            </section>
          )}

          {isSearching && (
            <div className="items-center justify-center text-center text-2xl font-extrabold text-slate-600">
              Searching...
            </div>
          )}

          {!pokemon && !searchError && !isSearching && (
            <>
              {isFetching ? (
                <section className="flex grow items-center justify-center">
                  <Loading />
                </section>
              ) : (
                <section className="mb-2 mt-10 flex grow gap-4">
                  <div className="flex grow flex-col gap-y-10 sm:grid-cols-1 sm:gap-x-4 md:grid md:grid-cols-2 md:grid-rows-5 md:gap-x-4 lg:grid-cols-3">
                    {data?.results.map((pokemon, index) => (
                      <Pokemon key={index} name={pokemon.name} />
                    ))}
                  </div>

                  <div className="hidden sm:grid sm:grid-cols-1">
                    <ActivePokemon />
                  </div>
                </section>
              )}
            </>
          )}

          {searchError && !isSearching && (
            <div className="flex h-full items-center justify-center text-center text-2xl font-extrabold text-slate-600">
              {searchError}
            </div>
          )}
          {!pokemon && !searchError && (
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
