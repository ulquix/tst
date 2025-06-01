import { createContext ,useState} from "react";

 export const SettingContext = createContext();


const Settings = (props) => {
    const [settings,setSettings] = useState({
        BasedOn: "time",
        BasedDependency: 15,
        mode:'easy'
      });
  return (
    <SettingContext.Provider value={{settings,setSettings}}>{props.children}</SettingContext.Provider>
  )
}
export default Settings