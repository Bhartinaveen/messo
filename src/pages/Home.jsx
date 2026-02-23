import React from 'react'
import SearchBar from '../components/SearchBar'
import HeroShowcase from '../components/HeroShowcase'
import Trending from '../components/Trending'
import TrendingSearch from '../components/explore/TrendingSearch'
import BestSelling from '../components/BestSelling'
// import NewArrival from '../components/NewArrival'
import Testimonials from '../components/Testimonials'
import WhyChooseUs from '../components/WhyChooseUs'
import TrendCollection from '../components/TrendCollection'



const Home = () => {
  return (
    <>
                <SearchBar />
                <HeroShowcase />
                <Trending />
                <TrendCollection/>
                <BestSelling/>
                <TrendingSearch compact />
                {/* <NewArrival/> */}
                <Testimonials/>
                <WhyChooseUs/>
              </>
  )
}

export default Home