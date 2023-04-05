import { useGetPokemonByNameQuery } from "@/store/api/api";
import { setActivePokemon } from "@/store/slices/activePokemonSlice";
import { useAppDispatch } from "@/store/store";
import { getColorFromType } from "@/utils/get-color-from-type";
import Image from "next/image";
import React from "react";
import { AiOutlineFieldNumber } from "react-icons/ai";
import Loading from "./loading";

type PokemonProps = {
  name: string;
};

const Pokemon = ({ name }: PokemonProps) => {
  const { data, isLoading } = useGetPokemonByNameQuery(name);
  const dispatch = useAppDispatch();

  const setPokemon = () => {
    if (!data) return;

    dispatch(setActivePokemon(data));
  };

  return (
    <div
      onClick={setPokemon}
      className="relative flex transform select-none items-center justify-center rounded-xl border  border-slate-100 bg-white shadow-sm duration-300 hover:cursor-pointer hover:shadow-lg active:scale-90"
    >
      {isLoading && (
        <div>
          <Loading />
        </div>
      )}
      {data && (
        <div className="flex flex-col items-center justify-center">
          <div className=" flex h-[70px] w-[70px] items-center justify-center md:h-[40px] md:w-[40px]">
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
          <div className="text-md flex items-center font-bold text-slate-500 md:text-sm ">
            <AiOutlineFieldNumber size={18} />
            <div>{data.id}</div>
          </div>
          <div className="text-xl font-bold capitalize md:text-lg">
            {data.name}
          </div>
          <div className=" flex">
            {data.types.map((type) => (
              <div
                style={{ backgroundColor: getColorFromType(type.type.name) }}
                className={`mr-2 rounded-md p-2 font-bold capitalize md:text-sm `}
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
