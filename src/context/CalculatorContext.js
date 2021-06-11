import { calculatorReducer } from "../reducers/calculatorReducer"
import { ethers } from "ethers"
import { createContext, useContext, useReducer } from "react";
import { Web3Context } from "web3-hooks";

export const CalculatorContext = createContext()
export const CalculatorContextProvider = ({ children }) => {
  const [web3State, login] = useContext(Web3Context)
  const [state, dispatch] = useReducer(calculatorReducer, {
    ethBalance: 0,
    address: ethers.constants.AddressZero,
    sendValue: 0
  })

  return <CalculatorContext.Provider value={{web3State, login, state, dispatch}}>{children}</CalculatorContext.Provider>
};
export const useCalculator = () => {
  const context = useContext(CalculatorContext)
  if (context === undefined) {
    throw new Error('You try to use FilterContext outside of his provider')
  }
  return context
}