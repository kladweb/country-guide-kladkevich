import React from 'react';
import { Outlet } from 'react-router-dom';

import { Country } from './Country';

import './Countries.css';

export const Countries = ({countries}) => {
  const countriesCode = countries.map(client =>
    <Country
      key={client.code}
      code={client.code}
      name={client.name}
      page='/countries/'
      />
  );

  return (
    <div className='CountriesGroup'>
      {countriesCode}
      <Outlet/>
    </div>
  );
}