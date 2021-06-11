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
  const handleClickResult = () => {
    dispatch({type: 'CHANGE_RESULT', payload: calculate(calculation)})
  }
  const handleClickClear = () => {
    dispatch({type: 'CHANGE_CALCULATION', payload: 0})
  }

  return (
    <div className="btn bg-success m-4">
      <h1>Calculator</h1>
      <div className ="btn-group m-3">
        {mapNumbers.map((el, id) => {
          return <Button id={id} calculate={calculate} />
        })}
      </div>
      <form className="form-inline">
        <div className="form-group mb-2">
        <label className="text-light me-5" htmlFor="calculation">Write your caculation here</label>
        <input className="bg-secondary" id="calculation" value={calculation} onChange={handleChangeInput}></input>
        </div>
        <div className="form-group mx-sm-3 mb-2">
        <button className="btn btn-danger mx-5" type="button" onClick={handleClickResult}>Get Result</button>
        <button className="btn btn-danger mx-5" type="button" onClick={handleClickClear}>Clear Input</button>
        <p className="text-light text-start m-2">Result: {result}</p>
        </div>
      </form>
    </div>
  );
};

export default Calculator;
