export const calculatorReducer = (state, action) => {
  switch(action.type) {
    case 'CHANGE_ETH_BALANCE': 
      return {
        ...state,
        ethBalance: action.payload
    }
    case 'CHANGE_ADDRESS': 
      return {
        ...state,
        address: action.payload
    }
    case 'CHANGE_SEND_VALUE':
      return {
        ...state,
        sendValue: action.payload
    }
    case 'CHANGE_CALCULATION':
      return {
        ...state,
        calculation: action.payload
      }
    case 'CHANGE_RESULT':
      return {
        ...state,
        result: action.payload
      }
    case 'CHANGE_DONATION':
      return {
        ...state,
        donation: action.payload
      }
    default:
      throw new Error(`Unsupported action type ${action.type}`)
  }
};
