import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {ConnectKitButton} from "connectkit"
import ConfettiExplosion from 'react-confetti-explosion';
import { useAccount } from "wagmi"
import Image from 'next/image';
import fire from "../public/5ire.jpg"
const axios = require("axios");


function Buttons(){
    const [point1,setPoint1] = useState("")
    const [point2,setPoint2] = useState("")
    const [point3,setPoint3] = useState("")
    const [point4,setPoint4] = useState("")
    const [point5,setPoint5] = useState("")
    const [point6,setPoint6] = useState("")
    const [point7,setPoint7] = useState("")
    const [point8,setPoint8] = useState("")
    const [isShown, setIsShown] = useState("");
    const [isExploding, setIsExploding] = useState(false);
    const {address, isConnected} = useAccount();
    const adddata = {
        "walletAddress":address,
        "checkpointNumber":2
    }

    async function mintToken(){
    try {
       const response = await axios({
            method: 'post',
            url: 'https://nft-hunt-be.up.railway.app/update-checkpoint',
            data:adddata,
            headers:{
                Authorization : `Bearer ${process.env.NEXT_PUBLIC_APITOKEN}` 
            }
        })
        console.log(response)
        setIsExploding(true)
        setIsShown("hide")
        toast.success("Token Claimed")

        
    } catch (error) {
        console.log(error)
        toast.error("Already Claimed this Check Point")
    }  
    
    try {
        const userdata = await axios 
      .get(
        `https://nft-hunt-be.up.railway.app/get-user-data?walletAddress=${address}`,
        {
          headers:{
            Authorization:`Bearer ${process.env.NEXT_PUBLIC_APITOKEN}`
          }
        }
      )
      let getpoints = userdata.data.completedCheckpoints.sort(function(a, b){return a - b})
      console.log(userdata.data)
      for(let i=0;i<9;i++){
        switch(getpoints[i]){
            case 1:
                setPoint1("hide")
                break;
            case 2:
                setPoint2("hide")
                break;
            case 3:
                setPoint3("hide")
                break;
            case 4:
                setPoint4("hide")
                break;
            case 5:
                setPoint5("hide")
                break;
            case 6:
                setPoint6("hide")
                break;
            case 7:
                setPoint7("hide")
                break;
            case 8:
                setPoint8("hide")
                break;
        }
      }
        
    } catch (err) {
        console.log(err)
    }
}
    return(
        <div className="flex justify-center my-24 items-center flex-col">
            <Toaster/>
         <ConnectKitButton/>
         { isConnected && (
             <button onClick={mintToken} className="rounded-full border-double ring-2 mt-24 mb-10 md:mb-15 ring-cyan-300 bg-cyan-700  bg-opacity-40 lg:text-2l xl:text-4xl p-3 hover:scale-110 border-2 text-white">Mint Token</button>
             )
            }
            {
                isExploding && (
                    <ConfettiExplosion/>
                )
            }
             <div className="image-container w-[350px] md:w-[450px] ">
             <Image src={fire} alt="Image"/>
        <div className={`overlay overlay-1 ${point1}`}></div>
        <div className={`overlay overlay-2 ${point2}`}></div>
        <div className={`overlay overlay-3 ${point3}`}></div>
        <div className={`overlay overlay-4 ${point4}`}></div>
        <div className={`overlay overlay-5 ${point5}`}></div>
        <div className={`overlay overlay-6 ${point6}`}></div>
        <div className={`overlay overlay-7 ${point7}`}></div>
        <div className={`overlay overlay-8 ${point8}`}></div>
    </div> 
    </div>
        )
}

export default Buttons;
