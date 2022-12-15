import './App.css'
import Header from "./Components/Header/Header";
import {Routes, Route} from 'react-router-dom'
import {ReactNode, useEffect, useState} from "react";
import AllCountriesView from './Components/AllCountriesView/AllCountriesView';
import CountryDetails from "./Components/CountryDetails/CountryDetails";


const App = (): JSX.Element => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [allCountryData, setAllCountryData] = useState([]);

    const getAllCountryData = async (): Promise<any> => {
        const countriesData = await fetch('https://restcountries.com/v3/all')
        const countriesDataJson = await countriesData.json();
        //TODO Refactor this it doesn't feel right
        setAllCountryData(Object.entries(countriesDataJson));
    }

    useEffect((): void => {
        localStorage.setItem('theme', theme)
        document.body.className = theme
    }, [theme])

    useEffect(() => {
        getAllCountryData();
    }, [])

    useEffect(() => {
        console.log(allCountryData)
    }, [allCountryData])

    return (
        <main className={`App ${theme}`}>
            <Header theme={theme} setTheme={setTheme}/>
            <Routes>
                <Route path={"/"} element={<AllCountriesView allCountryData={allCountryData}/>}/>
                <Route path={"/country/:name"} element={<CountryDetails/>}/>
            </Routes>
        </main>
    )
}

export default App
