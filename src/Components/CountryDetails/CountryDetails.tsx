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
    const [countryLanguages, setCountryLanguages] = useState([]);
    const [borderQueryString, setBorderQueryString] = useState("");
    const [borderCountries, setBorderCountries] = useState([]);

    const getCountryData = async () => {
        const countryData = await fetch(`https://restcountries.com/v3/name/${name}`)
        const countryDataJson = await countryData.json();
        setCountryData(countryDataJson[0]);
        setBorderQueryString(countryDataJson[0].borders.join(','));
    }

    const getBorderCountries = async () => {
        const borderData = await fetch(`https://restcountries.com/v3/alpha?codes=${borderQueryString}`);
        const borderDataJson = await borderData.json();
        setBorderCountries(borderDataJson);
    }
    
    useEffect(() => {
        getCountryData();
    }, [name])

    useEffect(() => {
        if (Object.keys(countryData).length > 0) {
            console.log(countryData)
            setCountryName(countryData.name.common)
            setCountryNativeName(Object.values(countryData.name.nativeName)[0].common);
            setCountryPopulation(countryData.population);
            setCountryRegion(countryData.region);
            setCountryCapital(countryData.capital);
            setCountryTLD(countryData.tld[0]);
            setCountryLanguages(Object.values(countryData.languages))
            getBorderCountries();
        }
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
            <p>Languages: <span>{countryLanguages.map((language) => {
                return `${language} `
            })}</span></p>
            {borderCountries.length > 0 ? borderCountries.map((country) => {
                return <Link to={`/country/${country.name.common}`}>
                    {country.name.common}</Link>
            }) : ''}
        </section>
    )
}

export default CountryDetails
