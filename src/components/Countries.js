import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useSelector } from "react-redux";

import { Country } from './Country';

import './Countries.css';

export const Countries = ({countries, page}) => {

  const countriesCode = countries.map(client =>
    <Country
      key={client.code}
      code={client.code}
      name={client.name}
      page={`/countries/${page}/`}
    />
  );

  let countPages = useSelector(state => state.countries.countPages);
  const navPagesCode = () => {
    let navPages = [];
    for (let i = 1; i <= countPages; i++) {
      navPages.push(
        <NavLink to={`/countries/${i}`} className='navPages-links' key={i}>
          <span className='navPages-items'>{i}</span>
        </NavLink>
      );
    }
    return navPages;
  }

  function getLinkClass(obj) {
    let className = "navPages-links";
    if (obj.isActive)
      className += " active";
    return className;
  }

  return (
    <>
      <div className='navPages'>
        <span className='navPages-items'>PAGES: </span>
        <NavLink to={`/countries/all`} className={getLinkClass} key={countPages + 1}>
          <span className='navPages-items'>ALL</span>
        </NavLink>
        {navPagesCode()}
      </div>
      <div className='CountriesGroup'>
        {countriesCode}
        <Outlet/>
      </div>
    </>
  );
}