import React from "react";
import styles from "./TableRow.module.css";
import { t } from "i18next";
import { theme } from "./../../../components/header/Header";
import { ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const TableRow = ({ _item }) => {

    //--------replace date to display for american standart--------
    const getDateFromContract = () => {
        if (!_item) {
            return;
        } else if (_item.updated) {
            let date = _item?.updated.split(' ')[0];
            let time = _item?.updated.split(' ')[1];
            const [day, month, year] = date?.split('/');
            return `${year}/${month}/${day} ${time}`
        } else if (_item.date) {
            let date = _item?.date.split(' ')[0];
            let time = _item?.date.split(' ')[1];
            const [day, month, year] = date?.split('/');
            return `${year}/${month}/${day} ${time}`
        }
    }
    //-----END-----replace date to display for american standart--------

    /* --------------to translate contract`s status-------------------- */
    function StatusSynchronization(text) {
        switch (text) {
            case 'approved':
                return t("approved");
            case 'waiting for approval':
                return t("waiting_for_approval");
            case 'under contruction':
                return t("under_construction");
            case 'rejected':
                return t("rejected");
            default:
                return null;
        }
    };
    /* ----END----------to translate contract`s status-------------------- */

    const colorStatus = _item.contract_status === "approved" ? "#51d778" : "#EB8476"

    return (
        <div className={styles.row}>
            <ThemeProvider theme={theme}>
                {_item ?
                    <>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexWrap: 'nowrap',
                                '& > :not(style)': {
                                    m: 0.2,
                                    width: '90%',
                                    height: 60,
                                    borderRadius: '16px'
                                },
                            }}
                        >
                            <Paper elevation={2}>
                                <div className={styles.rowInfo}>
                                    <span style={{ width: '25%', display: 'flex', color: colorStatus }}>
                                        <>{StatusSynchronization(_item.contract_status)}</>
                                    </span>
                                    <span className={styles.subjectSpan}>{_item.contract_info}</span>
                                    <span className={styles.dateInfo}> {getDateFromContract()}</span>
                                </div>
                            </Paper>
                        </Box>
                    </> : null}
            </ThemeProvider>
        </div>
    )
}

export default TableRow;