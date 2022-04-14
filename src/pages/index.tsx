import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import {trpc} from '@/utils/trpc'

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(["hello", { text: "Andrei" }])
  
  if (isLoading) return <div>Loading....</div>
  if (data) return <div>{data.greeting}</div>
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="text-2xl text-center">Witch poke is Roundest??</div>
      <div className="p-2"/>
      <div className="border rounded p-8 flex justify-between items-center max-w-2xl">
        <div className="w-16 h-16 bg-red-200"></div>
        <div className="p-8">VS</div>
        <div className="w-16 h-16 bg-red-200"></div>
      </div>
     </div>
  )
}

export default Home
