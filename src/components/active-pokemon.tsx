import { stats } from "@/data/stats";
import { images } from "@/data/type-images";
import { activeSelector } from "@/store/selector/activeSelector";
import { searchSelector } from "@/store/selector/searchSelector";
import { setActivePokemon } from "@/store/slices/activePokemonSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { getColorFromType } from "@/utils/get-color-from-type";
import { EyeSlashIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { GiMale, GiFemale } from "react-icons/gi";
import EvolutionChain from "./evolution-chain";
import { useGetPokemonSpeciesByNameQuery } from "@/store/api/api";

type Response = {
  damage_relations: {
    double_damage_from: {
      name: string;
    }[];
    half_damage_from: {
      name: string;
    }[];
  };
};

const ActivePokemon = () => {
  const [weaknesses, setWeakneasses] = useState<string[]>([]);
  const { activePokemon } = useAppSelector(activeSelector);
  const { pokemon } = useAppSelector(searchSelector);
  const { data: speciesData } = useGetPokemonSpeciesByNameQuery(
    activePokemon.name
  );
  const pokedexEntry = speciesData?.flavor_text_entries[0].flavor_text
    .replace("\f", "\n")
    .replace("\u00ad\n", "")
    .replace("\u00ad", "")
    .replace(" -\n", " - ")
    .replace("-\n", "-")
    .replace("\n", " ");

  const evolutionChainId = speciesData?.evolution_chain.url
    .split("/")
    .slice(-2, -1)[0];

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (pokemon) dispatch(setActivePokemon(pokemon));
  }, [dispatch, pokemon]);

  useEffect(() => {
    const newWeaknesses: string[] = [];
    activePokemon.types.map((type) => {
      fetch(`https://pokeapi.co/api/v2/type/${type.type.name}`)
        .then((res) => res.json())
        .then((data: Response) => {
          data.damage_relations.double_damage_from.map((weakness) => {
            newWeaknesses.push(weakness.name);
          });
        })
        .finally(() => {
          setWeakneasses(newWeaknesses);
        });
    });
  }, [activePokemon]);

  return (
    <div className="relative flex w-[400px] select-none flex-col items-center rounded-xl border border-slate-100 bg-white px-4 shadow-sm">
      <div className="flex h-[200px] w-[200px] items-center justify-center">
        <Image
          alt={activePokemon.name}
          src={activePokemon.sprites.other?.dream_world.front_default as string}
          height={100}
          width={100}
          className=" mt-4  object-contain"
          fill={false}
        />
      </div>
      <div className="absolute right-0  p-4">
        <div className="mb-2 rounded-xl border border-blue-300 bg-blue-200 p-2">
          <GiMale size={20} className="font-bold text-blue-800" />
        </div>
        <div className="rounded-xl border border-red-300 p-2">
          <GiFemale size={20} className="font-bold text-red-600" />
        </div>
      </div>

      <div className="flex w-full flex-col items-center">
        <div className="text-lg font-extrabold capitalize text-slate-500">
          #{activePokemon.id}
        </div>
        <div className="text-2xl font-bold capitalize">
          {activePokemon.name}
        </div>
        <div className="mt-2 flex">
          {activePokemon.types.map((type) => (
            <div
              style={{
                backgroundColor: getColorFromType(type.type.name),
              }}
              className="mr-2 rounded-md p-2 font-bold capitalize"
              key={type.type.name}
            >
              {type.type.name}
            </div>
          ))}
        </div>
        <div className="mt-6 text-center ">
          <h1 className="text-md font-bold uppercase">Pokedéx entry</h1>
          <div className="flex h-[80px] items-center justify-center text-center">
            {pokedexEntry?.trim()}
          </div>
        </div>
        <div className="mt-4 flex w-full flex-col items-center">
          <div className="text-md font-bold uppercase">Abilities</div>
          <div className="mt-2 grid w-full grid-cols-2 items-center justify-between gap-4">
            {activePokemon.abilities.map((ability, index) => (
              <div
                style={{
                  borderColor: ability.is_hidden
                    ? "#F56565"
                    : getColorFromType(
                        activePokemon.types[0]
                          ? activePokemon.types[0].type.name
                          : "normal"
                      ),
                }}
                key={index}
                className="flex grow items-center justify-between gap-2 rounded-full  border bg-slate-100 px-4 py-2 font-bold capitalize"
              >
                <div>{ability.ability.name}</div>
                {ability.is_hidden && (
                  <EyeSlashIcon className="h-5 w-5 text-slate-400" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full">
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <div className="text-md mb-2 flex items-center justify-center font-bold uppercase">
                Height
              </div>
              <div className="flex grow items-center justify-center gap-2 rounded-full  bg-slate-100 px-4 py-2 font-bold capitalize">
                <div className="flex items-center justify-center">
                  {activePokemon.height}m
                </div>
              </div>
            </div>
            <div>
              <div className="text-md mb-2 flex items-center justify-center font-bold uppercase">
                Weight
              </div>
              <div className="flex grow items-center justify-center gap-2 rounded-full  bg-slate-100 px-4 py-2 font-bold capitalize">
                <div className="flex items-center justify-center">
                  {activePokemon.weight}kg
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <div className="text-md mb-2 flex items-center justify-center font-bold uppercase">
                Weaknesses
              </div>
              <div className="flex grow items-center justify-center gap-2 rounded-full  bg-slate-100 px-4 py-2 font-bold capitalize">
                <div className="flex items-center justify-center gap-1">
                  {weaknesses.map((weakness, index) => (
                    <Image
                      key={index}
                      alt={weakness}
                      src={images.get(weakness) as string}
                      height={20}
                      width={20}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="text-md mb-2 flex items-center justify-center font-bold uppercase">
                Base Exp
              </div>
              <div className="flex grow items-center justify-center gap-2 rounded-full  bg-slate-100 px-4 py-2 font-bold capitalize">
                <div className="flex items-center justify-center">
                  {activePokemon.base_experience}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center">
            <div className="text-md font-bold uppercase">Stats</div>
            <div className="flex gap-1">
              {activePokemon.stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center rounded-full bg-slate-100 p-1"
                >
                  <div
                    style={{
                      backgroundColor: stats.get(stat.stat.name)?.color,
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-full p-2 text-sm font-bold text-white"
                  >
                    {stats.get(stat.stat.name)?.name}
                  </div>
                  <div className="py-1 text-sm font-bold">{stat.base_stat}</div>
                </div>
              ))}
              <div className="flex flex-col items-center rounded-full bg-slate-100 p-1">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#8093dc] p-1 text-xs font-bold text-white">
                  TOT
                </div>
                <div className="py-1 text-sm font-bold">
                  {activePokemon.stats.reduce((a, b) => a + b.base_stat, 0)}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center">
            <div className="text-md mb-8 font-bold uppercase">Evolution</div>
            {evolutionChainId && (
              <EvolutionChain evolutionChainId={evolutionChainId} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivePokemon;
