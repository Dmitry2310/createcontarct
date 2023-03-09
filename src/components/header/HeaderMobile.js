import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Drawer from "@mui/material/Drawer";
import { useTranslation } from "react-i18next";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MyButton from "../common/MyButton";
import { useSelector } from "react-redux";
import useAuth from "../../auth/useAuth";
import ModalLogin from "../modal/ModalLogin";
import { useDispatch } from "react-redux";
import { updatePage } from "./../../reducers/pageReducer";
import EastIcon from '@mui/icons-material/East';

const HeaderMobile = ({ page }) => {

    const dispatch = useDispatch();

    const styles = {
        background: '#000',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '10px'
    }

    const [openDrawer, setState] = useState(false);
    /*
    function that is being called every time the drawer should open or close,
    the keys tab and shift are excluded so the user can focus between
    the elements with the keys
    */
    const toggleDrawer = (openDrawer) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState(openDrawer);
    };

    const setPage = () => {
        localStorage.setItem('page', 'main');
        toggleDrawer(false);
        dispatch(updatePage());
    };

    //---------Change Language---------------------

    const { t, i18n } = useTranslation()

    const handleChangeLanguage = (nextLanguage) => () => {
        handleCloseLang();
        i18n.changeLanguage(nextLanguage);
    }
    //--------- for drop-Menu(Language)--------------
    const [anchorElLang, setAnchorElLang] = React.useState(null);

    const handleMenuLang = (event) => {
        setAnchorElLang(event.currentTarget);
    };

    const handleCloseLang = () => {
        setAnchorElLang(null);
    };
    //------logout-----------------
    const user = useSelector((state) => state.user.data);
    const auth = useAuth();

    const logout = () => {
        handleCloseLogin();
        auth.logout();
        window.location.reload(false);
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

    return (
        <Toolbar>
            {/*  {/* hamburger icon shows the drawer on click */}
            <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer(true)}
                onClose={toggleDrawer(false)}
                sx={{ mr: 0, display: { xs: 'block', md: 'none', }, }}>
                <MenuIcon />
            </IconButton>
            {/* The outside of the drawer */}
            <Drawer
                anchor="right"
                variant="temporary"
                open={openDrawer}
                onClose={toggleDrawer(false)}
                /* onOpen={toggleDrawer(true)} */
            >
                <Box style={styles}>
                    {(user && page !== 'home') &&
                        <>
                            < MyButton color={"secondary"} variant="contained" sx={{ margin: '10px auto', borderRadius: '16px' }}
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
                        <MyButton onClick={setPage} color={"secondary"} variant="contained" size='large' sx={{ margin: '10px auto', borderRadius: '16px', width: 'auto', minWidth: '115px' }} >{t('login')}</MyButton>
                    }
                    <Box>
                        < ModalLogin open={open} handleClose={handleClose} />
                        < MyButton color={"secondary"} variant="contained" sx={{ margin: '0 auto', borderRadius: '16px', minWidth: '115px' }}
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
                    </Box>
                </Box>
            </Drawer>
        </Toolbar>
    )
};

export default HeaderMobile;
