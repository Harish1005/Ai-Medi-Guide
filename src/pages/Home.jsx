import { motion } from 'framer-motion'
import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-amber-300 to-amber-900'>

      <motion.h1 className='text-5xl font-serif text-white font-bold md:text-6xl text-center mb-4'
      initial={{opacity:0, y:-40}}
      animate={{opacity:1, y:0}}
      transition={{duration:0.9}}>
        ⚕️HealAtHome🌿
      </motion.h1>

      <motion.p className='text-4xl md:text-3xl text-center text-black font-semibold mb-8 max-w-8xl'
      initial={{opacity:0, y:-40}}
      animate={{opacity:1, y:0}}
      transition={{delay:0.3,duration:0.9}}>
        Right care, right at home - your health, your comfort. 🌿🛡️✨
      </motion.p>

      <motion.div
      whileHover={{scale: 1.05}}
      whileTap={{scale: 0.99}}>
      <Link to="/app"
      className='bg-gradient-to-br from-amber-700 to-amber-500 text-center text-3xl text-white px-6 py-4 rounded-lg hover:shadow-lg hover:cursor-pointer font-serif'>
        Tap to Heal✨🩺
      </Link>
      </motion.div>
    </div>
  )
}

export default Home
