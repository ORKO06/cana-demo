import React, { useContext} from 'react';
import { RegistrationContext } from './RegistrationContext';
import { InputContainer, RegistrationCard, RegistrationCardTitle } from './styles';
import Input from './Input';
import UploadExcel from '../Shared/UploadExcel';
import { Button } from '../Shared/styles';

export const RegistrationForm = ({onSubmit}) => {
  const { inputData, setInputValue } =
    useContext(RegistrationContext);
  return (
    <RegistrationCard>
      <RegistrationCardTitle>
        <h2 style={{ textTransform: 'none' }}>
          Input
        </h2>
        <UploadExcel />
      </RegistrationCardTitle>
        <>
          <InputContainer>
            {Object.entries(inputData)
              .map(([key, value], index, array) => {
                let gridCols;
                if (array.length <= 4) {
                  gridCols = 'span 4';
                } else if (index === array.length - 1 && index % 2 === 0) {
                  gridCols = '2 / 4';
                } else {
                  gridCols = 'span 2';
                }
                return (
                  <div key={key} style={{ gridColumn: gridCols }}>
                    <Input
                      data={value}
                      key={key}
                      onChange={(e) => {
                        setInputValue(key, e.target.value)
                      }}
                    />
                  </div>
                );
              })}
          </InputContainer>

          <Button
            type='submit'
            width='350px'
            onClick={onSubmit}
          >
            Submit
          </Button>
        </>
      
    </RegistrationCard>
  );
};
