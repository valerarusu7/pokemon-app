import { useGetPokemonByNameQuery } from "@/store/api/api";
import Image from "next/image";
import React from "react";

const EvolutionChainImage = ({ name }: { name: string }) => {
  const { data } = useGetPokemonByNameQuery(name);

  return (
    <div className="flex h-[70px] w-[70px] items-center justify-center ">
      <Image
        alt={name}
        src={data?.sprites.other?.dream_world.front_default as string}
        height={50}
        width={50}
        fill={false}
      />
    </div>
  );
};

export default EvolutionChainImage;
