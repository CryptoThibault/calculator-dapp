import {useCalculator} from '../context/CalculatorContext'
import Button from './Button';

function Calculator() {
  const { state } = useCalculator()
  const { calculation, result } = state
  const mapNumbers = Array(17).fill('_')
  return (
    <div className="bg-success m-5">
      <div className ="m-3">
        {mapNumbers.map((el, id) => {
          return <Button id={id} />
        })}
      </div>
      <label id="calculation">Write your caculation here</label>
      <input htmlFor="calculation" value={calculation}></input>
      <button>Get Result</button>
      <p>Result: {result}</p>
    </div>
  );
};

export default Calculator;
