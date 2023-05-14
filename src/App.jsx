import React from 'react';
import { Header } from './components';
import { ClientsPage } from './pages';

export const App = () => {
  return (
    <div className='App'>
      <Header />
      <ClientsPage />
    </div>
  );
};
