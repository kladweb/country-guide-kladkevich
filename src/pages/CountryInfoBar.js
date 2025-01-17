import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { CountryInfo } from '../components/CountryInfo/CountryInfo';

export const CountryInfoBar = () => {
  const appData = useSelector(state => state.countries.data);
  const params = useParams();
  const countryId = params.countid;
  const countryData = appData.find(c => c.code === countryId);

  return (
    <>
      {
        (countryData) &&
        <CountryInfo
          code={countryData.code}
          name={countryData.name}
          population={countryData.population}
          area={countryData.area}
        />
      }
    </>
  );
}
