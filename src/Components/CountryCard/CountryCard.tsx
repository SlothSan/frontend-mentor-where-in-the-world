import {Link} from "react-router-dom";

interface CountryCardProps {
    flag: string,
    name: string,
    population: number,
    region: string,
    capital: string
}

const CountryCard = (props: CountryCardProps) => {
    return (
        <Link to={"/country/" + props.name}>
            <div>
                <img src={props.flag} alt={`${props.name} flag`}/>
                <p>{props.name}</p>
                <p>{props.population}</p>
                <p>{props.region}</p>
                <p>{props.capital}</p>
            </div>
        </Link>
    )
}

export default CountryCard
