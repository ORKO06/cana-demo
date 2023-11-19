import './App.css';
import { RegistrationForm } from './components/Registration/RegistrationForm';
import RegistrationProvider from './components/Registration/RegistrationContext';
import { useState } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import axios from 'axios';

function App() {
  const [submit, setSubmit] = useState(false);

  const onSubmit = () =>{
    console.log("start")
    axios.post('http://localhost:5000/re', {
   firstName: 'Fred',
   lastName: 'Flintstone'
}, {
   headers: {
      'Content-Type': 'application/json',
   },
}).then(function (response) {
   console.log(response);
   console.log("end");
})
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
