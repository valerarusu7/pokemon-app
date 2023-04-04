import { useGetPokemonByNameQuery } from "@/store/api/api";
import { Pokemon } from "@/store/api/types";
import { getColorFromType } from "@/utils/get-color-from-type";
import Image from "next/image";
import React from "react";

type PokemonProps = {
  name: string;
  setActivePokemon: (pokemon: Pokemon) => void;
};

const Pokemon = ({ name, setActivePokemon }: PokemonProps) => {
  const { data, isLoading } = useGetPokemonByNameQuery(name);

  const setPokemon = () => {
    if (!data) return;

    setActivePokemon(data);
  };

  return (
    <div
      onClick={setPokemon}
      className="relative flex transform select-none items-center justify-center rounded-xl border  border-slate-100 bg-white shadow-sm duration-300 hover:cursor-pointer hover:shadow-lg active:scale-90"
    >
      {isLoading && <div>Loading...</div>}
      {data && (
        <div className="flex flex-col items-center justify-center">
          <div className="flex h-[70px] w-[70px] items-center justify-center ">
            <Image
              alt={data.name}
              src={
                data.sprites.versions?.["generation-v"]["black-white"].animated
                  ?.front_default as string
              }
              height={70}
              width={70}
              className="absolute top-[-30px]"
            />
          </div>
          <div className="text-xl font-bold capitalize">{data.name}</div>
          <div className="mt-4 flex">
            {data.types.map((type) => (
              <div
                style={{ backgroundColor: getColorFromType(type.type.name) }}
                className={` mr-2 rounded-md  p-2 font-bold capitalize `}
                key={type.type.name}
              >
                {type.type.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Pokemon;
