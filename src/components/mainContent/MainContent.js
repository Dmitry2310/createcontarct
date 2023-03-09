import React, { useState, useEffect } from "react";
import { theme } from "./../header/Header";
import { ThemeProvider } from '@mui/material/styles';
import styles from "./MainContent.module.css";
import MyButton from "../common/MyButton";
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import TableRow from "../common/tableRow/TableRow";
import InboxPage from "./InboxPage";
import useApi from "./../../hooks/useApi";
import { useSelector, useDispatch } from "react-redux";
import { getContractsByClientId } from "../../api/contractApi";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {
    getContractsByUserId,
    updateContractHash,
    hashFile,
    registerBlockchain,
} from "../../api/contractApi";
import { loadContract, deselectAction } from "./../../actions/contractActions";
import { registerContract } from "./../../actions/contractActions";
import { useTranslation } from "react-i18next";
import ModalCreateContract from './../modal/ModalCreateContract';
import { contractNotify } from "../../actions/notificationActions";
import { searchBlockchain } from "../../api/contractApi";
import Pagination from "../common/Pagination";
import usePagination from "./../common/usePagination";
import Login from "../login/Login";
import ContractPage from "./ContractPage.js";
import TableRowSearch from "../common/tableRow/TableRowSearch";
import Navigation from "./Navigation/Navigation";
import { styled, alpha } from '@mui/material/styles';

//------SEARCH-----------
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.45),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.65),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    color: '#AFADAD',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '40ch',
            '&:focus': {
                width: '40ch',
            },
        },
    },
}));

const MainContent = () => {

    const { t } = useTranslation();

    useEffect(() => {
        /* console.log('updateMain'); */
    },[])
    // for Inbox tabs
    const chooseInbox = (text) => {
        setisInbox(true);
        setSelectedType(text);
        setOpenContract('');
        setOpenContractId('');
        if (isSearch !== false) {
            setIsSearch(false);
            setHashValue("");
        }
    };

    const [selectedType, setSelectedType] = useState("Approved");
    const [isInbox, setisInbox] = useState(true);
    const dispatch = useDispatch();
    const contractList = useSelector((state) => state.contract.list);
    const getContractsByUserIdApi = useApi(getContractsByUserId);
    const contracts = useSelector((state) => state.contract.selectedList);
    const getContractsByClientIdApi = useApi(getContractsByClientId);
    const user = useSelector((state) => state.user.data);
    const [update, setUpdate] = useState(false);

    // check page
    const updatePage = useSelector((state) => state.pages.update);

    let page = localStorage.getItem('page');

    useEffect(() => {
        /*  console.log('MainPage'); */
    }, [updatePage]);


    //replace date to display for american standart
    const getDateFromContract = (number) => {
        let date = number.split(' ')[0];
        let time = number.split(' ')[1];
        const [day, month, year] = date?.split('/');
        return `${year}/${month}/${day} ${time}`
    }

    // sort data by date
    const sortedContractListByDate = contractList.slice().sort((a, b) => getDateFromContract(b.updated) > getDateFromContract(a.updated) ? 1 : -1);
    const sortedContractsByClientIdApi = getContractsByClientIdApi.data.slice().sort((a, b) => getDateFromContract(b.updated) > getDateFromContract(a.updated) ? 1 : -1);
    /* console.log(sortedContractListByDate) */
    // api
    const hashFileApi = useApi(hashFile);
    const updateContractHashApi = useApi(updateContractHash);
    const registerBlockChainApi = useApi(registerBlockchain);

    useEffect(() => {
        const fetchData = async () => {
            if (user != null) {
                const response = await getContractsByUserIdApi.request(user.user_id);
                if (response.ok) {
                    dispatch(loadContract(response.data));
                }
            }
        };
        fetchData();
    }, [update, dispatch]);

    const filterContracts = (contracts, status) => {
        if (status === "All") return contracts;
        else {
            return contracts.filter(
                (contract) =>
                    contract.contract_status.toUpperCase() === status.toUpperCase()
            );
        }
    };

    const countContract = (contracts, status) => {

        if (status === "All") return contracts.length;
        if (status === "Inbox") return contracts.length;
        if (status !== "All" && status !== "Inbox") {
            var count = 0;
            for (var i = 0; i < contracts.length; ++i) {
                if (contracts[i].contract_status.toUpperCase() === status.toUpperCase())
                    count++;
            }
            return count;
        }
    };

    useEffect(() => {
        if (user != null) {
            getContractsByClientIdApi.request(user.user_id);
        }
        setUpdate(false);
    }, [update]);

    const handleChoise = (type) => {
        setSelectedType(type);
        setisInbox(false);
        setContract('');
        setOpenContract('');
        setOpenContractId('');
        if (isSearch !== false) {
            setIsSearch(false);
            setHashValue("");
        }
    }

    const uploadBlockchainHandling = () => {
        const promises = [];
        for (let i = 0; i < contracts.length; i++) {
            promises.push(hashFileHandling(contracts[i]));
        }
    };

    const hashFileHandling = async (contract) => {
        const response = await hashFileApi.request(contract.contract_file);
        if (response.ok) {
            await updateContractHashHandling(contract, response.data.hash_value);
            /*  dispatch(contractNotify(t("success"))); */
            console.log("hashFile succ");
        } else {
            console.log("hashFile failed");
        }
    };

    const updateContractHashHandling = async (contract, hash) => {
        /* console.log(contract.id, hash) */
        const response = await updateContractHashApi.request(contract.id, hash);
        if (response.ok) {
            dispatch(registerContract(contract.id, hash));
            await registerBlockChainHandling(
                contract.contractA_id,
                contract.contractB_id,
                contract.contract_info,
                hash
            );
            dispatch(deselectAction(contract.id));
            dispatch(contractNotify(t("register_success")));
        } else {
            dispatch(deselectAction(contract.id));
            dispatch(contractNotify(t("update_hashfile_failed")));
        }
    };

    const registerBlockChainHandling = async (
        userId,
        clientId,
        contractInfo,
        contractHash
    ) => {
        await registerBlockChainApi.request(
            userId,
            clientId,
            contractInfo,
            contractHash
        );
    };
    //-------SEARCH-----

    const [hashValue, setHashValue] = useState("");
    const [statusCode, setStatusCode] = useState(0);
    const [isSearch, setIsSearch] = useState(false);
    const [contract, setContract] = useState();
    const [openContractId, setOpenContractId] = useState('');
    const [openContract, setOpenContract] = useState();
    const searchBlockchainApi = useApi(searchBlockchain);

    const searchBlockchainHandling = async () => {
        const response = await searchBlockchainApi.request(hashValue);
        if (response.ok) {
            setIsSearch(true);
            setOpenContractId('');
            setOpenContract('');
            setStatusCode(response.data.status_code);
            setContract(response.data)
        }
    };

    const openFoundContract = (contract) => {
        setIsSearch(false);
        setHashValue("");
        setOpenContract(contract);
    };

    //------------For modal window Create Contract--------------------

    const [openWindow, setOpenWindow] = React.useState(false);
    const handleOpenWindow = () => {
        setOpenWindow(true);
    };
    const handleCloseWindow = () => setOpenWindow(false);
    // ------- end Create Contract ----------------------------------

    const pagination = usePagination((filterContracts(sortedContractListByDate, selectedType)));

    const paginationInbox = usePagination(filterContracts(sortedContractsByClientIdApi, selectedType));

    const findAndOpenContract = () => {
        return getContractsByUserIdApi.data.filter(contract => contract.id === openContractId)
    };

    const findAndOpenContractInbox = () => {
        return getContractsByClientIdApi.data.filter(contract => contract.id === openContractId)
    };

    useEffect(() => {
        let contract = findAndOpenContract()
        if (contract[0]) {
            setOpenContract(contract[0])
            return;
        }
        let contractInbox = findAndOpenContractInbox()
        if (contractInbox[0]) {
            setOpenContract(contractInbox[0])
            return;
        }
        if (openContractId == '') {
            setOpenContract('');
        }
    }, [openContractId]);

    let styleVisible = page !== "home" ? "block" : "none"

    return (
        <div style={{display: styleVisible, width: '100%', minHeight: '80vh'}}>
            {!user
                ?
                < Login />
                :
                <ThemeProvider theme={theme}>
                    <div className={styles.wrapper}>
                        <div className={styles.formWrapper}>
                            <div className={styles.contentWrapper}>
                                <div className={styles.navBlock}>
                                    <div className={styles.navigation}>
                                        < Navigation
                                            chooseInbox={chooseInbox}
                                            countContract={countContract}
                                            contractList={contractList}
                                            handleChoise={handleChoise}
                                            selectedType={selectedType}
                                            isInbox={isInbox}
                                            getContractsByClientIdApi={getContractsByClientIdApi}
                                        />
                                    </div>
                                    < MyButton color={"secondary"} variant="contained" onClick={handleOpenWindow} sx={{ mt: { xs: 2, sm: 2, md: 5 }, mb: { xs: 2, sm: 2 }, borderRadius: '16px', width: '100%' }}>
                                        {t('create_contract')}
                                    </MyButton>
                                    < ModalCreateContract open={openWindow} handleClose={handleCloseWindow} setUpdate={setUpdate} />
                                </div>
                                <div className={styles.contentBlock}>
                                    <div className={styles.searchBlock}>
                                        <div className={styles.searchArea}>
                                            <Search>
                                                <SearchIconWrapper>
                                                    <SearchIcon />
                                                </SearchIconWrapper>
                                                <StyledInputBase
                                                    placeholder={t('search_blockchain_placeholder')}
                                                    inputProps={{ 'aria-label': 'search' }}
                                                    value={hashValue || ""}
                                                    onChange={(event) => setHashValue(event.target.value)} style={{ width: '100%' }} />
                                            </Search>
                                        </div>
                                        <div className={styles.searchButton}>
                                            < MyButton color={"secondary"} variant="contained" sx={{ borderRadius: '16px', minWidth: '115px' }}
                                                onClick={() => searchBlockchainHandling()}>
                                                {t('search')}
                                            </MyButton>
                                        </div>
                                    </div>
                                    {isSearch
                                        ?
                                        <>
                                            {statusCode !== 404 && contract
                                                ?
                                                //Show searched contract
                                                <div onClick={() => openFoundContract(contract)} style={{ paddingTop: '20px' }}>
                                                    <TableRowSearch key={contract.id} _item={contract} contracts={contracts} uploadBlockchainHandling={uploadBlockchainHandling} />
                                                </div>
                                                :
                                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <p className="text-muted text-center" style={{ marginTop: '10%' }}>{t("no_matching_result")}</p>
                                                </div>
                                            }
                                        </>
                                        :
                                        <>
                                            {openContract
                                                ?
                                                < ContractPage item={openContract} user={user} setOpenContractId={setOpenContractId} setUpdate={setUpdate} />
                                                :
                                                <>
                                                    <div className={styles.tableHeader}>
                                                        <span style={{ width: '25%' }}>{t('contract_list')}</span>
                                                        <span style={{ width: '45%', textAlign: 'start' }}>{t('contract_information')}</span>
                                                        <span style={{ width: '30%' }}>{t('updated_date')}</span>

                                                    </div>
                                                    {isInbox
                                                        ?
                                                        < InboxPage getContractsByClientIdApi={getContractsByClientIdApi} paginationInbox={paginationInbox} openContract={openContract} setOpenContract={setOpenContract}
                                                            openContractId={openContractId} setOpenContractId={setOpenContractId} setUpdate={setUpdate} />
                                                        :
                                                        <>
                                                            {getContractsByUserIdApi.loading
                                                                &&
                                                                <Box sx={{ display: 'flex' }}>
                                                                    <CircularProgress />
                                                                </Box>
                                                            }
                                                            {user !== null &&
                                                                user !== undefined &&
                                                                getContractsByUserIdApi.success && (
                                                                    <>
                                                                        {(filterContracts(sortedContractListByDate, selectedType)).length ? (
                                                                            <>
                                                                                {pagination.currentItems.map((item) => {
                                                                                    return (
                                                                                        <div onClick={() => setOpenContractId(item.id)} key={item.id}>
                                                                                            <TableRow _item={item} contracts={contracts} uploadBlockchainHandling={uploadBlockchainHandling} />
                                                                                        </div>
                                                                                    )
                                                                                })}
                                                                            </>
                                                                        ) :
                                                                            <span style={{ margin: 'auto', color: '#808080' }}>{t('no_contract_to_display')}</span>
                                                                        }
                                                                    </>
                                                                )
                                                            }
                                                            {(filterContracts(sortedContractListByDate, selectedType)).length > 7 && !contract ?
                                                                <div>
                                                                    <Pagination
                                                                        _previousOnClick={() => {
                                                                            if (pagination.currentPage !== 1)
                                                                                pagination.setCurrentPage(pagination.currentPage - 1);
                                                                        }}
                                                                        _nextOnClick={() =>
                                                                            pagination.setCurrentPage(pagination.currentPage + 1)
                                                                        }
                                                                        _pageNumbers={pagination.pageNumbers}
                                                                    ></Pagination>
                                                                </div>
                                                                :
                                                                null
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
                    </div>


                </ThemeProvider>
            }
        </div>
    )
}

export default MainContent;