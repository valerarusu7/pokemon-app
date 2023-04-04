import Image from "next/image";
import React from "react";
import pokeball from "@/assets/pokeball.png";

const Header = () => {
  return (
    <header className="flex w-full select-none gap-4">
      <div className="flex grow  rounded-xl border border-slate-100 bg-white p-2 shadow-sm">
        <input
          placeholder="Search your Pokémon!"
          type="text"
          className="mr-2 grow pl-4 outline-none"
        />
        <button className="group transform rounded-xl bg-[#e56449] p-3 shadow-lg shadow-red-500 transition-transform hover:opacity-75 active:scale-75">
          <Image
            className="group-hover:animate-spin"
            src={pokeball}
            alt="Search"
            width={30}
            height={30}
          />
        </button>
      </div>
      <button className="flex transform items-center rounded-xl bg-red-500/80 px-12 py-4 text-2xl font-bold text-white shadow-lg transition-transform hover:opacity-75 active:scale-75">
        <div>Battle</div>
      </button>
    </header>
  );
};

export default Header;