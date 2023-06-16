import React from "react";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Card, CardMedia } from "@mui/material";
import { Viewer, Worker } from '@react-pdf-viewer/core';
import Box from '@mui/material/Box';
import excelIcon from "./../../../assets/images/excelIcon.png";
import outlookIcon from "./../../../assets/images/outlookIcon.jpeg";
import wordIcon from "./../../../assets/images/wordIcon.png";
import documentIcon from "./../../../assets/images/documentIcon.png";

const Preview = ({ uploadedFile, uploadedFilesType, filesTypeFunction }) => {

    // check uploaded files type
    const PDFFileTypes = ['pdf', 'pdf/a', 'pdf/e', 'pdf/x', 'pdf/vt', 'pdf/ua', 'pades'];
    const imageTypes = ["jpeg", "png", "jpg"];
    const excelTypes = ['xlsx', 'xlsm', 'xls', 'xltl', 'xltm', 'ods'];
    const outlookTypes = ['eml', 'vcf', 'nws', 'mbx', 'dbx'];
    const wordTypes = ['doc', 'dot', 'wbk', 'docm', 'dotx', 'dotm', 'docx'];

    // check  what type of document has benn uploaded
    const defineType = () => {
        if (excelTypes.includes(filesTypeFunction)) {
            return excelIcon;
        }
        if (outlookTypes.includes(filesTypeFunction)) {
            return outlookIcon;
        }
        if (wordTypes.includes(filesTypeFunction)) {
            return wordIcon;
        }
        else {
            return documentIcon
        }
    };

    return (
        <Box sx={{ height: { xs: '200px', md: '500px' }, overflow: 'hidden', overflowY: 'auto', padding: { xs: '5px 5px 60px 5px', md: '20px' } }}>
            {!uploadedFile
                ?
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: { xs: '200px', md: '500px' }, width: ' 100%', padding: { xs: '5px 5px 20px 5px', md: '35px 35px 70px 35px' } }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: ' 100%', border: '2px solid silver' }}>
                        <UploadFileIcon sx={{ opacity: '0.3', height: '100px', width: '100px' }} />
                    </div>
                </Box>
                :
                <>
                    {(uploadedFilesType.startsWith('image/') || imageTypes.includes(filesTypeFunction))
                        &&
                        <>
                            <Card sx={{ maxWidth: 490, margin: '0 auto', marginTop: '5%'}} elevation={3}>
                                <CardMedia
                                    component="img"
                                    alt={'picture'}
                                    height={"400px"}
                                    image={uploadedFile}
                                />
                            </Card>
                        </>
                    }
                    {(PDFFileTypes.includes(filesTypeFunction))
                        &&
                        <Worker workerUrl='https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js'>
                            <Viewer fileUrl={uploadedFile} /* plugins={{[defaultLayoutPluginInstance]}} */ />
                        </Worker>
                    }
                    {(wordTypes.includes(filesTypeFunction) || outlookTypes.includes(filesTypeFunction) || excelTypes.includes(filesTypeFunction))
                        &&
                        <>
                            <Card sx={{ position: 'relative', display: 'flex', alignItems: 'center', /* paddingTop: '56.25%', */ minHeight: { xs: '100px', md: '400px' }, marginTop: { xs: '0px', md: '5%' } }} raised elevation={6}>
                                <CardMedia
                                    component="img"
                                    image={defineType()}
                                    alt="Document"
                                    sx={{ width: '47%', margin: '0 auto', objectFit: 'cover' }}
                                />
                            </Card>
                        </>
                    }
                </>
            }
        </Box>
    )
};

export default Preview;