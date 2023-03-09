import {
    CONTRACT_LOAD,
    CONTRACT_ADD,
    CONTRACT_REMOVE,
    CONTRACT_SELECT,
    CONTRACT_DESELECT,
    CONTRACT_REGISTER,
  } from "../constants/contractConstants";
  
  const initialState = {
    list: [],
    selectedList: [],
  };
  
  const contractReducer = (state = initialState, action) => {
    switch (action.type) {
      case CONTRACT_LOAD: {
        return {
          ...state,
          list: action.payload.list,
        };
      }
      case CONTRACT_ADD: {
        let newList = [...state.list];
        newList.push(action.payload.item);
        return {
          ...state,
          list: newList,
        };
      }
      case CONTRACT_REMOVE: {
        return {
          ...state,
          list: state.list.filter((contract) => contract.id !== action.payload.id),
          selectedList: state.selectedList.filter(
            (contract) => contract.id !== action.payload.id
          ),
        };
      }
      case CONTRACT_SELECT: {
        let newList = [...state.selectedList];
        newList.push(action.payload.item);
        return {
          ...state,
          selectedList: newList,
        };
      }
      case CONTRACT_DESELECT: {
        return {
          ...state,
          selectedList: state.selectedList.filter(
            (contract) => contract.id !== action.payload.id
          ),
        };
      }
      case CONTRACT_REGISTER: {
        let newList = [...state.list];
        const id = action.payload.id;
        const hashKey = action.payload.hashKey;
        for (let i = 0; i < newList.length; i++) {
          if (String(newList[i].id) === String(id))
            newList[i].contract_hash = hashKey;
        }
        return {
          ...state,
          list: newList,
        };
      }
      default:
        return state;
    }
  };
  
  export default contractReducer;
  