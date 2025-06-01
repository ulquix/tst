import TestCustomizationBar from '../components/TestCustomizationBar'
import Settings from '../context/Settings'
import Testbox from '../components/Testbox'
import { useState } from 'react'
const Homepage = () => {
  const [isVisible,Setvisible] = useState(true)
  return (  
    <>
<Settings>
    <TestCustomizationBar isVisible={isVisible}/>
<Testbox on={()=>Setvisible(true)} off={()=>Setvisible(false)}/>
</Settings>
    </>
  )
}

export default Homepage