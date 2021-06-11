import { useCalculator } from '../context/CalculatorContext'
import Button from './Button';

function Calculator() {
  const { state, dispatch } = useCalculator()
  const { calculation, result } = state
  const mapNumbers = Array(17).fill('_')

  const calculate = (str) => {

  }

  const handleChangeInput = (e) => {
    dispatch({type: 'CHANGE_CALCULATION', payload: e})
  }
  const handleClickButton = () => {
    dispatch({type: 'CHANGE_RESULT', payload: calculate(calculation)})
  }

  return (
    <div className="bg-success m-5">
      <div className ="m-3">
        {mapNumbers.map((el, id) => {
          return <Button id={id} calculate={calculate} />
        })}
      </div>
      <label id="calculation">Write your caculation here</label>
      <input htmlFor="calculation" value={calculation} onChange={handleChangeInput}></input>
      <button onClick={handleClickButton}>Get Result</button>
      <p>Result: {result}</p>
    </div>
  );
};

export default Calculator;
