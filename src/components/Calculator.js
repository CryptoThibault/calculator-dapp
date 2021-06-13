import { useCalculator } from '../context/CalculatorContext'
import Button from './Button';
import { ethers } from 'ethers'

function Calculator() {
  const { web3State, state, dispatch, calculator } = useCalculator()
  const { calculation, result, donation } = state
  const mapNumbers = Array(17).fill('_')

  const calculate = async () => {
    let x = ''
    let y = ''
    let op = ''
    let yTurn = false

    const unitCalc = async () => {
      let unit
      switch (op) {
        case '+': unit = await calculator.add(x, y); break
        case '-': unit = await calculator.sub(x, y); break
        case '*': unit = await calculator.mul(x, y); break
        case '/': unit = await calculator.div(x, y); break
        case '%': unit = await calculator.mod(x, y); break
        default: console.log('Error unitCalc')
      }
      return unit.toString()
    }

    for (let el of calculation) {
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
    let res = yTurn ? await unitCalc(Number(x), Number(y)) : x
    dispatch({ type: 'CHANGE_RESULT', payload: Number(res) })
  }

  const handleChangeInput = (e) => {
    dispatch({ type: 'CHANGE_CALCULATION', payload: e === '0' ? e : e.target.value })
  }
  const handleChangeDonation = (e) => {
    dispatch({ type: 'CHANGE_DONATION', payload: e.target.value })
  }

  const handleClickDonate = async () => {
    const weiAmount = ethers.utils.parseEther(donation)
    try {
      const tx = await web3State.signer.sendTransaction({
        to: "0x166bb3346c83fDf9Bc0e693DA09a271F7E9F4C79",//process.env.OWNER_ADDRESS,
        value: weiAmount,
      })
      await tx.wait()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
    {web3State.chainId === 4 ? (
    <div className="btn bg-success m-4">
      <h1>Calculator</h1>
      <div className ="btn-group m-3">
        {mapNumbers.map((el, id) => {
          return <Button key={id} id={id} calculate={calculate} />
        })}
      </div>
      <form className="form-inline">
        <div className="form-group mb-2">
          <label className="text-light me-5" htmlFor="calculation">You can also write here:</label>
          <input className="bg-secondary text-light text-center" id="calculation" value={calculation} onChange={handleChangeInput}/>
        </div>
        <div className="form-group mx-sm-3 mb-2">
          <button className="btn btn-danger mx-5" type="button" onClick={() => calculate(calculation)}>Get Result</button>
          <button className="btn btn-danger mx-5" type="button" onClick={() => handleChangeInput('0')}>Clear Input</button>
        </div>
          <p className="text-light text-start mx-5">Result: {result}</p>
        <div className="form-group mb-2 text-end">
          <label className="text-light me-3" htmlFor="donation">Donation</label>
          <input type="number" value={donation} onChange={handleChangeDonation} className="text-center me-2" id="donation"/>
          <button className="btn btn-primary" onClick={handleClickDonate}>Send</button>
        </div>
      </form>
    </div>
    ) : <p>You are not on the good Network</p>}
    </>
  );
};

export default Calculator;
