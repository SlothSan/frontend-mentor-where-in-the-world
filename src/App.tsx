import './App.css'
import Header from "./Components/Header/Header";
import {useEffect, useState} from "react";

const App = (): JSX.Element => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect((): void => {
        localStorage.setItem('theme', theme)
        document.body.className = theme
    }, [theme])

    return (
        <main className={`App ${theme}`}>
            <Header theme={theme} setTheme={setTheme}/>
        </main>
    )
}

export default App
