import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const CountryDetails = (): JSX.Element => {
    const {name} = useParams();
    const [countryData, setCountryData] = useState({});
    const [countryName, setCountryName] = useState("");
    const [countryNativeName, setCountryNativeName] = useState("");
    const [countryPopulation, setCountryPopulation] = useState(0);
    const [countryRegion, setCountryRegion] = useState("");
    const [countryCapital, setCountryCapital] = useState("");
    const [countryTLD, setCountryTLD] = useState("");

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
        setCountryName(countryData.name)
        setCountryNativeName(countryData.nativeName);
        setCountryPopulation(countryData.population);
        setCountryRegion(countryData.region);
        setCountryCapital(countryData.capital);
        setCountryTLD(countryData.topLevelDomain);

    }, [countryData])


    return (
        <section>
            <Link to={"/"}>Back</Link>
            <p>{countryName}</p>
            <p>Native Name: <span>{countryNativeName}</span></p>
            <p>Population: <span>{countryPopulation}</span></p>
            <p>Region: <span>{countryRegion}</span></p>
            <p>Capital: <span>{countryCapital}</span></p>
            <p>Top Level Domain: <span>{countryTLD}</span></p>
            {/*<p>Languages: <span>{countryData.languages}</span></p>*/}
        </section>
    )
}

export default CountryDetails
