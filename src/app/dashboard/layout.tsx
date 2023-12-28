"use client";

import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UserResponse{
    user: string | null;
    error: AxiosError | null;
}
const DashboardLayout = ({children}:{children: React.ReactNode}) => {

    const router = useRouter();
    const [success, setSuccess] = useState(false);
    const [userData, setUserData] = useState<any>();

    const logout = async ()=>{
        const {data} = await axios.get("/api/auth/logout");
        if(data){
            router.push("/");
            return;
        }
    }
    const checkAuth = async ()=>{
        const {user, error} = await getUserProfile();
        console.log(user);
        if(error){
            router.push("/");
            return;
        }
        setUserData(user);
        setSuccess(true);
    }
    useEffect(()=>{
        checkAuth();
    }, []);
 
    if(!success){
        return <p>Loading...</p>
    }
    return (
        <div>
            <header>
            <button onClick={()=>logout()} className="p-2 bg-orange-600 text-white w-fit rounded" type="submit">Logout</button>
            Hello {userData.user.name} | {userData.user.email} <br/>
            </header>
            {children}
        </div>
      )
}

async function getUserProfile(): Promise<UserResponse> {
    
    try {
        const {data} = await axios.get("/api/auth/profile");
        return {
            user: data,
            error: null
        }
    } catch (error) {
        const err = error as AxiosError;
        return {
            user: null,
            error: err
        }
    }
}

export default DashboardLayout