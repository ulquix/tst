import { Listbox } from '@headlessui/react';
import { useState ,useEffect, useContext} from 'react';
import { SettingContext } from '../context/Settings';

const options = ['easy', 'normal', 'hard'];
const DifficultyLevel = () => {
  const {settings,setSettings} = useContext(SettingContext);
  const [selected, setSelected] = useState(options[0]);
  useEffect(() => {
setSettings({...settings,mode:selected})
  }, [selected])
  
  return (
    <div className="mt-8 flex justify-center">
      <div className="relative">
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative">
            <Listbox.Button className="w-40 bg-amber-300 text-black px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-amber-500">
              {selected}
            </Listbox.Button>
            <Listbox.Options className="absolute mt-2 w-40 bg-black text-white rounded-lg shadow-lg z-10">
              {options.map((option, index) => (
                <Listbox.Option
                  key={index}
                  value={option}
                  className={({ active }) =>
                    `cursor-pointer px-4 py-2 transition-colors duration-150 ${
                      active ? 'bg-amber-400 text-black' : 'bg-black text-white'
                    }`
                  }
                >
                  {option}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>
    </div>
  );
};

export default DifficultyLevel;
