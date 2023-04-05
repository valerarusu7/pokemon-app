export type Pokemons = {
  count: number;
  next: string;
  previous: string | null;
  results: InitialPokemon[];
};

type InitialPokemon = {
  name: string;
  url: string;
};

interface NamedAPIResource<T> {
  name: string;
  url: string;
}

export type EvolutionResponse = {
  id: number;
  chain: ChainLink;
};

interface ChainLink {
  is_baby: boolean;
  species: NamedAPIResource<Pokemon>;
  evolution_details: EvolutionDetail[];
  evolves_to: ChainLink[];
}

interface EvolutionTrigger {
  id: number;
  name: string;
}

interface EvolutionDetail {
  trigger: NamedAPIResource<EvolutionTrigger>;
  gender: number | null;
  known_move: NamedAPIResource<Move> | null;
  known_move_type: NamedAPIResource<Type> | null;
  location: NamedAPIResource<Location> | null;
  min_level: number | null;
  min_happiness: number | null;
  min_beauty: number | null;
  min_affection: number | null;
  needs_overworld_rain: boolean;
  party_type: NamedAPIResource<Type> | null;
  relative_physical_stats: number | null;
  time_of_day: string;
  turn_upside_down: boolean;
}

export type SpeciesResponse = {
  evolution_chain: EvolutionChain;
  flavor_text_entries: [{ flavor_text: string }];
};

export type EvolutionChain = {
  url: string;
};

export type Pokemon = {
  abilities: Ability[];
  base_experience: number;
  forms: Species[];
  game_indices: GameIndex[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  past_types: any[];
  species: Species;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
};

export interface Ability {
  ability: Species;
  is_hidden: boolean;
  slot: number;
}

export interface Species {
  name: string;
  url: string;
}

export interface GameIndex {
  game_index: number;
  version: Species;
}

export interface Move {
  move: Species;
  version_group_details: VersionGroupDetail[];
}

export interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: Species;
  version_group: Species;
}

export interface GenerationV {
  "black-white": Sprites;
}

export interface GenerationIv {
  "diamond-pearl": Sprites;
  "heartgold-soulsilver": Sprites;
  platinum: Sprites;
}

export interface Versions {
  "generation-i": GenerationI;
  "generation-ii": GenerationIi;
  "generation-iii": GenerationIii;
  "generation-iv": GenerationIv;
  "generation-v": GenerationV;
  "generation-vi": { [key: string]: Home };
  "generation-vii": GenerationVii;
  "generation-viii": GenerationViii;
}

export interface Sprites {
  back_default: string;
  back_female: null;
  back_shiny: string;
  back_shiny_female: null;
  front_default: string;
  front_female: null;
  front_shiny: string;
  front_shiny_female: null;
  other?: Other;
  versions?: Versions;
  animated?: Sprites;
}

export interface GenerationI {
  "red-blue": RedBlue;
  yellow: RedBlue;
}

export interface RedBlue {
  back_default: string;
  back_gray: string;
  back_transparent: string;
  front_default: string;
  front_gray: string;
  front_transparent: string;
}

export interface GenerationIi {
  crystal: Crystal;
  gold: Gold;
  silver: Gold;
}

export interface Crystal {
  back_default: string;
  back_shiny: string;
  back_shiny_transparent: string;
  back_transparent: string;
  front_default: string;
  front_shiny: string;
  front_shiny_transparent: string;
  front_transparent: string;
}

export interface Gold {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
  front_transparent?: string;
}

export interface GenerationIii {
  emerald: OfficialArtwork;
  "firered-leafgreen": Gold;
  "ruby-sapphire": Gold;
}

export interface OfficialArtwork {
  front_default: string;
  front_shiny: string;
}

export interface Home {
  front_default: string;
  front_female: null;
  front_shiny: string;
  front_shiny_female: null;
}

export interface GenerationVii {
  icons: DreamWorld;
  "ultra-sun-ultra-moon": Home;
}

export interface DreamWorld {
  front_default: string;
  front_female: null;
}

export interface GenerationViii {
  icons: DreamWorld;
}

export interface Other {
  dream_world: DreamWorld;
  home: Home;
  "official-artwork": OfficialArtwork;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: Species;
}

export interface Type {
  slot: number;
  type: Species;
}

export type EvolutionChainResponse = {
  baby_trigger_item: any;
  chain: {
    evolution_details: [];
    evolves_to: [
      {
        evolution_details: [
          {
            gender: null;
            held_item: null;
            item: null;
            known_move: null;
            known_move_type: null;
            location: null;
            min_affection: null;
            min_beauty: null;
            min_happiness: null;
            min_level: number;
            needs_overworld_rain: boolean;
            party_species: null;
            party_type: null;
            relative_physical_stats: null;
            time_of_day: string;
            trade_species: null;
            trigger: {
              name: string;
              url: string;
            };
            turn_upside_down: boolean;
          }
        ];
        evolves_to: [
          {
            evolution_details: [
              {
                gender: null;
                held_item: null;
                item: null;
                known_move: null;
                known_move_type: null;
                location: null;
                min_affection: null;
                min_beauty: null;
                min_happiness: null;
                min_level: number;
                needs_overworld_rain: boolean;
                party_species: null;
                party_type: null;
                relative_physical_stats: null;
                time_of_day: string;
                trade_species: null;
                trigger: {
                  name: string;
                  url: string;
                };
                turn_upside_down: boolean;
              }
            ];
            evolves_to: [];
            is_baby: boolean;
            species: {
              name: string;
              url: string;
            };
          }
        ];
        is_baby: false;
        species: {
          name: string;
          url: string;
        };
      }
    ];
    is_baby: false;
    species: {
      name: string;
      url: string;
    };
  };
  id: number;
};
