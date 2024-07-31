import React from "react";
import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="App-header">
            <div className="text">
                <h1>Список задач</h1>
            </div>
            <div className='select-block'>
                <Link to="/">
                    <input type="button" value="Активные"></input>
                </Link>

                <Link to="/completed">
                    <input type="button" value="Выполненые"></input>
                </Link>

            </div>
        </header>

    )
}

export default Header;
