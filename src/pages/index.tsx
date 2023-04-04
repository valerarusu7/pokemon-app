import React, { useState } from "react";
import Header from "@/components/header";
import Pagination from "@/components/pagination";
import Pokemon from "@/components/pokemon";
import { useGetPokemonsQuery } from "@/store/api/api";
import { type NextPage } from "next";
import Head from "next/head";
import type { Pokemon as PokemonType } from "@/store/api/types";
import { initialPokemon } from "initial-pokemon";
import ActivePokemon from "@/components/active-pokemon";
import Loading from "@/components/loading";

const Home: NextPage = () => {
  const [activePokemon, setActivePokemon] =
    useState<PokemonType>(initialPokemon);
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetPokemonsQuery(page);

  return (
    <>
      <Head>
        <title>Pokemon app</title>
        <meta name="description" content="Pokemon app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="overflow-none flex h-screen justify-center bg-slate-100 p-2">
        <div className="flex h-full w-full flex-col justify-between md:max-w-7xl">
          {/* Header */}
          <Header />

          {/* Body */}
          <section className="mb-2 mt-10 flex grow gap-4">
            {isLoading ? (
              <Loading />
            ) : (
              <div className="grid grow grid-cols-3 grid-rows-5 gap-x-4 gap-y-10">
                {data?.results.map((pokemon, index) => (
                  <Pokemon
                    key={index}
                    name={pokemon.name}
                    setActivePokemon={setActivePokemon}
                  />
                ))}
              </div>
            )}
            <div className="grid grid-cols-1 ">
              <ActivePokemon pokemon={activePokemon} />
            </div>
          </section>

          <Pagination page={page} setPage={setPage} totalPages={data?.count} />
        </div>
      </main>
    </>
  );
};

export default Home;
