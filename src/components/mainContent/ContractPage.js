import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import PDFIcon from "./../../assets/images/PDFIcon.png";
import photoIcon from "./../../assets/images/photoIcon.png";
import excelIcon from "./../../assets/images/excelIcon.png";
import outlookIcon from "./../../assets/images/outlookIcon.jpeg";
import wordIcon from "./../../assets/images/wordIcon.png";
import documentIcon from "./../../assets/images/documentIcon.png";
import { downloadPdf } from "../../helpers/downloader";
import { deleteContract, downloadFile, updateContract, sendContractEmail } from "../../api/contractApi";
import useApi from "../../hooks/useApi";
import { useDispatch } from "react-redux";
import styles from "./ContractPageStyle.module.css";
import { theme } from "./../header/Header";
import MyButton from "../common/MyButton";
import { removeContract } from "../../actions/contractActions";
import { actions } from "../../reducers/notifikationReducer";
import { ThemeProvider } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';


const ContractPage = ({ item, user, setOpenContractId, setUpdate }) => {

    const { t } = useTranslation();
    const downloadFileApi = useApi(downloadFile);
    const deleteContractApi = useApi(deleteContract);
    const dispatch = useDispatch();
    const [sender, setSender] = useState(false);
    const [searchedContract, setSearchedContract] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [filesType, setFilesType] = useState('');
    const colorStatus = item.contract_status === "approved" ? "#51d778" : "#EB8476";
    const PDFFileTypes = ['pdf', 'pdf/a', 'pdf/e', 'pdf/x', 'pdf/vt', 'pdf/ua', 'pades'];
    const imageTypes = ['jpeg', 'png', 'jpg'];
    const excelTypes = ['xlsx', 'xlsm', 'xls', 'xltl', 'xltm'];
    const outlookTypes = ['eml', 'vcf', 'nws', 'mbx', 'dbx'];
    const wordTypes = ['doc', 'dot', 'wbk', 'docm', 'dotx', 'dotm', 'docx'];

    //changing the displayed icon depending on the file type
    const defineType = () => {
        if (imageTypes.includes(filesType)) {
            return photoIcon;
        }
        if (PDFFileTypes.includes(filesType)) {
            return PDFIcon;
        }
        if (excelTypes.includes(filesType)) {
            return excelIcon;
        }
        if (outlookTypes.includes(filesType)) {
            return outlookIcon;
        }
        if (wordTypes.includes(filesType)) {
            return wordIcon;
        }
        else {
            return documentIcon
        }
    };

    //END changing the displayed icon depending on the file type

    // check item file type
    function getExtension(fileType) {
        return fileType.split('.').pop()
    };

    useEffect(() => {
        let file = item?.contract_file;
        const fileType = getExtension(file).toLowerCase();
        setFilesType(fileType);
    }, [item]);
    //END check item file type

    /*translate contract`s status-------------------- */
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
    /* ENDtranslate contract`s status-------------------- */

    /*Change status of contract */
    const updateContractApi = useApi(updateContract);
    const sendContractEmailApi = useApi(sendContractEmail);

    const sendContractEmailHandling = async (clientId) => {
        const response = await sendContractEmailApi.request(1, clientId);
        if (response.ok) {
            dispatch(actions.setNotification(t("send_email_success")));
        } else {
            dispatch(actions.setNotification(t("send_email_failed")));
        }
    };

    const updateContractHandling = async (contractId, status) => {
        setIsFetching(true);
        const response = await updateContractApi.request(contractId, status);
        if (response.ok) {
            sendContractEmailHandling(item.contractA_id);
            setOpenContractId('');
            setUpdate(true);
            dispatch(actions.setNotification(t("update_contract_success")));
        } else {
            setIsFetching(false);
            dispatch(actions.setNotification(t("update_contract_failed")));
        }
    };

    useEffect(() => {
        dispatch(actions.setNotification(""));
    })
    /*END Change status of contract */

    const downloadFileHandling = async (contractFile) => {
        const response = await downloadFileApi.request(contractFile);
        if (response.ok) {
            downloadPdf(item.contract_file.split("$")[2], response.data);
        } else {
            dispatch(actions.setNotification(t("WHERE IS THE FILE???")));
        }
    };

    //-----Delete contract--------
    const deleteContractHandling = async (contractId) => {
        setIsFetching(true);
        const response = await deleteContractApi.request(contractId);
        if (response.ok) {
            dispatch(removeContract(contractId));
            setOpenContractId('');
            setUpdate(true);
            dispatch(actions.setNotification(t("contract_deleted")));
        } else {
            setIsFetching(false);
            dispatch(actions.setNotification(t("delete_contract_failed")));
        }
    };
    //--END---Delete contract--------

    useEffect(() => {
        setIsFetching(false);
        if (user.user_id === item.contractA_id) {
            setSender(true);
        } else if (user.user_email === item.contractor_a_email) {
            setSender(true);
        };
    }, [])

    const getDateFromContract = () => {
        if (!item) {
            return;
        } else if (item.updated) {
            let date = item?.updated.split(' ')[0];
            let time = item?.updated.split(' ')[1];
            const [day, month, year] = date?.split('/');
            return `${year}/${month}/${day} ${time}`
        } else if (item.date) {
            let date = item?.date.split(' ')[0];
            let time = item?.date.split(' ')[1];
            const [day, month, year] = date?.split('/');
            return `${year}/${month}/${day} ${time}`
        }
    };

    useEffect(() => {
        if (!item.id) {
            setSearchedContract(true);
        }
    }, []);

    return (
        <>
            {/*Wrapper*/}
            <ThemeProvider theme={theme}>
                <div className={styles.wrapper}>
                    {/*HEADER*/}
                    <>
                        <div className={styles.headerItem}>
                            <span className={styles.headerDescripItem}>{t("contract_information")}: </span>
                            <span className={styles.headerItemValue}> {item.contract_info} </span>
                        </div>
                        {item?.contractorA &&
                            <div className={styles.headerItem}>
                                <span className={styles.headerDescripItem}>{t("from")}: </span>
                                <span className={styles.headerItemValue}> {item.contractorA.name}{item.ontractorA?.company}</span>
                                <span className={styles.headerItemValue} style={{ paddingLeft: '10px' }}>{item?.contractorA?.company}</span>
                            </div>
                        }
                        {item?.contractorB &&
                            <div className={styles.headerItem}>
                                <span className={styles.headerDescripItem}>{t("to")}: </span>
                                <span className={styles.headerItemValue}> {item.contractorB.name} </span>
                            </div>
                        }
                        {item.contract_hash
                            ?
                            <div className={styles.headerItem}>
                                <>
                                    <span className={styles.headerDescripItem}> {t("contract_key")}: </span>
                                    <span className={styles.headerItemValue}> {item.contract_hash} </span>
                                </>
                                {item.contract_hash
                                    &&
                                    <span className={styles.registered}>{t("registered")}</span>
                                }
                            </div>
                            :
                            null
                        }
                        <div className={styles.headerItem}>
                            <span className={styles.headerDescripItem}> {t("update")}: </span>
                            <span className={styles.headerItemValue}> {getDateFromContract()} </span>
                        </div>

                        <div className={styles.headerBorder}></div>

                    </>
                    {/*BODY*/}
                    <div style={{ paddingTop: '10px', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                        <Card sx={{ maxWidth: 300, backgroundColor: '', minHeight: '300px' }}>
                            <CardHeader
                                title={<span style={{ fontWeight: '400', fontSize: '18px', lineHeight: '21px', color: colorStatus, padding: '5px' }}>{StatusSynchronization(item.contract_status)}</span>}
                            />
                            <CardMedia
                                component="img"
                                height="140"
                                image={defineType()}
                                alt="Document"
                                sx={{ width: '47%', margin: '0 auto', objectFit: 'cover' }}
                            />
                            <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                                    {t("downloadDescription")}
                                </Typography>
                                <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button size="small" sx={{ border: '1px solid #63BCE5' }} onClick={() => downloadFileHandling(item.contract_file)}> {t('download')} </Button>
                                </CardActions>
                            </CardContent>
                        </Card>
                        <div className={styles.buttonsWrapper}>
                            {sender ?
                                <Typography sx={{ fontWeight: '400', fontSize: '0.875rem', lineHeight: '1.43', letterSpacing: '0.01071em', color: 'rgba(0, 0, 0, 0.6)', padding: '10px' }}>
                                    {t("deleteContractDescription")}
                                </Typography>
                                :
                                <Typography sx={{ fontWeight: '400', fontSize: '0.875rem', lineHeight: '1.43', letterSpacing: '0.01071em', color: 'rgba(0, 0, 0, 0.6)', padding: '10px' }}>
                                    {t("contractDescription")}
                                </Typography>
                            }
                            <div className={styles.buttons} >
                                {searchedContract
                                    ?
                                    <span style={{ color: '#51d778', fontWeight: '700', fontSize: '18px' }}>{t("registered")}</span>
                                    :
                                    <>
                                        {sender
                                            ?
                                            <>
                                                {isFetching
                                                    ?
                                                    <LoadingButton loading color={"custom"} variant="contained" sx={{ borderRadius: 4, width: '60%', marginTop: '10px' }}>
                                                        Submit
                                                    </LoadingButton>
                                                    :
                                                    < MyButton color={"custom"} variant="contained" onClick={() => { deleteContractHandling(item.id) }} sx={{ borderRadius: '16px', width: '60%', marginTop: '10px' }}>
                                                        {t("delete")}
                                                    </MyButton>
                                                }
                                            </>
                                            :
                                            <>
                                                {item.contract_status === "approved"
                                                    &&
                                                    <>
                                                        {isFetching
                                                            ?
                                                            <LoadingButton loading color={"custom"} variant="contained" sx={{ borderRadius: 4, width: '60%', marginTop: '10px' }}>
                                                                Submit
                                                            </LoadingButton>
                                                            :
                                                            < MyButton color={"custom"} variant="contained" onClick={() => updateContractHandling(item.id, "rejected")} sx={{ borderRadius: '16px', width: '60%', marginTop: '10px' }}>
                                                                {t("reject")}
                                                            </MyButton>
                                                        }
                                                    </>
                                                }
                                                {item.contract_status === "rejected"
                                                    &&
                                                    <>
                                                        {isFetching
                                                            ?
                                                            <LoadingButton loading color={"custom"} variant="contained" sx={{ borderRadius: '16px', width: '60%', marginTop: '10px' }}>
                                                                Submit
                                                            </LoadingButton>
                                                            :
                                                            < MyButton color={"secondary"} variant="contained" onClick={() => updateContractHandling(item.id, "approved")} sx={{ borderRadius: '16px', width: '60%', marginTop: '10px' }}>
                                                                {t("approve")}
                                                            </MyButton>
                                                        }

                                                    </>
                                                }
                                                {item.contract_status === "waiting for approval"
                                                    &&
                                                    <>
                                                        {isFetching
                                                            ?
                                                            <>
                                                                <LoadingButton loading color={"custom"} variant="contained" sx={{ borderRadius: '16px', width: '60%', marginTop: '10px' }}>
                                                                    Submit
                                                                </LoadingButton>
                                                                <LoadingButton loading color={"custom"} variant="contained" sx={{ borderRadius: '16px', width: '60%', marginTop: '10px' }}>
                                                                    Submit
                                                                </LoadingButton>
                                                            </>
                                                            :
                                                            <>
                                                                < MyButton color={"secondary"} variant="contained" onClick={() => updateContractHandling(item.id, "approved")} sx={{ borderRadius: '16px', width: '60%', marginTop: '10px' }}>
                                                                    {t("approve")}
                                                                </MyButton>
                                                                < MyButton color={"custom"} variant="contained" onClick={() => updateContractHandling(item.id, "rejected")} sx={{ borderRadius: '16px', width: '60%', marginTop: '10px' }}>
                                                                    {t("reject")}
                                                                </MyButton>
                                                            </>
                                                        }

                                                    </>
                                                }
                                            </>
                                        }
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                    {/*FOOTER*/}
                    <div style={{ width: '100%', borderBottom: '2px solid silver', paddingTop: '10px' }}></div>
                    <div style={{ color: '#686868', fontWeight: '700', fontSize: '20px', lineHeight: '30px', padding: '20px 20px 0 20px' }}>{t("caution")}</div>
                </div>
            </ThemeProvider>
        </>
    )
}

export default ContractPage;

