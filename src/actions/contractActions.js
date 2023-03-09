import {
    CONTRACT_LOAD,
    CONTRACT_ADD,
    CONTRACT_REMOVE,
    CONTRACT_SELECT,
    CONTRACT_DESELECT,
    CONTRACT_REGISTER
  } from "../constants/contractConstants";
  
  export const loadContract = list => {
    return {
      type: CONTRACT_LOAD,
      payload: { list }
    };
  };
  
  export const addContract = item => {
    return {
      type: CONTRACT_ADD,
      payload: { item }
    };
  };
  
  export const removeContract = id => {
    return {
      type: CONTRACT_REMOVE,
      payload: { id }
    };
  };
  
  export const selectAction = item => {
    return {
      type: CONTRACT_SELECT,
      payload: { item }
    };
  };
  
  export const deselectAction = id => {
    return {
      type: CONTRACT_DESELECT,
      payload: { id }
    };
  };
  
  export const registerContract = (id, hashKey) => {
    return {
      type: CONTRACT_REGISTER,
      payload: { id, hashKey }
    };
  };