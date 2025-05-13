"use client"

import Image from 'next/image'
import React, {useState,useEffect} from 'react'
import { createWorker } from 'tesseract.js'



export const IDcardinput = (props) => {
    const [isVerified,setVerified]=useState(false)
    const [loader,setLoader]=useState(false)
    const [image,setImage]=useState(null)
    const [imagefile,setImageFile]=useState(null)
    
    useEffect(()=>{
        if(isVerified){
            props.onVerified(true)
        }
    },[isVerified])
    useEffect(()=>{
        if(image){
            props.onUpload(image,imagefile)
        }
    },[image])

    async function filehandler(e) {
        const file = e.target.files[0];
        const url= URL.createObjectURL(file)
        setImage(url)
        setImageFile(file)
    }
      
     async function handleverify() {
        if(!image){
            alert("Upload an image first")
            return null;
        }
            setLoader(true)
            const worker = await createWorker('eng');
            
            (async () => {
                const { data: { text } } = await worker.recognize(image);
              
                
               if(text.includes("AKHILESH DAS GUPTA") || text.includes("INSTITUTE OF PROFESSIONAL STUDIES") || text.includes("PROFESSIONAL STUDIES")
            || text.includes("Akhilesh Das Gupta Institute of Technology & Management")|| text.includes("Institute of Technology & Management")|| text.includes("SHASTRI PARK")
        || text.includes("NEW DELHI-110053") || text.includes("Northern India Engineering") || text.includes("Engineering College")){
            setVerified(true)
           
        }
        else{
            alert("Please use a clear photo of a valid ID Card of ADGIPS only!")
        }
               
               
                await worker.terminate().then(()=>setLoader(false));
            })();
        }
        
  return (
    <div className='flex gap-4'>
    <input type="file" className='bg-color2 w-4/5 h-10 rounded-2xl cursor-pointer text-white p-1.5' accept='image/*,.pdf'onChange={filehandler}/>
    {loader ? (
        <Image src={"/loader.svg"} height={40} width={40} alt='loader'/>
    )
:
(
    isVerified ? (
        <h2 className='text-green-500 text-center content-center'>Verified</h2>
    )
    : (
         <button className='cursor-pointer text-black bg-white rounded-lg p-1 max-sm:p-0.5' onClick={handleverify}>Verify</button>
    )
   
)
}
    </div>
  )
}
