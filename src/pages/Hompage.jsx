import TestCustomizationBar from '../components/TestCustomizationBar'
import {SettingContext} from '../context/Settings'
import Testbox from '../components/Testbox'
import { useState,useContext } from 'react'
const Homepage = () => {
  const [isVisible,Setvisible] = useState(true)
  const {settings} = useContext(SettingContext)
  return (  
    <>
    <TestCustomizationBar isVisible={isVisible}/>
<Testbox settings={settings} on={()=>Setvisible(true)} off={()=>Setvisible(false)}/>
    </>
  )
}

export default Homepage