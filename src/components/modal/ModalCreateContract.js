import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { addContract } from "../../actions/contractActions";
import { useTranslation } from "react-i18next";
import { getEmail } from "../../api/authApi";
import useApi from "../../hooks/useApi";
import Dropzone from "react-dropzone-uploader";
import { createContract, sendContractEmail } from "../../api/contractApi";
import { useSelector } from "react-redux";
import authStorage from "../../auth/authStorage";
import baseURL from "../../api/baseURL";
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { theme } from '../header/Header';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import styles from "./ModalCreateContract.module.css";
import Backdrop from '@mui/material/Backdrop';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'react-notifications/lib/notifications.css';
import { contractNotify } from '../../actions/notificationActions';
import CloseButton from '../common/CloseButton';
import { actions } from '../../reducers/notifikationReducer';
import Grid from '@mui/material/Grid';
import 'react-dropzone-uploader/dist/styles.css';
import '@react-pdf-viewer/core/lib/styles/index.css';
/* import { Viewer, Worker } from '@react-pdf-viewer/core'; */
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Typography } from '@mui/material';
import Preview from './UploadContract/Preview';


const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minHeight: '550px',
    width: '80%',
    display: 'flex',
    bgcolor: '#D9D9D9',
    boxShadow: '10px 29px 32px rgba(0, 0, 0, 0.5)',
    borderRadius: 6
};

const ModalCreateContract = ({ open, handleClose, setUpdate }) => {

    const { t } = useTranslation();
    const user = useSelector((state) => state.user.data);
    const dispatch = useDispatch();
    const [clientEmail, setClientEmail] = useState();
    const [contractInfo, setContractInfo] = useState();
    const [expiredDate, setExpiredDate] = React.useState(dayjs());
    const [filename, setFilename] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorSubject, setErrorSubject] = useState('');
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const [uploadedFilesType, setUploadedFilesType] = useState('');
    const [filesTypeFunction, setFilesTypeFunction] = useState('');
    
    const [uploadedFile, setUploadedFile] = useState(null);
    const [fileSize, setFileSize] = useState(0);
    const createContractApi = useApi(createContract);
    const sendContractEmailApi = useApi(sendContractEmail);
    const getEmailApi = useApi(getEmail);

    const getEmailHandling = async (email) => {
        if (email == user.user_email) {
            setErrorEmail(t('cannot_send_contract_to_yourself'));
            return;
        }
        if (!contractInfo) {
            setErrorSubject(t('Subject_required'));
            return;
        }
        const response = await getEmailApi.request(email);
        if (response.ok) {
            setErrorEmail(t(''));
            createContractHandling(
                user.user_id,
                contractInfo,
                expiredDate,
                filename,
                response.data.id
            );
        } else {
            setErrorEmail(t("email_does_not_exist"));
        }
    };

    const createContractHandling = async (
        userId,
        contractInfo,
        expiredDate,
        contractFile,
        clientEmail
    ) => {
        const response = await createContractApi.request(
            userId,
            contractInfo,
            expiredDate,
            contractFile,
            clientEmail
        );

        if (response.ok) {
            dispatch(actions.setNotification(t("create_contract_success")));
            setUpdate(true);
            setErrorEmail('');
            setErrorSubject('');
            setUploadedFile(null);
            setFileSize(0);
            setUploadedFilesType('');
            setFilesTypeFunction('');
            dispatch(addContract(response.data));
            sendContractEmailHandling(clientEmail);
        } else {
            dispatch(contractNotify(t("create_contract_failed")));
        }
    };

    const sendContractEmailHandling = async (clientEmail) => {
        const response = await sendContractEmailApi.request(0, clientEmail);
        if (response.ok) {
            setUploadedFile(null);
            setUploadedFilesType('');
            setFileSize(0);
            setFilesTypeFunction('');
            handleClose();
        } else {
            // not yet
            dispatch(actions.setNotification(t("some error exists")));
        }
    };

    // specify upload params and url for your files
    const getUploadParams = async ({ file }) => {

        const authToken = await authStorage.getToken();
        const body = new FormData();
        console.log(file)
        let fileType = file.type
        setUploadedFilesType(fileType);
        setFileSize(file.size)
        body.append("file", file);
        // for displaing file
        let reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = (e) => {
            setUploadedFile(e.target.result)
        }
        return {
            url: baseURL + "/uploadfiles",
            body,
            headers: { Authorization: "Bearer " + authToken },
        };
    };
    //END specify upload params and url for your files

    // called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file, xhr }, status) => {

        if (status == "done") {
            var json = JSON.parse(xhr.response);
            setFilename(json.filename);
            function getExtension(file) {
                return file.name.split('.').pop()
            }
            const fileType = getExtension(file).toLowerCase();
            setFilesTypeFunction(fileType);
        }
        if (status == "removed") {
            setUploadedFile('');
            setUploadedFilesType('');
            setFileSize(0);
            setFilesTypeFunction('');
        }
    };

    // receives array of files that are done uploading when submit button is clicked
    const handleSubmit = async (files, allFiles) => {
        getEmailHandling(clientEmail);
    };

    return (
        <div>
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
                sx={{ top: '10%', minWidth: { xs: '300px', md: '700px' } }}
            >
                <Fade in={open}>
                    <Box sx={style} >
                        <Grid container gap={0}>
                            <Grid item xs={12} md={6}>
                                <ThemeProvider theme={theme}>
                                    <div className={styles.contractForm}>
                                        <div className={styles.contractText}>{t('create_contract')}</div>
                                        < CloseButton handleClose={handleClose} setUploadedFile={setUploadedFile} setContractInfo={setContractInfo} setClientEmail={setClientEmail} />
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <Stack spacing={{ xs: 1, md: 3 }} marginBottom={1} width={'80%'}>
                                                <TextField
                                                    style={{ background: '#f7f7f7', borderRadius: '6px' }}
                                                    required
                                                    id="filled-required"
                                                    label={t("to_contractor")}
                                                    variant="filled"
                                                    value={clientEmail || ''}
                                                    onChange={(event) => setClientEmail(event.target.value)}
                                                />
                                                {errorEmail ? <p style={{ color: 'red', marginTop: '4px', fontSize: '14px' }}>{errorEmail}</p> : null}
                                                <TextField
                                                    style={{ background: '#f7f7f7', borderRadius: '6px' }}
                                                    required
                                                    id="filled-required"
                                                    label={t("contract_information")}
                                                    variant="filled"
                                                    value={contractInfo || ''}
                                                    onChange={(event) => setContractInfo(event.target.value)}
                                                />
                                                {errorSubject ? <p style={{ color: 'red', marginTop: '4px', fontSize: '14px' }}>{errorSubject}</p> : null}
                                                <DateTimePicker
                                                    label="DateTimePicker"
                                                    value={expiredDate}
                                                    onChange={setExpiredDate}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                                <Dropzone
                                                    getUploadParams={getUploadParams}
                                                    onChangeStatus={handleChangeStatus}
                                                    onSubmit={handleSubmit}
                                                    maxFiles={1}
                                                    inputContent={t("drag_Files")}
                                                    submitButtonContent={t("submit")}

                                                    styles={{
                                                        dropzone: { border: '2px solid silver' },
                                                        submitButton: {
                                                            background: '#63BCE5', color: '#fff'
                                                        },
                                                        submitButtonContainer: {
                                                            margin: '10px auto'
                                                        },
                                                        previewImage: {
                                                            display: 'none'
                                                        },
                                                        preview: {
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            padding: '10px',
                                                            justifyContent: 'center',
                                                            alignItems: 'center'
                                                        }
                                                    }}
                                                    disabled={
                                                        getEmailApi.loading ||
                                                        createContractApi.loading ||
                                                        sendContractEmailApi.loading
                                                    }
                                                ></Dropzone>
                                                {(fileSize > 1000000) && <Typography sx={{ fontSize: { xs: '0.6rem', md: '0.8rem' }, textAlign: 'center', color: 'red' }}>{t("File_size_should_not_exceed_1MB")}</Typography>}
                                            </Stack>
                                        </LocalizationProvider>
                                    </div>
                                </ThemeProvider >
                            </Grid>
                            <Grid item xs={12} md={6} sx={{ maxHeight: { xs: '200px', md: '500px' }, overflow: 'hidden', overflowY: 'auto' }}>
                                <Preview uploadedFile={uploadedFile} uploadedFilesType={uploadedFilesType} filesTypeFunction={filesTypeFunction}/>
                            </Grid>
                        </Grid>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}

export default ModalCreateContract;