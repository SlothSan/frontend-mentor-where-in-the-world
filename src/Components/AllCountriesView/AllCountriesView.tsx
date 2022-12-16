import CountryCard from "../CountryCard/CountryCard";
import {useEffect, useState} from "react";
import {faS, faMagnifyingGlass, faChevronDown} from '@fortawesome/free-solid-svg-icons';
import {library} from "@fortawesome/fontawesome-svg-core";
import './AllCountriesView.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

library.add(faS, faMagnifyingGlass, faChevronDown)


interface AllCountriesViewProps {
    theme: string
}

const AllCountriesView = (props: AllCountriesViewProps): JSX.Element => {
    const [allCountriesData, setAllCountriesData] = useState([]);
    const [searchString, setSearchString] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const getAllCountryData = async (): Promise<any> => {
        const countriesData = await fetch('https://restcountries.com/v3/all')
        const countriesDataJson = await countriesData.json();
        //TODO Refactor this it doesn't feel right
        setAllCountriesData(Object.entries(countriesDataJson));
    }

    const getSearchedCountryData = async (): Promise<any> => {
        let url = `https://restcountries.com/v3/name/${searchString}`
        if (searchString === ``) {
            url = `https://restcountries.com/v3/all`
        }
        const countryData = await fetch(url)
        const countryDataJson = await countryData.json();
        if (countryDataJson.status === 404) {
            return;
        }
        setAllCountriesData(Object.entries(countryDataJson));
    }

    const handleSearchClick = (event) => {
        event.preventDefault();
        getSearchedCountryData()
    }

    const handleDropdownClick = () => {
        setDropdownOpen(!dropdownOpen);
    }

    useEffect(() => {
        getAllCountryData();
    }, [])


    return (
        <section className={"all-countries-view"}>
            <form onSubmit={handleSearchClick} className={`search ${props.theme}-element`}>
                <FontAwesomeIcon onClick={handleSearchClick} icon={['fas', 'magnifying-glass']}/>
                <input onChange={(event) => setSearchString(event.target.value)}
                       className={`${props.theme}-element`}
                       type={"text"}
                       placeholder={"Search for a country..."}/>
            </form>
            <div className={`dropdown-container`}>
                <div onClick={handleDropdownClick} className={`dropdown ${props.theme}-element`}>Filter by
                    Region <FontAwesomeIcon icon={['fas', 'chevron-down']}/></div>
                <div className={dropdownOpen ? `dropdown-menu ${props.theme}-element` : "hidden"}>
                    <div><p>Africa</p></div>
                    <div><p>America</p></div>
                    <div><p>Asia</p></div>
                    <div><p>Europe</p></div>
                    <div><p>Oceania</p></div>
                </div>
            </div>
            {allCountriesData.map((country) => {
                return (
                    <CountryCard
                        key={country[1].name.common}
                        flag={country[1].flags[1]}
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
