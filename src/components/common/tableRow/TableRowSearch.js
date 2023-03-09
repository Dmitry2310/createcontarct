import React from "react";
import styles from "./TableRow.module.css";
import { t } from "i18next";
import { theme } from "../../header/Header";
import { ThemeProvider } from '@mui/material/styles';


const TableRowSearch = ({ _item }) => {

    //----------replace date to display for american standart
    var itemDate = _item?.date.toString();
    var date = itemDate?.split(' ')[0];
    var time = itemDate?.split(' ')[1];
    const [day, month, year] = date?.split('/');
    //----END----- replace date to display for american standart

    return (
        <div className={styles.row}>
            <ThemeProvider theme={theme}>
                {_item ?
                    <>
                        <div className={styles.rowInfo}>
                            <span style={{ width: '30%', display: 'flex', color: '#51d778' }}>
                                <>{t("registered")}</>
                            </span>
                            <span className={styles.subjectSpan}>{_item.contract_info}</span>
                            <span style={{ width: '20%', textAlign: 'center' }}> {`${year}/${month}/${day} ${time}`}</span>
                        </div>
                    </> : null}
            </ThemeProvider>
        </div>
    )
}

export default TableRowSearch;