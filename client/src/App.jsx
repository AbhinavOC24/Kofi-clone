import "./index.css";
import ghub from "./assets/ghub.jpg";
import { useState } from "react";
import { ethers } from "ethers";

function App() {
  const [wallet, setWallet] = useState(false); // Track wallet connection status
  const [amt, setAmt] = useState(""); // Store amount to send
  const [txStatus, setTxStatus] = useState(""); // Track transaction status

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const selectedAccount = accounts[0];
        console.log(selectedAccount);
        const signer = await provider.getSigner();
        setWallet(true);

        const kofiAdd = "0x2882DEAad7CFfDb0DC437783B1bf2246aE387125";
        const kofiABI = ["function sentToOwner() public payable"];
        const kofiContract = new ethers.Contract(kofiAdd, kofiABI, signer);

        if (!amt || amt <= 0) {
          alert("Please enter a non-zero amount");
          return;
        }

        setTxStatus("Sending transaction...");
        const tx = await kofiContract.sentToOwner({
          value: ethers.parseEther(amt),
        });

        console.log("Transaction hash:", tx.hash);
        setTxStatus("Transaction sent! Waiting for confirmation...");
        await tx.wait();
        setTxStatus("Transaction confirmed!");
        console.log("Transaction confirmed!");
      } else {
        alert(
          "Please install MetaMask or a Web3-compatible browser extension."
        );
      }
    } catch (e) {
      console.log("Failed to connect to wallet", e);
    }
  };

  return (
    <div className="bg-black h-screen flex justify-center items-center">
      <div className="outtercircle border border-[#404040] w-[340px] h-[447px] flex flex-col items-center justify-center">
        <div className="h-[212px] w-[212px] rounded-full border-[1px] border-[#404040] flex items-center justify-center">
          <img
            src={ghub}
            alt="Profile"
            className="h-[188px] w-[188px] rounded-full object-cover"
          />
        </div>
        <p className="text-white text-center text-xl font-semibold mt-[12px]">
          Abhinav Chauhan
        </p>
        <input
          type="text"
          placeholder="Enter the amount"
          value={amt}
          onChange={(e) => setAmt(e.target.value)}
          className="bg-black border border-[#404040] rounded-[12px] mt-[30px] w-[262px] h-[35px] text-white focus:outline-none pl-3 hover:border-white transition-all duration-17\0 delay-150"
        />
        {wallet ? (
          <button
            className="text-white mt-5 border rounded-[12px] px-8 py-2 border-[#404040]"
            onClick={connectWallet}
          >
            Send Tip
          </button>
        ) : (
          <button
            onClick={connectWallet}
            className="text-white mt-5 border rounded-[12px] px-8 py-2 font-light border-[#404040] hover:border-white transition-all duration-200 delay-150"
          >
            Connect Wallet
          </button>
        )}
        {txStatus && <p className="text-white mt-3 text-center">{txStatus}</p>}
      </div>
    </div>
  );
}

export default App;
