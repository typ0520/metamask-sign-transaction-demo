import React from 'react';
import './App.css';

import Web3 from 'web3';

var privateChainWeb3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"));

var Tx = require('ethereumjs-tx');
const sigUtil = require('eth-sig-util')
const QuoteFactory = require('./QuoteFactory.json').abi
const Hello = require('./Hello.json')
const helloContract = new privateChainWeb3.eth.Contract(Hello, '0x4611F8A6988C5B96990c74d5F8FeC69e26DC650C');

const quoteFactoryContract = new privateChainWeb3.eth.Contract(QuoteFactory, '0x4611F8A6988C5B96990c74d5F8FeC69e26DC650C');

function buf2hex(buffer) {
  return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
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
    const nonce = await this.state.web3.eth.getTransactionCount(from);
    //const nonce = 149;

    const rawTx = {
      nonce,
      gasPrice: web3.utils.toHex(web3.utils.toWei('100', 'gwei')),
      gasLimit: web3.utils.toHex(Number(21000)),
      to: '0x4611F8A6988C5B96990c74d5F8FeC69e26DC650C',
      value: web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
      data: '',

      from,
      //eip155
      //chainId: 3,
    };
    var tx = new Tx(rawTx);
    var hash = '0x' + buf2hex(tx.hash(false));
    console.log('hash: ' + hash);

    web3.eth.sign(hash, from, function (err, sign) {
      if (err) return console.error(err)
      console.log('transaction SIGNED: ' + sign);

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

      if (tx._chainId > 0) {
        sig.v += tx._chainId * 2 + 8;
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

  transaction2 = async () => {    
    const web3 = this.state.web3;
    const contractMethodPromiss = helloContract.methods.setName('hehe');
    const from = this.state.userAddress;
    const contractAddress = '0xEaa3e797565Cb1b5576947E9c0943b145ce8F8E1';
    const value = 0

    const nonce = await privateChainWeb3.eth.getTransactionCount(from);
    const gasPrice = await privateChainWeb3.eth.getGasPrice();

    const dataField = await contractMethodPromiss.encodeABI();

    var quantity = await web3.eth.estimateGas({
      from,
    })

    console.log(`nonce: ${nonce}, gasPrice: ${gasPrice}, gasLimit: ${quantity}, from: ${from}, to: ${contractAddress}, value: ${value}, data: ${dataField}`)

    var rawTx = {
      nonce,
      gasPrice,
      gasLimit: quantity,
      from,
      to: '0x0De4e0878504576E19eA11bDD75C9bf05D2d8F49',
      value,
      data: dataField,
    };

    console.log(rawTx)

    var tx = new Tx(rawTx);
    var hash = '0x' + buf2hex(tx.hash(false));
    console.log('hash: ' + hash);

    //web3.eth.sendTransaction(rawTx)

    web3.eth.sign(hash, from, function (err, sign) {
      if (err) return console.error(err)
      console.log('transaction SIGNED: ' + sign);

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

      if (tx._chainId > 0) {
        sig.v += tx._chainId * 2 + 8;
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

  transaction3 = async () => {
    const web3 = this.state.web3;
    const from = this.state.userAddress;
    const nonce = await this.state.web3.eth.getTransactionCount(from);
    //const nonce = 149;

    const rawTx = {
      nonce,
      gasPrice: web3.utils.toHex(web3.utils.toWei('100', 'gwei')),
      gasLimit: web3.utils.toHex(Number(21000)),
      to: '0x87D044b7AA29152d5cECAfec5D47451099B1c961',
      value: web3.utils.toHex(web3.utils.toWei('0.01', 'ether')),
      data: '',

      from,
      //eip155
      //chainId: 3,
    };
    var tx = new Tx(rawTx);
    var hash = '0x' + buf2hex(tx.hash(false));
    console.log('hash: ' + hash);

    web3.eth.sign(hash, from, function (err, sign) {
      if (err) return console.error(err)
      console.log('transaction SIGNED: ' + sign);

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

      if (tx._chainId > 0) {
        sig.v += tx._chainId * 2 + 8;
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

    web3.eth.sign('0xb7d24532eba7a569a0c2927f4903f89b6d00f4ed78879e9b5b6c646b5f56b03d', from, function (err, result) {
      if (err) return console.error(err)
      console.log('ethSign SIGNED:' + result)
      alert(result);
    });
  }

  signTypedData = async () => {
    const web3 = this.state.web3;
    const from = this.state.userAddress;
    const nonce = await this.state.web3.eth.getTransactionCount(from);
    //const nonce = 149;

    const rawTx = {
      nonce,
      gasPrice: web3.utils.toHex(web3.utils.toWei('100', 'gwei')),
      gasLimit: web3.utils.toHex(Number(21000)),
      to: '0x4611F8A6988C5B96990c74d5F8FeC69e26DC650C',
      value: web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
      data: '',

      from,
      //eip155
      //chainId: 3,
    };

    console.log(rawTx);

    var tx = new Tx(rawTx);
    var hash = '0x' + buf2hex(tx.hash(false));
    console.log('hash: ' + hash);

    const msgParams = [
      {
        type: 'string',      // Any valid solidity type
        name: 'nonce',     // Any string label you want
        value: rawTx.nonce.toString() // The value to sign
      },
      {
        type: 'string',      // Any valid solidity type
        name: 'gasPrice',     // Any string label you want
        value: rawTx.gasPrice.toString() // The value to sign
      },
      {
        type: 'string',      // Any valid solidity type
        name: 'gasLimit',     // Any string label you want
        value: rawTx.gasLimit.toString() // The value to sign
      },
      {
        type: 'string',      // Any valid solidity type
        name: 'to',     // Any string label you want
        value: rawTx.to.toString() // The value to sign
      },
      {
        type: 'string',      // Any valid solidity type
        name: 'value',     // Any string label you want
        value: rawTx.value.toString() // The value to sign
      },
      {
        type: 'string',      // Any valid solidity type
        name: 'data',     // Any string label you want
        value: rawTx.data.toString() // The value to sign
      },
    ]

    web3.currentProvider.sendAsync({
      method: 'eth_signTypedData',
      params: [msgParams, from],
      from: from,
    }, function (err, result) {
      if (err) return console.error(err)
      if (result.error) {
        return console.error(result.error.message)
      }
      var sign = result.result;
      console.log('signTypedData SIGNED: ' + result.result);

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

      if (tx._chainId > 0) {
        sig.v += tx._chainId * 2 + 8;
      }

      console.log('sig.r: ' + sig.r);
      console.log('sig.s: ' + sig.s);
      console.log('sig.v: ' + sig.v);

      Object.assign(tx, sig);

      var serializedTx = tx.serialize();
      console.log('0x' + serializedTx.toString('hex'));
      alert('0x' + serializedTx.toString('hex'));
    })
  }

  render() {
    return (
      <div className="App">
        <p>当前账户: {this.state.userAddress}</p>

        <p>
          <button onClick={e => this.login()}>Login</button>
          <p></p>
          <button onClick={e => this.transaction()}>transaction</button>
          <p></p>
          <button onClick={e => this.transaction2()}>transaction2</button>
          <p></p>
          <button onClick={e => this.transaction3()}>transaction3</button>
          <p></p>
          <button onClick={e=> this.ethSign()}>ethSign</button>
          <p></p>
          <button onClick={e => this.signTypedData()}>signTypedData</button>
          <p></p>
        </p>
      </div>
    );
  }
}

export default App;