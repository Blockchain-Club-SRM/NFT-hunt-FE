import toast, { Toaster } from "react-hot-toast";
import ConfettiExplosion from 'react-confetti-explosion';
import { ConnectKitButton } from "connectkit";
import { useState } from "react";
import { useAccount } from "wagmi";
const axios = require("axios");

function Buttons() {
  const [isExploding, setIsExploding] = useState(false);
  let winresult = "";
  const [click, setClick] = useState(false);
  const { address, isConnected } = useAccount();
  const [isEligible, setEligible] = useState(false);
 async function EligibilityCheck() {
  const response = await axios 
      .get(
        `https://nft-hunt-be.up.railway.app/get-user-status?walletAddress=${address}`,
        {
          headers:{
            Authorization:`Bearer ${process.env.NEXT_PUBLIC_APITOKEN}`
          }
        }
        
      )
        console.log(response.data.completed)
        setEligible(response.data.completed);
    setClick(true);
    response.data.completed
      ? toast.success("Claim your NFT") && setIsExploding(true)
      : toast.error("Go Scan all the QRs");
  }

  return (
    <div className="flex justify-center my-24 items-center flex-col">
      <Toaster />
      <ConnectKitButton />
      {isExploding && <ConfettiExplosion />}
      {isConnected && (
        <button
          onClick={EligibilityCheck}
          className="rounded-full border-double ring-2 my-24 ring-cyan-300 bg-cyan-700  bg-opacity-40 lg:text-2l xl:text-4xl p-3 hover:scale-110 border-2 text-white"
        >
          Check Eligibility
        </button>
      )}

      {click && 
      (

        isEligible ? (
          <div className="flex flex-col items-center">
          <h1 className="font-orbitron sm:text-2xl md:text-5xl lg:text-5xl  xl:text-6xl text-white">
            Congratulations! 🎉🥳
          </h1>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h1 className="font-orbitron sm:text-2xl md:text-5xl lg:text-5xl  xl:text-6xl text-white">
            Sorry 😕
          </h1>
          <h1 className="mt-3 font-orbitron sm:text-2xl md:text-5xl lg:text-5xl  xl:text-6xl text-white">
            Looks like you haven't claimed all tokens.
          </h1>
        </div>
          )
      )}
      
    </div>
  );
}

export default Buttons;
