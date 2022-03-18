import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "../../contracts/WavePortal.json";

const EthDApp = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [messageValue, setMessageValue] = useState("");
  const [allWaves, setAllWaves] = useState<any[]>([]);
  console.log("currentAccount:", currentAccount);
  const contractAddress: string = process.env.NEXT_PUBLIC_WAVE_PORTAL_CONTRACT_ADDRESS as string;
  console.log("contractAddress:", contractAddress);
  const contractABI = abi.abi;

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window as any;
      if (!ethereum) {
        console.log("Ethereum object not found. Make sure you have metamask!");
        return;
      } else {
        console.log("Ethereum object is found.", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });
      console.log(accounts);
      if (accounts.length === 0) {
        console.log("No authorized account found");
        return;
      }
      const account = accounts[0];
      console.log("An authorized account found.", account);
      setCurrentAccount(account);
      getAllWaves();
    } catch (e) {
      console.log(e);
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window as any;
      if (!ethereum) {
        alert("Get Metamask");
        return;
      }
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      console.log("Connected: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (e) {
      console.log(e);
    }
  }

  const wave = async () => {
    try {
      const { ethereum } = window as any;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
        let count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count is", count.toNumber());
        console.log("Signer:", signer);

        const waveTxn = await wavePortalContract.wave(messageValue, { gasLimit: 300000 });
        console.log("Mining...", waveTxn.hash);
        await waveTxn.wait();
        console.log("Mined --", waveTxn.hash);
        count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count is", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (e) {
      console.log(e);
    }
  }

  const getAllWaves = async () => {
    const { ethereum } = window as any;

    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const singer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, singer);
        const data = await wavePortalContract.getAllWaves();
        console.log(data);
        const waves = data.map((wave: { waver: any; timestamp: number; message: any; winning: any; }) => {
          return {
            address: wave.waver,
            timestamp: new Date(wave.timestamp * 1000),
            message: wave.message,
            winning: wave.winning,
          };
        });
        setAllWaves(waves);
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    const { ethereum } = window as any;
    let wavePortalContract: ethers.Contract;

    const onNewWave = (from: any, timestamp: number, message: any, winning: any) => {
      console.log("NewWave", from, timestamp, message, winning);
      setAllWaves(prevState => [
        ...prevState,
        {
          address: from,
          timestamp: new Date(timestamp * 1000),
          message: message,
          winning: winning,
        },
      ]);
    };
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const singer = provider.getSigner();

      wavePortalContract = new ethers.Contract(contractAddress, contractABI, singer);
      wavePortalContract.on("NewWave", onNewWave);
    }
    return () => {
      if (wavePortalContract) {
        wavePortalContract.off("NewWave", onNewWave);
      }
    };
  }, []);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="mt-16 w-full flex justify-center">
        <div className="flex flex-col justify-center">
          <div className="text-center text-4xl font-semibold">
            <span role="img" aria-label="hand-wave">👋</span> WELCOME!
          </div>

          <div className="mt-4 text-center text-gray-600">
            イーサリアムウォレットを接続して、メッセージを作成したら、<span role="img" aria-label="hand-wave">👋</span>を送ってください<span role="img" aria-label="shine">✨</span>
          </div>

          {currentAccount && (
            <button className="mt-4 p-2 border-0 bg-gray-100 rounded-md" onClick={wave}>
              Wave at Me
            </button>
          )}

          {!currentAccount && (
            <button className="mt-4 p-2 border-0 bg-gray-100 rounded-md" onClick={connectWallet}>
              Connect to Wallet
            </button>
          )}

          {currentAccount && (
            <textarea name="messageArea"
              placeholder="Enter a message"
              className="mt-4 p-2 text-gray-600 border border-solid border-gray-300 rounded"
              id="message"
              value={messageValue}
              onChange={e => setMessageValue(e.target.value)}
            />
          )}

          {currentAccount && (
            allWaves.slice(0).reverse().map((wave, index) => {
              return (
                <div key={index} className="mt-4 px-6 py-3 bg-gray-100 rounded-md">
                  <div>Address: {wave.address}</div>
                  <div>Time: {wave.timestamp.toString()}</div>
                  <div>Message: {wave.message}</div>
                  <div>Winning: {ethers.utils.formatEther(wave.winning)} ether</div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default EthDApp;
