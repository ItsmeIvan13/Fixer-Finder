import React, { useEffect } from 'react'
import { auth } from "../firebase"
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth';


function Dashboard() {

    const user = auth.currentUser
    const navigate = useNavigate()

    const logout = async () => {
        try{ 
            auth.signOut()
        }
        catch( e ){
            console.log(e)
        }
    }
    useEffect( () => {
        onAuthStateChanged(auth, (user) => {
            if(user){
                // User just logged in
                navigate("/dashboard")
            }
            else{
                // Probably not gonna be used pero just in case
                navigate("/")
            }
        })
    }, [navigate])

    if(user){

    }
    else{
        navigate("/")
    }


    return (
        // SET TO EMAIL MUNA YUNG SA USERNAME, SETTUP KO PA MUNA YUNG NEED KASI SABAY DAPAT SA REGISTRATION
        <>
            <div>Welcome { user.email }</div>
            <button onClick={ logout }>
                Logout
            </button>
        </>
    )
}


export default Dashboard