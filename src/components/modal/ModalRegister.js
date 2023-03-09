import React, { useState } from "react";
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { theme } from './../header/Header';
import { ThemeProvider } from '@mui/material/styles';
import styles from "./ModalRegister.module.css";
import { AiOutlineMail } from "react-icons/ai";
import { AiFillLock } from "react-icons/ai";
import MyButton from "../common/MyButton";
import Box from '@mui/material/Box';
import { BsFillCursorFill } from "react-icons/bs";
import { BsFillFilePersonFill } from "react-icons/bs";
import { t } from 'i18next';
import useApi from "../../hooks/useApi";
import useAuth from "../../auth/useAuth";
import { login, register } from "../../api/authApi";
import WorkIcon from '@mui/icons-material/Work';
import ModalNotifikation from "./ModalNotifikation";
import { useDispatch } from "react-redux";
import { contractNotify, clearNotify } from "./../../actions/notificationActions";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxwidth: 600,
    bgcolor: '#D9D9D9',
    boxShadow: '10px 29px 32px rgba(0, 0, 0, 0.5)',
    borderRadius: 6,
    margintop: '10%'
};


const ModalRegister = ({ open, handleClose }) => {

    const auth = useAuth();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [address, setAddress] = useState();
    const [password, setPassword] = useState();
    const [company, setCompany] = useState();
    const dispatch= useDispatch();

    const registerApi = useApi(register);
    const loginApi = useApi(login);

         //------------For modal window Notifikation--------------------

    const [openNotifikation, setOpenNotifikation] = React.useState(false);
    const handleCloseNotifikation = () => setOpenNotifikation(false);
    const handleOpenNotifikation = () => {
        setOpenNotifikation(true);
        setTimeout(handleCloseNotifikation, 2000);
    };

    const registerHanling = async () => {
        dispatch(clearNotify());
        const response = await registerApi.request(email, name, address, company, password);
        if (response.ok !== false) {
            handleOpenNotifikation();
            dispatch(contractNotify(t("register_success")));
            loginHandling();
        } else {
            dispatch(contractNotify(response.data?.detail));
            /* dispatch(contractNotify(t("register_failed"))); */
        }
    };

    const loginHandling = async () => {
        dispatch(clearNotify());
        const response = await loginApi.request(email, password);
        if (response.ok !== false) {
            if (response.data.length !== 0) {
                /* alert(t("login_success")); */
                auth.login(response.data.access_token);
                // $("#registerModal").modal("hide");
                window.location.reload(false);
            } else {
                dispatch(contractNotify(t("invalid_name_or_password")));
            }
        } else {
            dispatch(contractNotify(t("login_failed")));
        }
    };

    return (
        <> {openNotifikation && < ModalNotifikation openNotifikation={openNotifikation} handleCloseNotifikation={handleCloseNotifikation} text={"register_success"}/>}
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
                        <div className={styles.registerForm}>
                            <div className={styles.registerText}>{t('register')}</div>
                            <div className={styles.inputWrapper}>
                                <AiOutlineMail style={{ top: '13%', left: '12%', position: "absolute" }} color="#686868" size="1.5em" />
                                <input name="email"
                                    type="email"
                                    placeholder={t('email')}
                                    label="Email"
                                    onChange={(event) => setEmail(event.target.value)}>
                                </input>
                            </div>
                            <div className={styles.inputWrapper}>
                                <BsFillFilePersonFill style={{ top: '12%', left: '12%', position: "absolute" }} color="#686868" size="1.5em" />
                                <input name="name"
                                    type="text"
                                    placeholder={t('name')}
                                    label="Name"
                                    onChange={(event) => setName(event.target.value)}>
                                </input>
                            </div>
                            <div className={styles.inputWrapper}>
                                <BsFillCursorFill style={{ top: '10%', left: '12%', position: "absolute" }} color="#686868" size="1.5em" />
                                <input name="address"
                                    type="text"
                                    placeholder={t('address')}
                                    label="Address"
                                    onChange={(event) => setAddress(event.target.value)}>
                                </input>
                            </div>
                            <div className={styles.inputWrapper}>
                                <WorkIcon style={{ top: '10%', left: '12%', position: "absolute", color: "#686868" }}  size="1.5em" />
                                <input name="company"
                                    type="text"
                                    placeholder={t('company')}
                                    label="Company"
                                    onChange={(event) => setCompany(event.target.value)}>
                                </input>
                            </div>
                            <div className={styles.inputWrapper}>
                                <AiFillLock style={{ top: '10%', left: '12%', position: "absolute" }} color="#686868" size="1.5em" />
                                <input name="password"
                                    type="password"
                                    placeholder={t('password')}
                                    label="Password"
                                    onChange={(event) => setPassword(event.target.value)}>
                                </input>
                            </div>
                                < MyButton color={"secondary"} onClick={() => registerHanling()} variant="contained" sx={{ borderRadius: 18, width: '80%', mt: 2, mb: 2 }}
                                    aria-controls="edit-appbar" >{t('register')}
                                </MyButton>
                            <span >{t('already_have_an_account')}</span>
                            < MyButton color={"secondary"} variant="contained" sx={{ borderRadius: 18, width: '80%', mt: 2, mb: 2 }}
                                aria-controls="edit-appbar" onClick={handleClose}>{t('login')}
                            </MyButton>
                        </div>
                    </ThemeProvider >
                </Box>
            </Fade>
        </Modal>
        </>
    )
}

export default ModalRegister;