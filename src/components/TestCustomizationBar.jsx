import React, { useState, useEffect, useContext } from 'react';
import { IoTime } from "react-icons/io5";
import { TbCircleLetterAFilled } from "react-icons/tb";
import { FaEllipsisVertical, FaPlus } from "react-icons/fa6";
import { SettingContext } from '../context/Settings';

const timearr = [15, 30, 60, 120];
const wordarr = [20, 50, 100, 200];
const difficultyOptions = ['easy', 'normal', 'hard'];

const DifficultyLevel = () => {
  const { settings, setSettings } = useContext(SettingContext);
  const [selected, setSelected] = useState(difficultyOptions[0]);

  useEffect(() => {
    if (setSettings) {
      setSettings(prev => ({ ...prev, mode: selected }));
    }
  }, [selected, setSettings]);
  useEffect(() => {
    

  }, [settings])
  

  return (
    <div style={{ minWidth: 120, position: 'relative' }}>
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        style={{
          width: '100%',
          backgroundColor: 'rgb(17 24 39)',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '12px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          cursor: 'pointer',
          border: '1px solid #3b82f6',
          userSelect: 'none',
          appearance: 'none',
          backgroundImage: 'url("data:image/svg+xml;charset=utf-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236B7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")',
          backgroundPosition: 'right 0.5rem center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '1rem',
          paddingRight: '2.5rem',
        }}
      >
        {difficultyOptions.map((option, idx) => (
          <option
            key={idx}
            value={option}
            style={{
              backgroundColor: 'rgb(17 24 39)',
              color: 'white',
              padding: '0.5rem',
            }}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

const TestCustomizationBar = ({ isVisible }) => {
  const { settings, setSettings } = useContext(SettingContext);
  const [variableToMap, setVariableToMap] = useState(timearr);
  // Store separate values for time and words
  const [timeValue, setTimeValue] = useState(timearr[0]);
  const [wordsValue, setWordsValue] = useState(wordarr[0]);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customValue, setCustomValue] = useState('');

  const handleCategoryClick = (type) => {
    const newArray = type === 'time' ? timearr : type === 'words' ? wordarr : [];
    setVariableToMap(newArray);
    
    // Use the stored value for the selected type
    const storedValue = type === 'time' ? timeValue : type === 'words' ? wordsValue : null;
    
    if (setSettings) {
      setSettings(prev => ({ 
        ...prev, 
        BasedOn: type, 
        BasedDependency: storedValue
      }));
    }
  };

  const toggleDependency = (value) => {
    // Update the appropriate stored value based on current type
    if (settings?.BasedOn === 'time') {
      setTimeValue(value);
    } else if (settings?.BasedOn === 'words') {
      setWordsValue(value);
    }
    
    if (setSettings) {
      setSettings(prev => ({ ...prev, BasedDependency: value }));
    }
  };

  const handleCustomValue = () => {
    if (customValue && !isNaN(customValue) && parseInt(customValue) > 0) {
      const value = parseInt(customValue);
      
      // Update the appropriate stored value
      if (settings?.BasedOn === 'time') {
        setTimeValue(value);
      } else if (settings?.BasedOn === 'words') {
        setWordsValue(value);
      }
      
      if (setSettings) {
        setSettings(prev => ({ ...prev, BasedDependency: value }));
      }
      
      setCustomValue('');
      setShowCustomInput(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCustomValue();
    } else if (e.key === 'Escape') {
      setCustomValue('');
      setShowCustomInput(false);
    }
  };

  useEffect(() => {
    // Initialize BasedOn and BasedDependency if not set
    if (settings && !settings.BasedOn) {
      if (setSettings) {
        setSettings(prev => ({
          ...prev,
          BasedOn: 'time',
          BasedDependency: timeValue
        }));
      }
    }
  }, [settings, setSettings, timeValue]);

  useEffect(() => {
    // Update variableToMap based on current BasedOn setting
    if (settings?.BasedOn === 'time') {
      setVariableToMap(timearr);
    } else if (settings?.BasedOn === 'words') {
      setVariableToMap(wordarr);
    }
  }, [settings?.BasedOn]);

  if (!isVisible) return null;

  // Handle case where context might not be available
  if (!settings || !setSettings) {
    return (
      <div className="flex justify-center mt-4">
        <div style={{ color: 'white', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
          Settings context not available
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-4">
      <div style={{
        backgroundColor: 'rgb(17 24 39)',
        color: 'white',
        display: 'flex',
        gap: '2rem',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '12px',
        padding: '1rem 2rem',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        userSelect: 'none',
        position: 'relative',
        flexWrap: 'wrap', // Better responsive behavior
      }}>
        {/* Categories */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <span
            onClick={() => handleCategoryClick('time')}
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: settings.BasedOn === 'time' ? '#3b82f6' : 'white',
              transition: 'color 0.3s',
              userSelect: 'none'
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#60a5fa'}
            onMouseLeave={e => e.currentTarget.style.color = settings.BasedOn === 'time' ? '#3b82f6' : 'white'}
          >
            <IoTime size={20} /> time
          </span>
          <span
            onClick={() => handleCategoryClick('words')}
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: settings.BasedOn === 'words' ? '#3b82f6' : 'white',
              transition: 'color 0.3s',
              userSelect: 'none'
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#60a5fa'}
            onMouseLeave={e => e.currentTarget.style.color = settings.BasedOn === 'words' ? '#3b82f6' : 'white'}
          >
            <TbCircleLetterAFilled size={20} /> words
          </span>
        </div>

        <FaEllipsisVertical style={{ color: '#64748b' }} />

        {/* Sub values */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          {variableToMap.map((item, index) => (
            <div
              key={index}
              onClick={() => toggleDependency(item)}
              style={{
                cursor: 'pointer',
                color: settings.BasedDependency === item ? '#3b82f6' : 'white',
                transition: 'color 0.3s',
                userSelect: 'none',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                minWidth: '2rem',
                textAlign: 'center'
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#60a5fa'}
              onMouseLeave={e => e.currentTarget.style.color = settings.BasedDependency === item ? '#3b82f6' : 'white'}
            >
              {item}
            </div>
          ))}
          
          {/* Custom value input */}
          {showCustomInput ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div
                contentEditable
                onInput={(e) => {
                  const text = e.target.textContent;
                  // Only allow numbers
                  const numericValue = text.replace(/[^0-9]/g, '');
                  if (text !== numericValue) {
                    e.target.textContent = numericValue;
                    // Move cursor to end
                    const range = document.createRange();
                    const sel = window.getSelection();
                    range.selectNodeContents(e.target);
                    range.collapse(false);
                    sel.removeAllRanges();
                    sel.addRange(range);
                  }
                  setCustomValue(numericValue);
                }}
                onKeyDown={handleKeyPress}
                onBlur={() => {
                  if (!customValue) {
                    setShowCustomInput(false);
                  }
                }}
                ref={(el) => {
                  if (el && showCustomInput) {
                    el.focus();
                    // Set placeholder-like text
                    if (!customValue) {
                      el.textContent = '';
                      el.setAttribute('data-placeholder', settings?.BasedOn === 'time' ? 'min' : 'words');
                    }
                  }
                }}
                style={{
                  width: '60px',
                  height: '24px',
                  backgroundColor: 'rgb(17 24 39)',
                  color: 'white',
                  border: '1px solid #3b82f6',
                  borderRadius: '4px',
                  padding: '0.25rem 0.5rem',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontSize: '0.875rem',
                  textAlign: 'center',
                  outline: 'none',
                  minHeight: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                data-placeholder={settings?.BasedOn === 'time' ? 'min' : 'words'}
              />
              <button
                onClick={handleCustomValue}
                style={{
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.25rem 0.5rem',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}
              >
                Set
              </button>
            </div>
          ) : (
            <div
              onClick={() => setShowCustomInput(true)}
              style={{
                cursor: 'pointer',
                color: '#64748b',
                transition: 'color 0.3s',
                userSelect: 'none',
                padding: '0.25rem',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#3b82f6'}
              onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
              title="Set custom value"
            >
              <FaPlus size={12} />
            </div>
          )}
        </div>

        <FaEllipsisVertical style={{ color: '#64748b' }} />

        {/* Difficulty dropdown */}
        <DifficultyLevel />
      </div>
    </div>
  );
};

export default TestCustomizationBar;