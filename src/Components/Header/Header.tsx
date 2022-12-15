import './Header.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faS, faMoon} from '@fortawesome/free-solid-svg-icons';
import {library} from "@fortawesome/fontawesome-svg-core";

library.add(faS, faMoon)

interface HeaderProps {
    theme: String,
    setTheme: Function
}

const Header = (props: HeaderProps): JSX.Element => {

    const handleThemeToggle = (): void => {
        if (props.theme === "light") {
            props.setTheme("dark");
        } else {
            props.setTheme("light");
        }
    }

    return (
        <header className={`header ${props.theme}-element`}>
            <h1 className={"header-title"}>Where in the world?</h1>
            <div className={"header-sub-container"} onClick={() => handleThemeToggle()}>
                <FontAwesomeIcon icon={['fas', 'moon']}/>
                {props.theme === "light" ?
                    <p className={"theme-toggle-text"}>Dark Mode</p> :
                    <p className={"theme-toggle-text"}>Light Mode</p>}
            </div>
        </header>
    )
}

export default Header;
