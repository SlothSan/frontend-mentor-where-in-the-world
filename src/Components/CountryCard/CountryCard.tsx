import {Link} from "react-router-dom";
import './CountryCard.css'

interface CountryCardProps {
    flag: string,
    name: string,
    population: number,
    region: string,
    capital: string
    theme: string
}

const CountryCard = (props: CountryCardProps) => {
    return (
        <Link to={"/country/" + props.name} className={`country-card ${props.theme}-element`}>
            <div>
                <img className={"country-card-flag"} src={props.flag} alt={`${props.name} flag`}/>
                <div className={"country-card-sub-container"}>
                    <p className={"country-card-name"}>{props.name}</p>
                    <p>Population: <span>{props.population}</span></p>
                    <p>Region: <span>{props.region}</span></p>
                    <p>Capital: <span>{props.capital}</span></p>
                </div>
            </div>
        </Link>
    )
}

export default CountryCard
