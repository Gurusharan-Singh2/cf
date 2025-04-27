import React from 'react'
import Hero_Section from '../components/Hero_Section'
import RecentlyAdded from '../components/RecentlyAdded'


const Home = () => {
  return (
    <div className='bg-zinc-900 px-10 text-gray-300 py-8'>
      
      <Hero_Section></Hero_Section>
      <RecentlyAdded></RecentlyAdded>
    </div>
  )
}

export default Home