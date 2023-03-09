import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { theme } from '../header/Header';
import { ThemeProvider } from '@mui/material/styles';
import styles from "./ModalLogin.module.css";
import { AiOutlineMail } from "react-icons/ai";
import { AiFillLock } from "react-icons/ai";
import MyButton from "../common/MyButton";
import Box from '@mui/material/Box';
import { useTranslation } from "react-i18next";
import { login } from "../../api/authApi";
/* import { useNavigate } from 'react-router-dom'; */
import useApi from "../../hooks/useApi";
import useAuth from "../../auth/useAuth";
import { useDispatch } from "react-redux";
import { contractNotify } from "./../../actions/notificationActions";
import CloseButton from '../common/CloseButton';

const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    /*  maxwidth: 600, */
    bgcolor: '#D9D9D9',
    boxShadow: '10px 29px 32px rgba(0, 0, 0, 0.5)',
    borderRadius: 6
};

const ModalLogin = ({ open, handleClose }) => {

    const { t } = useTranslation();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const loginApi = useApi(login);
    const auth = useAuth();
    const dispatch = useDispatch();

    const loginHandling = async () => {
        const response = await loginApi.request(email, password);
        if (response.ok) {
            if (response.data.length !== 0) {
                dispatch(contractNotify(t("login_success")));
                auth.login(response.data.access_token);
                handleClose();
                window.location.reload(false);
            } else {
                dispatch(contractNotify(t("invalid_name_or_password")));
            }
        } else {
            dispatch(contractNotify(t("login_failed")));
        }
    };

    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style} className={styles.box}>
                        <ThemeProvider theme={theme}>
                            < CloseButton handleClose={handleClose}/>
                            <div className={styles.loginForm}>
                                <div className={styles.loginText}>{t('login')}</div>
                                <div className={styles.inputWrapper}>
                                    <AiOutlineMail style={{ top: '13%', left: '12%', position: "absolute" }} color="#686868" size="1.5em" />
                                    <input name="email"
                                        type="email"
                                        placeholder={t("email")}
                                        label="Email"
                                        onChange={(event) => setEmail(event.target.value)}>
                                    </input>
                                </div>
                                <div className={styles.inputWrapper}>
                                    <AiFillLock style={{ top: '10%', left: '12%', position: "absolute" }} color="#686868" size="1.5em" />
                                    <input name="password"
                                        type="password"
                                        placeholder={t("password")}
                                        label="Password"
                                        onChange={(event) => setPassword(event.target.value)}>
                                    </input>
                                </div>
                                < MyButton color={"secondary"} variant="contained" sx={{ borderRadius: 18, width: '80%', mt: 2, mb: 2 }}
                                    aria-controls="edit-appbar" onClick={() => loginHandling()}>{t("login")}
                                </MyButton>
                            </div>
                        </ThemeProvider >
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}

export default ModalLogin;