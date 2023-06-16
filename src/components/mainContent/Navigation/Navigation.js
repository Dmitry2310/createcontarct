import React from "react";
import { useTranslation } from "react-i18next";

import { theme } from "./../../header/Header";
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';

const Navigation = ({ chooseInbox, countContract, contractList, handleChoise, selectedType, isInbox, getContractsByClientIdApi }) => {

    const { t } = useTranslation();
    const [expanded, setExpanded] = React.useState('panel1');
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <ThemeProvider theme={theme}>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} elevation={2}>
                <AccordionSummary style={{ background: '#E6E5E5' }}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography>{t('inbox')}</Typography>
                </AccordionSummary>
                <AccordionDetails style={{ background: '#E6E5E5' }}>
                    <Box sx={{ width: '100%', bgcolor: '#E6E5E5' }}>
                        <List component="nav" aria-label="main mailbox folders">
                            <ListItemButton
                                selected={selectedType === "Waiting for approval" && isInbox === true}
                                onClick={() => chooseInbox("Waiting for approval")}>
                                <ListItemText primary={t('waiting_for_approval')} />
                                <p >{countContract(getContractsByClientIdApi.data, "Waiting for approval")}</p>
                            </ListItemButton>
                            < Divider />
                            <ListItemButton
                                selected={selectedType === "Approved" && isInbox === true}
                                onClick={() => chooseInbox("Approved")}>
                                <ListItemText primary={t('approved')} />
                                <p >{countContract(getContractsByClientIdApi.data, "Approved")}</p>
                            </ListItemButton>
                            < Divider />
                            <ListItemButton
                                selected={selectedType === "rejected" && isInbox === true}
                                onClick={() => chooseInbox("rejected")}>
                                <ListItemText primary={t('rejected')} />
                                <p >{countContract(getContractsByClientIdApi.data, "rejected")}</p>
                            </ListItemButton>
                            < Divider />
                        </List>
                    </Box>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} elevation={2}>
                <AccordionSummary style={{ background: '#E6E5E5' }}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    <Typography>{t("sent")}</Typography>
                </AccordionSummary>
                <AccordionDetails style={{ background: '#E6E5E5' }}>
                    <Box sx={{ width: '100%', bgcolor: '#E6E5E5' }}>
                        <List component="nav" aria-label="main mailbox folders">
                        <ListItemButton
                                selected={selectedType === "Waiting for approval" && isInbox === false}
                                onClick={() => handleChoise("Waiting for approval")}>
                                <ListItemText primary={t("waiting_for_approval")} />
                                <p style={{}}>{countContract(contractList, "Waiting for approval")}</p>
                            </ListItemButton>
                            < Divider />
                            <ListItemButton
                                selected={selectedType === "Approved" && isInbox === false}
                                onClick={() => handleChoise("Approved")}>
                                <ListItemText primary={t("approved")} />
                                <p style={{ /* background: '#63BCE5', padding: '4px', borderRadius: 30, color: '#fff' */ }}>{countContract(contractList, "Approved")}</p>
                            </ListItemButton>
                            < Divider />
                            <ListItemButton
                                selected={selectedType === "rejected" && isInbox === false}
                                onClick={() => handleChoise("rejected")}>
                                <ListItemText primary={t("rejected")} />
                                <p style={{}}>{countContract(contractList, "rejected")}</p>
                            </ListItemButton>
                        </List>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </ThemeProvider>
    )
}

export default Navigation;