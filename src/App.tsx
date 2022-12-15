import './App.css'
import Header from "./Components/Header/Header";
import {useState} from "react";

const App = (): JSX.Element => {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div className="App">
            <Header darkMode={darkMode} setDarkMode={setDarkMode}/>
        </div>
    )
}

export default App
