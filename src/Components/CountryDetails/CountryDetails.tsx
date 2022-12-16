import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {faS, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core';
import './CountryDetails.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

library.add(faS, faArrowLeft)


interface CountryDetailsProps {
    theme: string
}

const CountryDetails = (props: CountryDetailsProps): JSX.Element => {
    const {name} = useParams();
    const [countryData, setCountryData] = useState<any>({});
    const [countryName, setCountryName] = useState("");
    const [countryNativeName, setCountryNativeName] = useState("N/A");
    const [countryPopulation, setCountryPopulation] = useState(0);
    const [countryRegion, setCountryRegion] = useState("");
    const [countrySubRegion, setCountrySubRegion] = useState("N/A");
    const [countryCapital, setCountryCapital] = useState("N/A");
    const [countryTLD, setCountryTLD] = useState("N/A");
    const [countryCurrencies, setCountryCurrencies] = useState("N/A");
    const [countryLanguages, setCountryLanguages] = useState(["N/A"]);
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
            setCountryPopulation(countryData.population);
            setCountryRegion(countryData.region);
            try {
                setCountryFlag(countryData.flags[1])
                // @ts-ignore
                setCountryNativeName(Object.values(countryData.name.nativeName)[0].common);
                setCountryCapital(countryData.capital);
                setCountrySubRegion(countryData.subregion)
                let currencyString = Object.values(countryData.currencies)
                    .map((currency: any) => {
                        return currency.name
                    })
                    .join(",")
                setCountryCurrencies(currencyString);
                setCountryLanguages(Object.values(countryData.languages));
                setCountryTLD(countryData.tld[0]);
            } catch (error) {
                console.error(error)
            }
            getBorderCountries();
        }
    }, [countryData])


    return (
        <section className={"country-details-container"}>
            <Link className={`back-button ${props.theme}-element`} to={"/"}><FontAwesomeIcon
                icon={['fas', 'arrow-left']}/>Back</Link>
            <div className={"flag-container"}>
                <img className={"country-flag"} src={countryFlag} alt={`${countryName}'s flag`}/>
            </div>
            <div className={"info-container"}>
                <div className={"info-sub-container"}>
                    <p className={"country-name"}>{countryName}</p>
                    <p className={"info-text"}>Native Name: <span>{countryNativeName}</span></p>
                    <p className={"info-text"}>Population: <span>{countryPopulation.toLocaleString("en-US")}</span></p>
                    <p className={"info-text"}>Region: <span>{countryRegion}</span></p>
                    <p className={"info-text"}>Sub Region: <span>{countrySubRegion}</span></p>
                    <p className={"info-text"}>Capital: <span>{countryCapital}</span></p>
                </div>
                <div className={"info-sub-container"}>
                    <p className={"info-text"}>Top Level Domain: <span>{countryTLD}</span></p>
                    <p className={"info-text"}>Currencies: <span>{countryCurrencies}</span></p>
                    <p className={"info-text"}>Languages: <span>{countryLanguages.join(', ')}</span></p>
                </div>
            </div>

            <div className={"border-container"}>
                <p className={"border-countries-title"}>Border Countries:</p>
                <div className={"border-countries-container"}>
                    {borderCountries.length > 0 ? borderCountries.map((country: any) => {
                        return <Link className={`${props.theme}-element border-link`} key={country.name.common}
                                     to={`/country/${country.name.common}`}>
                            {country.name.common}</Link>
                    }) : <p>No bordering countries!</p>}
                </div>
            </div>
        </section>
    )
}

export default CountryDetails
