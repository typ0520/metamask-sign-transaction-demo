import React from 'react';
import './App.css';

import Web3 from 'web3';

var Tx = require('ethereumjs-tx');

function buf2hex(buffer) {
  return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
}

function fromHexString(hexString) {
  return new Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
}

class App extends React.Component {
  state = {

  }

  componentDidMount() {
    let provider
    if (window.web3) {
      provider = window.web3.currentProvider
      window.ethereum.enable();
    }
    this.state.web3 = new Web3(provider, null, { transactionConfirmationBlocks: 1 })
    this.getAccounts();
  }

  getAccounts = () => {
    this.state.web3.eth.getAccounts((err, accounts) => {
      if (err) return console.error(err)
      var address = accounts[0]
      console.log('address: ' + address);
      if (this.state.userAddress === address) return
      this.setState({
        userAddress: address,
      })
    })
  }

  transaction = async () => {
    const web3 = this.state.web3;
    const from = this.state.userAddress;
    //const nonce = await this.state.web3.eth.getTransactionCount(from);
    const nonce = 148;

    const rawTx =  {
      nonce,
      gasPrice: web3.utils.toHex(web3.utils.toWei('100', 'gwei')),
      gasLimit: web3.utils.toHex(Number(21000)),
      to: '0x4611F8A6988C5B96990c74d5F8FeC69e26DC650C',
      value: web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
      data: '',

      from, 
    };
    var tx = new Tx(rawTx);
    var hash = '0x' + buf2hex(tx.hash(false));
    console.log('hash: ' + hash);

    web3.eth.sign(hash, from, function (err, sign) {
      if (err) return console.error(err)
      console.log('SIGNED:' + sign);

      var r = sign.substring(2, 66);
      var s = sign.substring(66, 66 + 64);
      var v = sign.substring(66 + 64);
      console.log('r: ' + r);
      console.log('s: ' + s);
      console.log('v: ' + v);
  
      var sig = {
        r: '0x' + r,
        s: '0x' + s,
        v: parseInt(v, 16),
      }
  
      console.log('sig.r: ' + sig.r);
      console.log('sig.s: ' + sig.s);
      console.log('sig.v: ' + sig.v);
  
      Object.assign(tx, sig);
  
      var serializedTx = tx.serialize();
      console.log('0x' + serializedTx.toString('hex'));
      alert('0x' + serializedTx.toString('hex'));
    });
  }

  login = async () => {
    if (this.state.web3) {
      let chainID = 4;
      let message = "Access zkSync account.\n\nOnly sign this message for a trusted client!";
      if (chainID !== 1) {
          message += `\nChain ID: ${chainID}.`;
      }
      console.log(message);

      this.state.web3.eth.personal.sign(message, this.state.userAddress).then((res) => {
        console.log(res);
        alert(res);
      });
    }
  }

  ethSign = async () => {
    const web3 = this.state.web3;
    const from = this.state.userAddress;
    const nonce = await this.state.web3.eth.getTransactionCount(from);

    web3.eth.sign('0xca4e24c83c533d3cb4099895fd40f81f3cc0bb6751ba4a3d4de24a9d667d718c', from, function (err, result) {
      if (err) return console.error(err)
      alert(result);
      console.log('SIGNED:' + result)
    });
  }

  render() {
    return (
      <div className="App">
        <p>当前账户: {this.state.userAddress}</p>

        <p>

        <button onClick={e=> this.transaction()}>transaction</button>
        <p></p>

        <button onClick={e=> this.login()}>Login</button>
        <p></p>
        <button onClick={e=> this.ethSign()}>ethSign</button>
        <p></p>

        </p>
      </div>
    );
  }
}

export default App;