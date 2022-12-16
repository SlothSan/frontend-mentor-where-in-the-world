import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import './CountryDetails.css';


interface CountryDetailsProps {
    theme: string
}

const CountryDetails = (props: CountryDetailsProps): JSX.Element => {
    const {name} = useParams();
    const [countryData, setCountryData] = useState({});
    const [countryName, setCountryName] = useState("");
    const [countryNativeName, setCountryNativeName] = useState("");
    const [countryPopulation, setCountryPopulation] = useState(0);
    const [countryRegion, setCountryRegion] = useState("");
    const [countryCapital, setCountryCapital] = useState("");
    const [countryTLD, setCountryTLD] = useState("");
    const [countryLanguages, setCountryLanguages] = useState([]);
    const [countryFlag, setCountryFlag] = useState("");
    const [borderQueryString, setBorderQueryString] = useState("");
    const [borderCountries, setBorderCountries] = useState([]);

    const getCountryData = async () => {
        const countryData = await fetch(`https://restcountries.com/v3/name/${name}?fullText=true`)
        const countryDataJson = await countryData.json();
        setCountryData(countryDataJson[0]);
        if (countryDataJson[0].borders !== undefined) {
            setBorderQueryString(countryDataJson[0].borders.join(','));
        }
    }

    const getBorderCountries = async () => {
        if (borderQueryString !== '') {
            const borderData = await fetch(`https://restcountries.com/v3/alpha?codes=${borderQueryString}`);
            const borderDataJson = await borderData.json();
            setBorderCountries(borderDataJson);
        }
    }

    useEffect(() => {
        getCountryData();
    }, [name])

    useEffect(() => {
        if (Object.keys(countryData).length > 0) {
            setCountryName(countryData.name.common)
            setCountryNativeName(Object.values(countryData.name.nativeName)[0].common);
            setCountryPopulation(countryData.population);
            setCountryRegion(countryData.region);
            setCountryCapital(countryData.capital);
            setCountryTLD(countryData.tld[0]);
            setCountryLanguages(Object.values(countryData.languages))
            setCountryFlag(countryData.flags[0])
            getBorderCountries();
        }
    }, [countryData])


    return (
        <section className={"country-details-container"}>
            <Link className={`back-button ${props.theme}-element`} to={"/"}>Back</Link>
            <div className={"flag-container"}>
                <img className={"country-flag"} src={countryFlag} alt={`${countryName}'s flag`}/>
            </div>
            <div className={"info-container"}>
                <p className={"country-name"}>{countryName}</p>
                <p>Native Name: <span>{countryNativeName}</span></p>
                <p>Population: <span>{countryPopulation.toLocaleString("en-US")}</span></p>
                <p>Region: <span>{countryRegion}</span></p>
                <p>Capital: <span>{countryCapital}</span></p>
                <p>Top Level Domain: <span>{countryTLD}</span></p>
                <p>Languages: <span>{countryLanguages.join(', ')}</span></p>
            </div>
            {borderCountries.length > 0 ? borderCountries.map((country) => {
                return <Link to={`/country/${country.name.common}`}>
                    {country.name.common}</Link>
            }) : ''}
        </section>
    )
}

export default CountryDetails
