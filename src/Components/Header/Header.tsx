import './Header.css';

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
        <header className={`header ${props.theme + "-element"}`}>
            <h1 className={"header-title"}>Where in the world?</h1>
            <div onClick={() => handleThemeToggle()}>
                <p className={"theme-toggle-text"}>Dark Mode</p>
            </div>
        </header>
    )
}

export default Header;
