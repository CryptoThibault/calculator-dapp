
import Account from './components/Account'
import Calculator from './components/Calculator'
import { CalculatorContextProvider } from './context/CalculatorContext';

function Dapp() {
  return (
    <CalculatorContextProvider>
      <h1 className="text-center">Decentralized Calculator</h1>
      <Account />
      <Calculator />
    </CalculatorContextProvider>
  );
};

export default Dapp;
