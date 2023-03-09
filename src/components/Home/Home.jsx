import React from "react";
import { useSelector, useDispatch } from "react-redux";
import MyButton from "../common/MyButton";
import { updatePage } from "./../../reducers/pageReducer";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "./../header/Header";
import Container from '@mui/material/Container';
import cover from "./../../assets/images/cover.jpg";
import Box from '@mui/material/Box';
import classes from "./HomeStyles.module.css";
import { t } from "i18next";
import { Paper } from "@material-ui/core";
import { Divider, Grid, Typography } from "@mui/material";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LaptopIcon from '@mui/icons-material/Laptop';
import PublicIcon from '@mui/icons-material/Public';
import BoyIcon from '@mui/icons-material/Boy';
import CoffeeMakerIcon from '@mui/icons-material/CoffeeMaker';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import logo from "./../../assets/images/logo.svg";
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

const Home = ({ page }) => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.data);

    const setPage = () => {
        localStorage.setItem('page', 'main');
        dispatch(updatePage());
    };


    let styleVisible = page === "home" ? "block" : "none";

    return (
        <Container maxWidth="xl" style={{ display: styleVisible }}>
            <ThemeProvider theme={theme}>
                <Paper className={classes.coverImage} elevation={6}>
                    <img alt="Image" src={cover} className={classes.image}></img>
                    <div className={classes.imageOpacity}></div>
                    <p className={classes.imageText}>{t("home_title")}</p>
                </Paper>
                <Paper elevation={6} >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {/* FIRST BLOCK */}
                        <Typography sx={{ textAlign: 'center', width: { xs: '85%' }, fontSize: { xs: '20px', sm: '26px', md: '36px' }, fontWeight: '700', paddingTop: '20px' }} >{t("home_first_block_title")}</Typography>
                        <Divider color='#4B9FE1' sx={{ width: '80%', margin: '20px 0' }}></Divider>
                        <Box sx={{ background: '#F2F1F1', width: '100%' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                                <Box sx={{ dipslay: 'flex', background: 'white', justifyContent: 'center', alignItems: 'center', width: '69px', height: '69px', borderRadius: '50px', margin: '20px auto 0 auto' }}>
                                    <Typography sx={{ fontWeight: '400', fontSize: '40px', color: '#4B9FE1', textAlign: 'center', lineHeight: '69px' }}>1</Typography>
                                </Box>
                                <Typography sx={{ textAlign: 'center', width: { xs: '85%', sm: '75%', md: '60%' }, margin: '0 auto', fontSize: '16px', padding: '20px 0' }}><strong>Crypto Contract</strong>{t("home_first_block_1_text")}</Typography>
                                <Box sx={{ dipslay: 'flex', background: 'white', justifyContent: 'center', alignItems: 'center', width: '69px', height: '69px', borderRadius: '50px', margin: '0 auto' }}>
                                    <Typography sx={{ fontWeight: '400', fontSize: '40px', color: '#4B9FE1', textAlign: 'center', lineHeight: '69px' }}>2</Typography>
                                </Box>
                                <Typography sx={{ textAlign: 'center', width: { xs: '85%', sm: '75%', md: '60%' }, margin: '0 auto', fontSize: '16px', padding: '20px 0' }}><strong>Crypto Contract</strong>{t("home_first_block_2_text")}</Typography>
                                <Box sx={{ dipslay: 'flex', background: 'white', justifyContent: 'center', alignItems: 'center', width: '69px', height: '69px', borderRadius: '50px', margin: ' 0 auto' }}>
                                    <Typography sx={{ fontWeight: '400', fontSize: '40px', color: '#4B9FE1', textAlign: 'center', lineHeight: '69px' }}>3</Typography>
                                </Box>
                                <Typography sx={{ textAlign: 'center', width: { xs: '85%', sm: '75%', md: '60%' }, margin: '0 auto', fontSize: '16px', padding: '20px 0' }}><strong>Crypto Contract</strong>{t("home_first_block_3_text")}</Typography>
                            </Box>
                        </Box>
                        {/* SECOND BLOCK */}
                        <Typography sx={{ textAlign: 'center', width: { xs: '85%' }, fontSize: { xs: '20px', sm: '26px', md: '36px' }, fontWeight: '700', paddingTop: '20px' }}>{t("home_second_block_title")}</Typography>
                        <Divider color='#4B9FE1' sx={{ width: '80%', margin: '20px 0' }}></Divider>
                        <Box sx={{ background: '#F2F1F1', width: '100%' }}>
                            <Grid container>
                                <Grid item xs={12} sm={12} md={4} sx={{ display: 'flex', flexDirection: 'column', padding: '20px 10px', }}>
                                    <Box sx={{ dipslay: 'flex', background: 'white', justifyContent: 'center', alignItems: 'center', width: '69px', height: '69px', borderRadius: '50px', margin: '0 auto' }}>
                                        <Typography sx={{ fontWeight: '400', fontSize: '40px', color: '#4B9FE1', textAlign: 'center', lineHeight: '69px' }}><VerifiedUserIcon /></Typography>
                                    </Box>
                                    <Typography sx={{ fontSize: { sx: '18px', sm: '20px' }, fontWeight: '700', textAlign: 'center', padding: '20px 0' }}>{t("home_second_block_left_title")}</Typography>
                                    <Typography sx={{ fontSize: '16px', fontWeight: '400', textAlign: 'center', padding: '20px 0', width: { xs: '85%', sm: '80%', md: '70%' }, margin: '0 auto' }}>{t("home_second_block_left_text")}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={4} sx={{ display: 'flex', flexDirection: 'column', padding: '20px 10px' }}>
                                    <Box sx={{ dipslay: 'flex', background: 'white', justifyContent: 'center', alignItems: 'center', width: '69px', height: '69px', borderRadius: '50px', margin: '0 auto' }}>
                                        <Typography sx={{ fontWeight: '400', fontSize: '40px', color: '#4B9FE1', textAlign: 'center', lineHeight: '69px' }}><LaptopIcon /></Typography>
                                    </Box>
                                    <Typography sx={{ fontSize: { sx: '18px', sm: '20px' }, fontWeight: '700', textAlign: 'center', padding: '20px 0' }}>{t("home_second_block_middle_title")}</Typography>
                                    <Typography sx={{ fontSize: '16px', fontWeight: '400', textAlign: 'center', padding: '20px 0', width: { xs: '85%', sm: '80%', md: '70%' }, margin: '0 auto' }}>{t("home_second_block_middle_text")}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={4} sx={{ display: 'flex', flexDirection: 'column', padding: '20px 10px' }}>
                                    <Box sx={{ dipslay: 'flex', background: 'white', justifyContent: 'center', alignItems: 'center', width: '69px', height: '69px', borderRadius: '50px', margin: '0 auto' }}>
                                        <Typography sx={{ fontWeight: '400', fontSize: '40px', color: '#4B9FE1', textAlign: 'center', lineHeight: '69px' }}>< PublicIcon /></Typography>
                                    </Box>
                                    <Typography sx={{ fontSize: { sx: '18px', sm: '20px' }, fontWeight: '700', textAlign: 'center', padding: '20px 0' }}>{t("home_second_block_right_title")}</Typography>
                                    <Typography sx={{ fontSize: '16px', fontWeight: '400', textAlign: 'center', padding: '20px 0', width: { xs: '85%', sm: '80%', md: '70%' }, margin: '0 auto' }}>{t("home_second_block_right_text")}</Typography>
                                </Grid>

                            </Grid>
                        </Box>
                        {/* THIRD BLOCK */}
                        <Typography sx={{ textAlign: 'center', width: { xs: '85%' }, fontSize: { xs: '20px', sm: '26px', md: '36px' }, fontWeight: '700', paddingTop: '20px' }}>{t("home_third_block_title")}</Typography>
                        <Divider color='#4B9FE1' sx={{ width: '80%', margin: '20px 0' }}></Divider>
                        <Box sx={{ background: '#F2F1F1', width: '100%' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                                <Typography sx={{ textAlign: 'center', width: { xs: '85%', sm: '80%', md: '70%' }, margin: '0 auto', fontSize: '16px', padding: '40px 0 20px 0' }}>{t("home_third_block_1_line_text")}</Typography>
                                <Typography sx={{ textAlign: 'center', width: { xs: '85%', sm: '80%', md: '70%' }, margin: '0 auto', fontSize: '16px', padding: '20px 0' }}>{t("home_third_block_2_line_text")}</Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                                    <Typography sx={{ fontSize: { xs: '120px', sm: '200px', md: '280px' }, display: 'flex' }} ><BoyIcon fontSize='xxx-large' sx={{ color: '#4B9FE1', height: '100%' }} /></Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                                        <Typography color='#4B9FE1' sx={{ textAlign: 'center' }}><CurrencyExchangeIcon sx={{ fontSize: { xs: '20px', sm: '30px', md: '40px' } }} /></Typography>
                                        <Typography><EastIcon sx={{ fontSize: { xs: '20px', sm: '30px', md: '40px' } }} /></Typography>
                                        <Typography><WestIcon sx={{ fontSize: { xs: '20px', sm: '30px', md: '40px' } }} /></Typography>
                                        <Typography color='#4B9FE1' sx={{ textAlign: 'center' }}><FreeBreakfastIcon sx={{ fontSize: { xs: '20px', sm: '30px', md: '40px' } }} /></Typography>
                                    </Box>
                                    <Typography sx={{ fontSize: { xs: '100px', sm: '160px', md: '200px' }, display: 'flex', paddingLeft: { xs: '20px', sm: '40px' } }} ><CoffeeMakerIcon fontSize='x-large' sx={{ color: '#4B9FE1' }} /></Typography>
                                </Box>
                                <Typography sx={{ textAlign: 'center', width: { xs: '85%', sm: '80%', md: '70%' }, margin: '0 auto', fontSize: '16px', padding: '20px 0' }}>{t("home_third_block_3_line_text")}</Typography>
                                <Typography sx={{ textAlign: 'center', width: { xs: '85%', sm: '80%', md: '70%' }, margin: '0 auto', fontSize: '16px', padding: '20px 0' }}>{t("home_third_block_4_line_text")}</Typography>
                            </Box>
                        </Box>
                        {/* FORTH BLOCK */}
                        <Typography sx={{ textAlign: 'center', width: { xs: '85%' }, fontSize: { xs: '20px', sm: '26px', md: '36px' }, fontWeight: '700', paddingTop: '20px' }}>{t("home_fourth_block_title")}</Typography>
                        <Divider color='#4B9FE1' sx={{ width: '80%', margin: '20px 0' }}></Divider>
                        <Box sx={{ background: '#F2F1F1', width: '100%' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                                    <Typography sx={{ fontSize: { xs: '100px', md: '190px' }, display: 'flex', marginTop: '20px' }} ><VerifiedUserIcon fontSize='xxx-large' sx={{ color: '#4B9FE1', height: '100%' }} /></Typography>
                                </Box>
                                <Typography sx={{ textAlign: 'center', width: '80%', margin: '0 auto', fontSize: '16px', padding: '20px 0' }}>{t("home_fourth_block_first_line_text")}</Typography>
                                <Typography sx={{ textAlign: 'center', width: '80%', margin: '0 auto', fontSize: '16px', padding: '20px 0' }}>{t("home_fourth_block_second_line_text")}</Typography>
                                <Typography sx={{ textAlign: 'center', width: '80%', margin: '0 auto', fontSize: '16px', padding: '20px 0' }}>{t("home_fourth_block_third_line_text")}</Typography>
                            </Box>
                        </Box>
                        {/* LAST BLOCK */}
                        <Typography sx={{ textAlign: 'center', width: { xs: '85%' }, fontSize: { xs: '20px', sm: '26px', md: '36px' }, fontWeight: '700', paddingTop: '20px' }}>{t("home_fifth_block_title")}</Typography>
                        <Divider color='#4B9FE1' sx={{ width: '80%', margin: '20px 0' }}></Divider>
                        <Box sx={{ background: '#F2F1F1', width: '100%', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
                                    <Typography sx={{ fontSize: '50px', display: 'flex' }} ><img src={logo} alt='logo' className={classes.imageLogoLastBlock} /></Typography>
                                    <Typography sx={{ fontSize: { xs: '70px', sm: '80px', md: '90px' }, display: 'flex', margin: '20px 40px 20px 0' }} ><WorkspacePremiumIcon fontSize='xxx-large' sx={{ color: '#4B9FE1', height: '100%' }} /></Typography>
                                </Box>
                                <Typography sx={{ textAlign: 'center', width: '80%', margin: '0 auto', fontSize: '16px', padding: '20px 0' }}>{t("home_fifth_block_first_line_text")}</Typography>
                                <Typography sx={{ textAlign: 'center', width: '80%', margin: '0 auto', fontSize: '16px', padding: '20px 0' }}><strong>Crypto Contract</strong>{t("home_fifth_block_second_line_text")}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '30px 0 30px 30px', width: '80%' }}>
                                <MyButton onClick={setPage} color={"secondary"} variant="contained" size='large' sx={{ mr: 2, borderRadius: '16px', width: 'auto' }} >{t('login')}<EastIcon fontSize='medium' sx={{ marginLeft: '20px' }} /></MyButton>
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            </ThemeProvider>
        </Container>
    )
};

export default Home;