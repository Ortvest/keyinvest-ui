
import IconLogo from "@shared/assets/icons/IconLogo.svg"
import {Navigation} from "@modules/Header/layout/Navigation";
import classNames from "classnames";
import {GetStartedButton} from "@modules/Header/features/GetStartedButton";

import './styles.css'
export const Header = () => {
    return (
        <header className={classNames("header")}>
            <div>
                <img src={IconLogo} alt="App logo"/>
            </div>
            <div className={classNames("header-actions")}>
                <Navigation/>
                <GetStartedButton/>
            </div>
        </header>
    )
}