import CountryCard from "../CountryCard/CountryCard";
import {useEffect, useState} from "react";
import {faS, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {library} from "@fortawesome/fontawesome-svg-core";

library.add(faS, faMagnifyingGlass)
import './AllCountriesView.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface AllCountriesViewProps {
    theme: string
}

const AllCountriesView = (props: AllCountriesViewProps): JSX.Element => {
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
        <section className={"all-countries-view"}>
            <form className={`search ${props.theme}-element`}>
                <FontAwesomeIcon icon={['fas', 'magnifying-glass']}/>
                <input className={`${props.theme}-element`} type={"text"} placeholder={"Search for a country..."}/>
            </form>
            {allCountriesData.map((country) => {
                return (
                    <CountryCard flag={country[1].flags[1]}
                                 name={country[1].name.common}
                                 population={country[1].population}
                                 region={country[1].region}
                                 capital={country[1].capital}
                                 theme={props.theme}/>
                )
            })}
        </section>
    )
}

export default AllCountriesView
