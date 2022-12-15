import './Header.css';

interface HeaderProps {
    setDarkMode: Function,
    darkMode: boolean
}

const Header = (props: HeaderProps): JSX.Element => {


    return (
        <header>
            <h1>Where in the world?</h1>
            <div>
                <p>Dark Mode</p>
            </div>
        </header>
    )
}

export default Header;
