import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import { createContract, sendContractEmail } from "../../api/contractApi";

const styles = {
    dropzoneActive: {
        borderColor: 'green',
    },
}

const MyUploader = ({ getUploadParams, handleChangeStatus, handleSubmit, presendContractEmailApi, createContractApi, getEmailApi }) => {


    return (
        <Dropzone
            getUploadParams={getUploadParams}
            onChangeStatus={handleChangeStatus}
            onSubmit={handleSubmit}
            styles={styles}
            maxFiles={1}
            multiple={false}
            disabled={
                getEmailApi ||
                createContractApi ||
                presendContractEmailApi
            }
            accept=".pdf"
        />
    )
}


export default MyUploader;