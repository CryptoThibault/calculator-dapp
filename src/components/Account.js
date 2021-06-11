import { useCalculator } from '../context/CalculatorContext'
import { ethers } from 'ethers'

function Account() {
  const { web3State, login, state, dispatch } = useCalculator()
  const { ethBalance, address, sendValue } = state

  const handleClickGetBalance = async () => {
    try {
      const balance = await web3State.provider.getBalance(address)
      dispatch({type: 'CHANGE_ETH_BALANCE', payload: ethers.utils.formatEther(balance)})
    } catch (e) {
      console.log(e)
    }
  }

  const handleClickSend = async () => {
    const weiAmount = ethers.utils.parseEther(sendValue)
    try {
      const tx = await web3State.signer.sendTransaction({
        to: address,
        value: weiAmount,
      })
      await tx.wait()
      console.log('TX MINED')
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div className="btn bg-primary m-5">
      <h1>Account</h1>
      <div className="row">
        <p className="col-4">MetaMask installed: {web3State.isMetaMask ? '✅' : '❌'}</p>
        <p className="col-3">Web3 injected: {web3State.isWeb3 ? '✅' : '❌'}</p>
        <p className="col-3">logged: {web3State.isLogged ? '✅' : '❌'}</p>
        {!web3State.isLogged && (
          <>
            <button className="col-2 btn-dark text-light" onClick={login}>login</button>
          </>
        )}
        </div>
        <div className="row">
          <p className="col-3">Network id: {web3State.chainId}</p>
          <p className="col-4">Network name: {web3State.networkName}</p>
        </div>
        <p className="text-start mx-5">Account address: {web3State.account}</p>
        <p className="text-start mx-5">Balance: {web3State.balance}</p>
        <div className="form-group row">
          <label className="col-2 col-form-label" htmlFor="balanceOf">Address:</label>
          <div className="col-10">
            <input
              className="form-control"
              id="balanceOf"
              type="text"
              value={address}
              placeholder="ethereum address"
              onChange={(event) => dispatch({type: 'CHANGE_ADDRESS', payload: event.target.value})}
            />
          </div>
        </div>
        <div className="row my-4">
        <button className="col-3 btn btn-danger" onClick={handleClickGetBalance}>Get Balance</button>
        <p className="col-9 btn btn-light m-auto">Balance: {ethBalance} ETHER</p>
        </div>
        <div className="row my-4">
          <button className="col-3 btn btn-danger" onClick={handleClickSend}>send</button>
          <input
            className="col-9"
            id="sendValue"
            type="text"
            placeholder="ether ammount"
            value={sendValue}
            onChange={(event) => dispatch({type: 'CHANGE_SEND_VALUE', payload: event.target.value})}
          />
        </div>
    </div>
  );
};

export default Account;
