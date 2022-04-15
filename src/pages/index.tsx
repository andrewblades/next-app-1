import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import {trpc} from '@/utils/trpc'
import { getOptionsForVote } from '@/utils/getRandomPokemon'
import { inferQueryResponse } from './api/trpc/[trpc]'
import type React from 'react'
import {useState} from 'react'

const btnStyle = "inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"

const Home: NextPage = () => {
  
  const [ids, updateIds] = useState(() => getOptionsForVote())

  const [first, second] = ids
  
  const firstPokemon = trpc.useQuery(["get-pokemon-by-id", {id: first}])
  const secondPokemon = trpc.useQuery(["get-pokemon-by-id", { id: second }])
  
  if (firstPokemon.isLoading || secondPokemon.isLoading) return null
  
  const voteForRoundest = (selected: number) => {
    // todo: fire mutation to persist changes
    updateIds(getOptionsForVote())
  }
  
  console.log(firstPokemon.data)

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="text-2xl text-center">Witch poke is Roundest??</div>
      <div className="p-2"/>
      <div className="border rounded p-8 flex justify-between items-center max-w-2xl">
        {!firstPokemon.isLoading &&
          firstPokemon.data &&
          !secondPokemon.isLoading &&
          secondPokemon.data && (
          <>
            <PokemonListing pokemon={firstPokemon.data} vote={() => voteForRoundest(first)} />
            <div className="p-8">VS</div>
             <PokemonListing pokemon={secondPokemon.data} vote={() => voteForRoundest(second)} />
          </>
        )}
        <div className="p-2"></div>
      </div>
     </div>
  )
}

export default Home

type PokemonFromServer = inferQueryResponse<"get-pokemon-by-id">;

const PokemonListing: React.FC<{
  pokemon: PokemonFromServer,
  vote: () => void
}> = (props) => {
  return (
      <div className="flex flex-col items-center">
          <img
            src={props.pokemon.sprites.front_default}
            className="w-64 h-64 " />
          <div className="text-xl text-center capitalize mt-[-2rem]">
            {props.pokemon.name}
          </div>
          <button className={btnStyle} onClick={() => props.vote()}>Rounder</button>
        </div>
   )
}