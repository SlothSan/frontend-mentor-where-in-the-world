import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const CountryDetails = (): JSX.Element => {
    const {name} = useParams();
    const [countryData, setCountryData] = useState({});

    const getCountryData = async () => {
        const countryData = await fetch('https://restcountries.com/v2/name/' + name)
        const countryDataJson = await countryData.json();
        setCountryData(countryDataJson[0]);
    }

    useEffect(() => {
        getCountryData();
    }, [])

    useEffect(() => {
        console.log(countryData)
    }, [countryData])


    return (
        <section>
            <Link to={"/"}>Back</Link>
            <p>{countryData.name}</p>
            <p>Native Name: <span>{countryData.nativeName}</span></p>
            <p>Population: <span>{countryData.population}</span></p>
            <p>Region: <span>{countryData.region}</span></p>
            <p>Capital: <span>{countryData.capital}</span></p>
            <p>Top Level Domain: <span>{countryData.topLevelDomain}</span></p>
            {/*<p>Languages: <span>{countryData.languages}</span></p>*/}
        </section>
    )
}

export default CountryDetails
