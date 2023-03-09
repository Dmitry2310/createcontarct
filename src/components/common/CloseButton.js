import React from "react";
import  styles  from "./CloseButton.module.css";

const CloseButton = ({handleClose, setUploadedFile, setContractInfo, setClientEmail}) => {

    const close = () => {
        handleClose();
        setUploadedFile('');
        setContractInfo('');
        setClientEmail('');
    }
 
    return (
        <div className={styles.closeButton} onClick={() => close()}>
            <div>
                <div className={styles.leftright}></div>
                <div className={styles.rightleft}></div>
                <span className={styles.closeBtn}></span>
            </div>
        </div>
    )
}

export default CloseButton;