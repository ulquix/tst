import { Listbox } from '@headlessui/react';
import { useState, useEffect, useContext } from 'react';
import { SettingContext } from '../context/Settings';

const options = ['easy', 'normal', 'hard'];

const DifficultyLevel = () => {
  const { settings, setSettings } = useContext(SettingContext);
  const [selected, setSelected] = useState(difficultyOptions[0]);

  useEffect(() => {
    setSettings({ ...settings, mode: selected });
  }, [selected]);

  return (
    <div style={{ minWidth: 120 }}>
 <Listbox value={selected} onChange={setSelected}>
  <div style={{ position: 'relative', width: 120 }}>
    <Listbox.Button
      style={{
        width: '100%',
        backgroundColor: 'rgb(17 24 39)',
        color: 'white',
        padding: '0.5rem 1rem',
        borderRadius: '12px',
        fontFamily: 'monospace',
        cursor: 'pointer',
        border: '1px solid #3b82f6',
        textAlign: 'left',
        userSelect: 'none',
      }}
    >
      {selected}
    </Listbox.Button>
    <Listbox.Options
      style={{
        position: 'absolute',
        marginTop: '0.5rem',
        width: '100%',
        maxWidth: 120,
        backgroundColor: 'rgb(17 24 39)',
        color: 'white',
        borderRadius: '12px',
        border: '1px solid #3b82f6',
        zIndex: 10,
        fontFamily: 'monospace',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {difficultyOptions.map((option, idx) => (
        <Listbox.Option
          key={idx}
          value={option}
          style={{
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            userSelect: 'none',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#3b82f6')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          {option}
        </Listbox.Option>
      ))}
    </Listbox.Options>
  </div>
</Listbox>

    </div>
  );
};


export default DifficultyLevel;
