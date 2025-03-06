import React from 'react'
import LottieView from 'lottie-react-native'

const Congrats = () => {
  return (
    <LottieView
      source={require('../../../assets/congrats.json')}
      autoPlay
      loop
      style={{ width: 300, height: 300 }}
    />
  )
}

export default Congrats
