import CountryCard from "../CountryCard/CountryCard";

interface AllCountriesViewProps {
    allCountryData: Array<any>
}

const AllCountriesView = (props: AllCountriesViewProps): JSX.Element => {


    return (
        <div>
            {props.allCountryData.map((country) => {
                return (
                    <CountryCard flag={country[1].flags[0]}
                                 name={country[1].name.common}
                                 population={country[1].population}
                                 region={country[1].region}
                                 capital={country[1].capital}/>
                )
            })}
        </div>
    )
}

export default AllCountriesView
