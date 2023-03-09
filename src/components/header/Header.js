import React, { useState, useEffect } from "react";
import style from "./Header.module.css";
import logo from "./../../assets/images/logo.svg";
import { lightBlue } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HeaderTable from "./HeaderTable";
import HeaderMobile from "./HeaderMobile";
import { t } from "i18next";
import { useDispatch } from "react-redux";
import { updatePage } from "../../reducers/pageReducer";

export const theme = createTheme({
    palette: {
        primary: lightBlue,
        secondary: {
            light: '#ff7961',
            main: '#63BCE5',
            dark: '#03a9f4',
            contrastText: '#fff',
        },
        custom: {
            light: '#ffa726',
            main: '#EB8476',
            dark: '#e46655',
            contrastText: '#fff',
        },
        black: {
            main: "#000"
        },
        white: {
            main: '#fff'
        }
    },
});

const Header = () => {

    const dispatch = useDispatch();

    const toHomePage = () => {
        localStorage.setItem('page', 'home');
        dispatch(updatePage());
    };

    //------ for reading window size --------
    const [width, setWidth] = useState({
        mobileView: false,
    });

    let page = localStorage.getItem('page');
    const { mobileView } = width;

    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 900
                ? setWidth((prevState) => ({ ...prevState, mobileView: true }))
                : setWidth((prevState) => ({ ...prevState, mobileView: false }));
        };

        setResponsiveness();
        window.addEventListener("resize", () => setResponsiveness());

        return () => {
            window.removeEventListener("resize", () => setResponsiveness());
        }
    }, []);
    //-------END for reading window size-------------------------

    return (
        <div className={style.wrapper}>
            <div className={style.logoApplication} onClick={toHomePage}>
                <img src={logo} alt='logo' />
                <div className={style.title}>
                    <span className={style.nameApplication}>Crypto Contract</span>
                    <span className={style.descriptor}>{t('descriptor')}</span>
                </div>
            </div>
            <ThemeProvider theme={theme}>
                {!mobileView ? <HeaderTable page={page}/> : <HeaderMobile page={page} />}
            </ThemeProvider>
        </div>
    )
};

export default Header;