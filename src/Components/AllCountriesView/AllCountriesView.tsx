import CountryCard from "../CountryCard/CountryCard";
import {useEffect, useState} from "react";


const AllCountriesView = (): JSX.Element => {
    const [allCountriesData, setAllCountriesData] = useState([]);
    const [searchRegion, setSearchRegion] = useState('');

    const getAllCountryData = async (): Promise<any> => {
        const countriesData = await fetch('https://restcountries.com/v3/all')
        const countriesDataJson = await countriesData.json();
        //TODO Refactor this it doesn't feel right
        setAllCountriesData(Object.entries(countriesDataJson));
    }


    useEffect(() => {
        getAllCountryData();
    }, [])

    useEffect(() => {
        console.log(allCountriesData)
    }, [allCountriesData])


    return (
        <section>
            {allCountriesData.map((country) => {
                return (
                    <CountryCard flag={country[1].flags[0]}
                                 name={country[1].name.common}
                                 population={country[1].population}
                                 region={country[1].region}
                                 capital={country[1].capital}/>
                )
            })}
        </section>
    )
}

export default AllCountriesView
