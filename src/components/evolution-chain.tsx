import { useGetEvolutionChainByIdQuery } from "@/store/api/api";
import React from "react";
import EvolutionChainImage from "./evolution-chain-image";
interface Evolution {
  species: string;
  level: number | null | undefined;
  trigger: string | undefined;
}

const EvolutionChain = ({ evolutionChainId }: { evolutionChainId: string }) => {
  const { data } = useGetEvolutionChainByIdQuery(evolutionChainId);

  const getPokemonEvolution = (): Evolution[] => {
    const evolutionChain = data?.chain;

    let current = evolutionChain;

    const evolutions = [];
    while (current) {
      const species = current.species.name;
      const level = current.evolution_details[0]?.min_level;
      const trigger = current.evolution_details[0]?.trigger?.name;
      evolutions.push({ species, level, trigger });
      current = current.evolves_to[0];
    }

    return evolutions;
  };

  return (
    <div className="flex items-center sm:block sm:gap-4 lg:flex">
      {getPokemonEvolution().map((pokemon, index) => (
        <div
          key={index}
          className="flex items-center sm:block sm:gap-4 lg:flex"
        >
          {(pokemon.level && (
            <div className="flex rounded-full border border-slate-50 bg-slate-100 px-2 py-1 text-sm font-bold text-gray-400">
              <div className="mr-1">Lvl</div>
              <div>{pokemon.level} </div>
            </div>
          )) ||
            (pokemon.trigger && (
              <div className="rounded-full border border-slate-50 bg-slate-100 px-2 py-1 text-xs font-bold text-gray-400">
                <div>Evolves</div>
              </div>
            ))}
          <EvolutionChainImage name={pokemon.species} />
        </div>
      ))}
    </div>
  );
};

export default EvolutionChain;
