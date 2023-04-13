import React, { useState, useEffect } from 'react';

import { Countries } from '../components/Countries';

import { useDispatch, useSelector } from "react-redux";
import { countriesLoad } from "../redux/countriesLoad";
import { LoadingStatus } from "./LoadingStatus";
import { Outlet, useParams } from "react-router-dom";
import { favCountriesLoad } from "../redux/favCountriesLoad";
import { updateCurrentData } from "../redux/countriesSlice";

export const PageCountries = () => {

  const params = useParams();
  const page = params.part;
  const dispatch = useDispatch();
  const country = useSelector(state => state.countries);

  useEffect(
    () => {
      if (country.dataLoadState !== 2) {
        dispatch(countriesLoad);
        dispatch(favCountriesLoad);
      }
    },
    []
  );

  useEffect(() => {
      if (country.dataLoadState === 2) {
        dispatch(updateCurrentData({page: page, data: country.data}));
      }
    },
    [page]
  );

  return (
    <div className='CountryList'>
      <div className='content'>
        {(country.dataLoadState === 0) &&
          <LoadingStatus loadStatus='no data'/>
        }
        {(country.dataLoadState === 1) &&
          <LoadingStatus loadStatus='loading...'/>
        }
        {(country.dataLoadState === 2) &&
          <Countries countries={country.currentData} page={page}/>
        }
        {(country.dataLoadState === 3) &&
          <LoadingStatus loadStatus={'error ' + country.dataLoadError}/>
        }
      </div>
    </div>

    // <>
    //   <div className='CountryList'>
    //     <div className='content'>
    //       {(country.dataLoadState === 0) && 'no data'}
    //       {(country.dataLoadState === 1) &&
    //         <div className='loading'>
    //           <span className='loading-stastus'>loading...</span>
    //         </div>
    //       }
    //       {(country.dataLoadState === 2) &&
    //         <Countries countries={country.data}/>
    //       }
    //       {(country.dataLoadState === 3) && 'error ' + country.dataLoadError}
    //     </div>
    //   </div>
    // </>
  );

}