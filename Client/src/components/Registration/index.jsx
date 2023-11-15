import React from 'react';
import { RegistrationForm } from './RegistrationForm';
import RegistrationProvider from './RegistrationContext';

const RegistrationSection = () => {

  return (
    <RegistrationProvider>

    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: '100px',
      }}
    >
      {/* {stage === STAGES.TYPE_OF_USER && <ChoiceStage />} */}
      {<RegistrationForm />}
      {/* {stage === STAGES.REGISTRATION_CLOSED && <Heading1>Registration Closed</Heading1>} */}
    </div>
    </RegistrationProvider>

  );
};

export default RegistrationSection;
export * from './RegistrationContext';
