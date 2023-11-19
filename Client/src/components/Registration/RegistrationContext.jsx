import React, { useState, useMemo } from 'react';
import {INPUTS} from './Context';

export const RegistrationContext = React.createContext({
  inputData: {},
  setInputData: () => {},

  // Utility functions
  /**
   *
   * @param {string} key
   * @param {string} value
   */
  setInputValue: () => {},

  /**
   *
   * @param {string} key
   * @param {string} errorMessage
   * @param {boolean} errorVisibility default false
   */
  // setErrorMessage: () => {},
});

const RegistrationProvider = ({ children }) => {
  const [inputData, setInputData] = useState(INPUTS({}));


  const values = useMemo(() => {
    const setInputValue = (key, value) => {
      if (!key) return;
      // if (inputData[key].errorVisibility) setErrorMessage(key, '', false);
      setInputData((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          value,
        },
      }));
    };

    
    
    return {
      inputData,
      setInputValue,
      setInputData,
    };
  }, [ inputData]);

  return <RegistrationContext.Provider value={values}>{children}</RegistrationContext.Provider>;
};

export default RegistrationProvider;
