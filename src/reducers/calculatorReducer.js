export const calculatorReducer = (state, action) => {
  switch(action.type) {
    case 'CHANGE_ETH_BALANCE': 
      return {
        ...state,
        ethbalance: action.payload
    }
    case 'CHANGE_ADDRESS': 
      return {
        ...state,
        sendAddress: action.payload
    }
    case 'CHANGE_SEND_VALUE':
      return {
        ...state,
        sendValue: action.payload
    }
    default:
      throw new Error(`Unsupported action type ${action.type}`)
  }
};
