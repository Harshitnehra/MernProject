import React from 'react'
import Header from '../components/Header'
import Specialitymenu from '../components/Specialitymenu'
import Todoctor from '../components/Todoctor'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <div>
      <Header></Header>
      <Specialitymenu></Specialitymenu>
      <Todoctor/>
      <Banner/>
      
    </div>
  )
}

export default Home
