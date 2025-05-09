"use client"
import { FirebaseProvider } from "@/auth/firebase";
import React from 'react'

const Provider=({children})=>{
    return (
        <FirebaseProvider>{children}</FirebaseProvider>
    )
}
export default Provider