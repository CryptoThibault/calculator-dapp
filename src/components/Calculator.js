import { useCalculator } from '../context/CalculatorContext'
import Button from './Button';

function Calculator() {
  const { web3State, state, dispatch, calculator } = useCalculator()
  const { calculation, result } = state
  const mapNumbers = Array(17).fill('_')

  const calculate = () => {
    let x = ''
    let y = ''
    let op = ''
    let yTurn = false

    const unitCalc = async () => {
      switch (op) {
        case '+': return await calculator.add(x, y)
        case '-': return await calculator.sub(x, y)
        case '*': return await calculator.mul(x, y)
        case '/': return await calculator.div(x, y)
        case '%': return await calculator.mod(x, y)
        default: return 'Error unitCalc'
      }
    }

    console.log(calculation)
    for (let el of calculation) {
      console.log(typeof el)
     if (!isNaN(el) && !yTurn) {
       x += el
     }
     if (!isNaN(el) && yTurn) {
       y += el
     }
     if (isNaN(el)) {
       if (yTurn) {
         x = unitCalc(Number(x), Number(y))
         y = ''
       }
       op = el
       yTurn = true
     }
    }

    return yTurn ? unitCalc(Number(x), Number(y)) : x
  }

  const handleChangeInput = (e) => {
    dispatch({type: 'CHANGE_CALCULATION', payload: e})
  }
  const handleClickResult = () => {
    dispatch({type: 'CHANGE_RESULT', payload: calculate(calculation)})
  }

  return (
    <>
    {web3State.chainId === 4 ? (
    <div className="btn bg-success m-4">
      <h1>Calculator</h1>
      <div className ="btn-group m-3">
        {mapNumbers.map((el, id) => {
          return <Button id={id} calculate={calculate} />
        })}
      </div>
      <form className="form-inline">
        <div className="form-group mb-2">
          <label className="text-light me-5" htmlFor="calculation">You can also write here:</label>
          <input className="bg-secondary text-light text-center" id="calculation" value={calculation} onChange={handleChangeInput}></input>
        </div>
        <div className="form-group mx-sm-3 mb-2">
          <button className="btn btn-danger mx-5" type="button" onClick={handleClickResult}>Get Result</button>
          <button className="btn btn-danger mx-5" type="button" onClick={() => handleChangeInput('0')}>Clear Input</button>
          <p className="text-light text-start m-2">Result: {result}</p>
        </div>
      </form>
    </div>
    ) : <p>You are not on the good Network</p>}
    </>
  );
};

export default Calculator;
