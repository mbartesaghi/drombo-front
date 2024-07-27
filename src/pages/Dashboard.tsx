
import React from 'react';
import Button from '../components/button/button';

const Dashboard = () => {

  const submit = () => {
    console.log('Boton de prueba');
  }

  return (
    <>
      <Button text='Boton de prueba' color='secondary' type='submit' onClick={() => submit()}/>
    </>
  );
}

export default Dashboard;
