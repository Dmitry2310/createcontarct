import { api, processor } from "./client";

// contract crud api
export const createContract = (
  userId,
  contractInfo,
  expiredDate,
  contractFile,
  clientId
) =>
  api.post(`/users/${userId}/contracts/`, {
    contract_info: contractInfo,
    expired_date: expiredDate,
    contract_file: contractFile,
    contractB_id: clientId
  });

export const getContractsByUserId = userId =>
  api.get(`/users/${userId}/contracts`);

export const getContractsByClientId = clientId =>
  api.get(`clients/${clientId}/contracts`);

export const updateContract = (contractId, status) =>
  api.put(`contracts/${contractId}`, {
    contract_status: status
  });
export const sendContractEmail = (type, clientId) =>
  api.post(`mails/${clientId}`, { type });

export const updateContractHash = (contractId, hash) =>
  api.put(`/contracts-hash/${contractId}`, { contract_hash: hash });

export const deleteContract = contractId =>
  api.delete(`contracts/${contractId}`);

export const searchContract = hashValue =>
  api.post(`contracts/search`, { hash_value: hashValue });

// contract file api
export const uploadFile = formData =>
  api.post("/uploadfiles", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

export const downloadFile = filename =>
  processor.get(`downloadfiles/${filename}`);

export const hashFile = filename => api.post(`/hashfiles/${filename}`);

export const registerBlockchain = (
  userId,
  clientId,
  contractInfo,
  contractHash
) =>
  api.post(`/bc`, {
    contractA_id: userId,
    contractB_id: clientId,
    contract_info: contractInfo,
    contract_hash: contractHash
  });

export const searchBlockchain = contractHash =>
  api.get(`/bc/search-hash/${contractHash}`);