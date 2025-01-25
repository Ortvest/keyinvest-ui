
import IconLogo from "@shared/assets/icons/IconLogo.svg"
import {AppNavigation} from "@modules/Header/layout/Navigation";
import classNames from "classnames";
import {GetStartedButton} from "@modules/Header/features/GetStartedButton";

import './styles/styles.css'
export const Header = () => {
    return (
        <header className={classNames("header-wrapper")}>
            <div>
                <img src={IconLogo} alt="App logo"/>
            </div>
            <div className={classNames("header-actions-wrapper")}>
                <AppNavigation/>
                <GetStartedButton/>
            </div>
        </header>
    )
}