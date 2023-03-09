import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { theme } from '../header/Header';
import { ThemeProvider } from '@mui/material/styles';
import styles from "./ModalKey.module.css";
import MyButton from "../common/MyButton";
import Box from '@mui/material/Box';
import { useTranslation } from "react-i18next";
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

const ModalKey = ({ open, handleCloseKey, _key }) => {
    const { t } = useTranslation();

   const CopyToClipBoard = function (_key) {        
        if (navigator.clipboard != undefined) {//Chrome
            navigator.clipboard.writeText(_key).then(function () {
                console.log('Async: Copying to clipboard was successful!');
                handleCloseKey();
            }, function (err) {
                console.error('Async: Could not copy text: ', err);
            });
        }
        else if(window.clipboardData) { // Internet Explorer
            window.clipboardData.setData("Text", _key);
        }
    };

    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleCloseKey}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style} className={styles.box}>
                        <ThemeProvider theme={theme}>
                            < CloseButton handleClose={handleCloseKey} />
                            <div className={styles.keyForm}>
                                <div className={styles.keyText}>{t("contract_key")}</div>
                                <div className={styles.inputWrapper}>
                                    {_key != "" && (
                                        <>
                                            <p style={{ display: 'inline-block', verticalAlign: 'middle', borderBottom: '1px solid #63BCE5' }}>{_key}</p>
                                            {/* < MyButton color={"secondary"} variant="contained" sx={{ borderRadius: 18, width: '30%', mt: 2, mb: 2 }}
                                                aria-controls="edit-appbar" onClick={ () => CopyToClipBoard(_key)
                                                }>{t("copy")}
                                            </MyButton> */}
                                        </>
                                    )}
                                    {_key === "" && <p style={{ marginBottom: '24px' }}>{t("contract_not_uploaded")}</p>}
                                </div>
                            </div>
                        </ThemeProvider >
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}

export default ModalKey;