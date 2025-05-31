import React from 'react'
import Navbar from '../components/Navbar'
import TestCustomizationBar from '../components/TestCustomizationBar'
import Settings from '../context/Settings'
import Testbox from '../components/Testbox'
const Homepage = () => {
  return (
    <>
<Settings>
    {/* <TestCustomizationBar/> */}
<Testbox/>
</Settings>
    </>
  )
}

export default Homepage