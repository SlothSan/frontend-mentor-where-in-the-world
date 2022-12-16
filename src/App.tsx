import './App.css'
import Header from "./Components/Header/Header";
import {Routes, Route} from 'react-router-dom'
import {ReactNode, useEffect, useState} from "react";
import AllCountriesView from './Components/AllCountriesView/AllCountriesView';
import CountryDetails from "./Components/CountryDetails/CountryDetails";


const App = (): JSX.Element => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect((): void => {
        localStorage.setItem('theme', theme)
        document.body.className = theme
    }, [theme])

    return (
        <main className={`App ${theme}`}>
            <Header theme={theme} setTheme={setTheme}/>
            <Routes>
                <Route path={"/"} element={<AllCountriesView theme={theme}/>}/>
                <Route path={"/country/:name"} element={<CountryDetails theme={theme}/>}/>
            </Routes>
        </main>
    )
}

export default App
