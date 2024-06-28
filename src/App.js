import React from 'react';
import './index.css'; 
import UserForm from './UserForm';
import MonthlyPaymentForm from './MonthlyPaymentForm';

const App = () => {
  return (
    <div className="App">
      <UserForm />
      <MonthlyPaymentForm />
    </div>
  );
};

export default App;
