import React, { useState, useEffect,useContext } from 'react';
import { FaEllipsisVertical } from "react-icons/fa6";
import { FaAt, FaHashtag } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import { TbCircleLetterAFilled } from "react-icons/tb";
import { FaQuoteLeft } from "react-icons/fa6";
import { FaWrench } from "react-icons/fa";
import { GiCrossedChains } from "react-icons/gi";
import { SettingContext } from '../context/Settings';
import DifficultyLevel from './DifficultyLevel'


const timearr = [15, 30, 60, 120];
const wordarr = [20, 50, 100, 200];
const quotearr = ["short", "medium", "long"];

const TestCustomizationBar = ({isVisible}) => {
  const {settings,setSettings} = useContext(SettingContext);


  const [variableToMap, setVariableToMap] = useState(timearr);

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleCategoryClick = (type) => {
    
    if (type === 'time') setVariableToMap(timearr);
    else if (type === 'words') setVariableToMap(wordarr);
    else if (type === 'quote') setVariableToMap(quotearr);
    else setVariableToMap([]); 
    setSettings({...settings,BasedOn:type,BasedDependency:variableToMap[0]})
    console.log(variableToMap[0])
  };

  const toogleDependency = (value)=>{
console.log(value)
setSettings({...settings,BasedDependency:value})
  }
  useEffect(() => {
    console.log("Settings updated:", settings);

  }, );

useEffect(()=>{
setSettings({...settings,BasedDependency:variableToMap[0]})
// eslint-disable-next-line react-hooks/exhaustive-deps
},[variableToMap])
  return (
    <>
    {isVisible && 
    
    <div>
   <div className=" flex justify-center">
  <div className={`bg-amber-300  flex gap-4 justify-center items-center rounded-xl p-4 `}>
      <div className="flex items-center justify-center gap-4">
        <span onClick={() => toggleSetting('punctuations')} className={`cursor-pointer hover:text-gray-400  flex items-center gap-1 ${settings.punctuations?'text-blue-400':''} `}>
          <FaAt /> punctuations
        </span>
        <span onClick={() => toggleSetting('numbers')} className={`cursor-pointer hover:text-gray-400  flex items-center gap-1 ${settings.numbers?'text-blue-400':''} `}>
          <FaHashtag /> numbers
        </span>
      </div>

      <FaEllipsisVertical />

      <div className="flex items-center gap-4 flex-wrap justify-center">
        <span onClick={() => handleCategoryClick('time')} className={`${settings.BasedOn=='time'?'text-blue-400':''} cursor-pointer hover:text-gray-400 flex items-center gap-1`}>
          <IoTime /> time
        </span>
        <span onClick={() => handleCategoryClick('words')} className={`${settings.BasedOn=='words'?'text-blue-400':''} cursor-pointer hover:text-gray-400 flex items-center gap-1`}>
          <TbCircleLetterAFilled /> words
        </span>
        <span onClick={() => handleCategoryClick('quote')} className={`${settings.BasedOn=='quote'?'text-blue-400':''} cursor-pointer hover:text-gray-400 flex items-center gap-1`}>
          <FaQuoteLeft /> quote
        </span>
        <span onClick={() => handleCategoryClick('custom')} className={`${settings.BasedOn=='custom'?'text-blue-400':''} cursor-pointer hover:text-gray-400 flex items-center gap-1`}>
          <FaWrench /> custom
        </span>
        <span onClick={() => handleCategoryClick('freestyle')} className={`${settings.BasedOn=='freestyle'?'text-blue-400':''} cursor-pointer hover:text-gray-400 flex items-center gap-1`}>
          <GiCrossedChains /> Freestyle
        </span>
      </div>
{settings.BasedDependency && ( <>   <FaEllipsisVertical />

      {variableToMap.length > 0 && (
        <div className="flex items-center gap-4">
          {variableToMap.map((item, index) => (
            <div key={index} className={`cursor-pointer hover:text-gray-400 ${settings.BasedDependency==item?'text-blue-400':''} `} onClick={() => toogleDependency(item)}>
              {item}
            </div>
          ))}
        </div>
      )}
      </>
    )
      }
   
    </div>
  </div>
    <DifficultyLevel/>

</div>
    }
    </>
  );
};

export default TestCustomizationBar;
