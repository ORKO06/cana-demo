import './App.css';
import { RegistrationForm } from './components/Registration/RegistrationForm';
import RegistrationProvider, { RegistrationContext } from './components/Registration/RegistrationContext';
import { useContext, useState } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import axios from 'axios';

function App() {
  const [submit, setSubmit] = useState(false);
  
  const onSubmit = () =>{
//     axios.post('https://canara.onrender.com/re', {
//     ...inputData
// }, {
//    headers: {
//       'Content-Type': 'application/json',
//    },
// }).then(function (response) {
// })
    setSubmit(true);
  }

  return (
    <div className="App">
      <header className="App-header">
        <RegistrationProvider>
          {!submit ? <RegistrationForm onSubmit={onSubmit} /> : <Dashboard /> }
        </RegistrationProvider>
      </header>
    </div>
  );
}

export default App;
