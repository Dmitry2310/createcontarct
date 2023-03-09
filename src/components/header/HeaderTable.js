import React from "react";
import MenuItem from '@mui/material/MenuItem';
import { useDispatch } from "react-redux";
import { updatePage } from "./../../reducers/pageReducer";
import Menu from '@mui/material/Menu';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MyButton from "../common/MyButton";
import ModalLogin from "../modal/ModalLogin";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import useAuth from "../../auth/useAuth";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "./Header";

/* import { useNavigate } from 'react-router-dom'; */


const HeaderTable = ({ page }) => {

    const dispatch = useDispatch();

    //--------- for drop-Menu(Language)--------------
    const [anchorElLang, setAnchorElLang] = React.useState(null);

    const handleMenuLang = (event) => {
        setAnchorElLang(event.currentTarget);
    };

    const handleCloseLang = () => {
        setAnchorElLang(null);
    };
    //--------------for drop-Menu(Login)-----------
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseLogin = () => {
        setAnchorEl(null);
    };
    //------------For modal window--------------------

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
        setAnchorEl(null);
    };

    const handleClose = () => setOpen(false);

    //--------------Logout-------------------
    const user = useSelector((state) => state.user?.data);
    const auth = useAuth();


    const logout = () => {
        handleCloseLogin();
        auth.logout();
        window.location.reload(false);
    };
    //---------Change Language---------------------

    const { t, i18n } = useTranslation()

    const handleChangeLanguage = (nextLanguage) => () => {
        handleCloseLang();
        i18n.changeLanguage(nextLanguage);
    }

    const setPage = () => {
        localStorage.setItem('page', 'main');
        dispatch(updatePage());
    };

    return (
        <ThemeProvider theme={theme}>
            <div>
                {(user && page !== 'home') &&
                    <>
                        < MyButton color={"secondary"} variant="contained" sx={{ mr: 2, borderRadius: '16px' }}
                            aria-controls="login-appbar" startIcon={<PeopleAltIcon color="black" />} onClick={handleMenu}>
                            {user?.user_name}
                        </MyButton>
                        <Menu
                            id="login-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleCloseLogin}
                            sx={{ mt: 0.5 }}
                        >
                            <MenuItem onClick={() => logout()} sx={{ minWidth: 120 }} >{t("logout")}</MenuItem>
                            <MenuItem sx={{ minWidth: 120 }} onClick={handleOpen}>{t("use_another_account")}</MenuItem>
                        </Menu>
                    </>
                }
                {page === 'home' &&
                    <MyButton onClick={setPage} color={"secondary"} variant="contained" size='large' sx={{ mr: 2, borderRadius: '16px', width: 'auto', minWidth: '115px' }} >{t('login')}</MyButton>
                }
                < ModalLogin open={open} handleClose={handleClose} />
                < MyButton color={"secondary"} variant="contained" sx={{ mr: 3, borderRadius: '16px', minWidth: '115px' }}
                    aria-controls="language-appbar" onClick={handleMenuLang} >
                    {t("setting")}
                </MyButton>
                <Menu
                    id="language-appbar"
                    anchorEl={anchorElLang}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElLang)}
                    onClose={handleCloseLang}
                    sx={{ mt: 0.5 }}
                >
                    <MenuItem onClick={handleChangeLanguage("en")} sx={{ minWidth: 120 }}>English</MenuItem>
                    <MenuItem onClick={handleChangeLanguage("ja")} sx={{ minWidth: 120 }}>日本語</MenuItem>
                    <MenuItem onClick={handleChangeLanguage("ru")} sx={{ minWidth: 120 }}>Russian</MenuItem>
                </Menu>
            </div>
        </ThemeProvider >
    )
};

export default HeaderTable;
