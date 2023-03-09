import React, { useState } from "react";
import styles from "./Login.module.css";
import MyButton from "../common/MyButton";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "./../header/Header";
import { AiOutlineMail } from "react-icons/ai";
import { AiFillLock } from "react-icons/ai";
import ModalRegister from "./../modal/ModalRegister";
import useApi from "../../hooks/useApi";
import useAuth from "../../auth/useAuth";
import { useTranslation } from "react-i18next";
import { login } from "../../api/authApi";
import { useDispatch } from "react-redux";
import { actions } from "../../reducers/notifikationReducer";

const Login = () => {
    //----for ModalRegister------------
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    //-----------for Login----------------------

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
                dispatch(actions.setNotification(t("login_success")));
                auth.login(response.data.access_token);
                window.location.reload(false); 
            } else {
                dispatch(actions.setNotification(t("invalid_name_or_password")));
            }
        } else {
            dispatch(actions.setNotification(t("login_failed")));
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <div className={styles.wrapper}>
                <div className={styles.loginForm}>
                    <div className={styles.loginText}>{t("login")}</div>
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
                    <span >{t('dont_have_an_account')}</span>
                    < MyButton color={"secondary"} variant="contained" sx={{ borderRadius: 18, width: '80%', mt: 2, mb: 2 }}
                        aria-controls="edit-appbar" onClick={handleOpen}>{t("register")}
                    </MyButton>
                    <ModalRegister open={open} handleClose={handleClose} />
                </div>
            </div>
        </ThemeProvider >
    )
}

export default Login;