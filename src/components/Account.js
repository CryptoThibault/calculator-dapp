import { useCalculator } from '../context/CalculatorContext'
import { ethers } from 'ethers'

function Account() {
  const { web3State, login, state, dispatch } = useCalculator()
  const { ethBalance, address, sendValue } = state

  const handleClickGetBalance = async () => {
    try {
      const balance = await web3State.provider.getBalance(address)
      dispatch('CHANGE_ETH_BALANCE', ethers.utils.formatEther(balance))
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
    <div>
    <p>MetaMask installed: {web3State.isMetaMask ? 'yes' : 'no'}</p>
      <p>Web3: {web3State.isWeb3 ? 'injected' : 'no-injected'}</p>
      <p>logged: {web3State.isLogged ? 'yes' : 'no'}</p>
      {!web3State.isLogged && (
        <>
          <button onClick={login}>login</button>
        </>
      )}
      <p>Network id: {web3State.chainId}</p>
      <p>Network name: {web3State.networkName}</p>
      <p>account: {web3State.account}</p>
      <p>Balance: {web3State.balance}</p>
      <label htmlFor="balanceOf">Balance of:</label>
      <input
        id="balanceOf"
        type="text"
        value={address}
        placeholder="ethereum address"
        onChange={(event) => dispatch('CHANGE_ADDRESS', event.target.value)}
      />
      <button onClick={handleClickGetBalance}>get balance</button>
      <p>
        Balance of {address}: {ethBalance} ETHER
      </p>
      <label htmlFor="eth2send">send to: {address}</label>
      <input
        id="sendValue"
        type="text"
        placeholder="ether ammount"
        value={sendValue}
        onChange={(event) => dispatch('CHANGE_SEND_VALUE', event.target.value)}
      />
      <button onClick={handleClickSend}>send</button>
    </div>
  );
};

export default Account;
