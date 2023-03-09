import React from "react";
import TableRow from "../common/tableRow/TableRow";
import { t } from "i18next";
import { useSelector } from "react-redux";
import Pagination from "../common/Pagination";
import ContractPage from "./ContractPage";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const InboxPage = ({ getContractsByClientIdApi, paginationInbox, openContract, setUpdate, openContractId, setOpenContractId }) => {

    const user = useSelector((state) => state.user.data);

    return (
        <>
            {getContractsByClientIdApi.loading
                &&
                <Box sx={{ display: 'flex', justifyContent:'center', alignItems: 'center', marginTop: '25%' }}>
                    <CircularProgress />
                </Box>
            }
            {openContract
                ?
                < ContractPage item={openContract} user={user} setOpenContractId={setOpenContractId} setUpdate={setUpdate} />
                :
                <>
                    {getContractsByClientIdApi.success
                        &&
                        <>
                            {paginationInbox.currentItems.length ? (
                                <>
                                    {paginationInbox.currentItems.map((item) => {
                                        return (
                                            <div onClick={() => setOpenContractId(item.id)} key={item.id}>
                                                <TableRow  _item={item} contracts={getContractsByClientIdApi.data} />
                                            </div>
                                        )
                                    })}
                                </>
                            ) :
                                <span style={{ margin: 'auto', color: '#808080' }}>{t('no_contract_to_display')}</span>
                            }
                            {paginationInbox.pageNumbers.length > 1 ?
                                <Pagination
                                    _previousOnClick={() => {
                                        if (paginationInbox.currentPage !== 1)
                                            paginationInbox.setCurrentPage(paginationInbox.currentPage - 1);
                                    }}
                                    _nextOnClick={() =>
                                        paginationInbox.setCurrentPage(paginationInbox.currentPage + 1)
                                    }
                                    _pageNumbers={paginationInbox.pageNumbers}
                                ></Pagination>
                                : null
                            }
                        </>
                    }
                </>
            }

        </>
    )
}

export default InboxPage;