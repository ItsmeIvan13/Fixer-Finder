import logo from './img/fixer_finder_logo.png'
import { auth, db } from "../firebase"
import { useState, useEffect } from 'react'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "firebase/auth"
import { useNavigate } from 'react-router-dom'
import { setDoc, doc, getDoc } from "firebase/firestore"


function SignUpFixer() {

    const [registerEmail, setRegisterEmail] = useState("")
    const [registerFirstName, setRegisterFirstName] = useState("")
    const [registerLastName, setRegisterLastName] = useState("")
    const [registerPassword, setregisterPassword] = useState("")
    const navigate = useNavigate()
    
    const register = async (e) => {
        e.preventDefault()
        try{
            createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            ).then( async (response) => {
                await signInWithEmailAndPassword(
                    auth,
                    registerEmail,
                    registerPassword
                ).then( async (anotherResponse) => {
                    await setDoc( doc(db, "users", auth.currentUser.uid ), {
                        FirstName: registerFirstName,
                        Lastname: registerLastName,
                        AccountType: "Fixer",
                        UID: auth.currentUser.uid
                    })
                })
            })
        }catch(e){
            console.log(e)
        }
    }
    

    useEffect( () => {
        onAuthStateChanged(auth, async (user) => {
            if(user){
                // User just logged in
                navigate("/dashboard")
            }
        })
    }, [navigate])

    return ( 
        <div className='container mx-auto p-3 flex flex-col justify-center items-center'>
            <img src={logo} className='w-28' alt='Fixer_Finder'/>

            <h1 className='font-bold text-4xl text-black font-sans pt-6'>Sign up <span className='text-primary'>Fixer</span></h1>

            <div className='py-3 space-y-3 w-full pt-20'>
                <input 
                    type='text' 
                    className='w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 ' 
                    placeholder='First name'
                    onChange={ (event) => {
                        setRegisterFirstName(event.currentTarget.value)
                    }}
                />
                <input 
                    type='text' 
                    className='w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 ' 
                    placeholder='Last name'
                    onChange={ (event) => {
                        setRegisterLastName(event.currentTarget.value)
                    }}
                />
                <input 
                    type='email' 
                    className='w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 ' 
                    placeholder='Email'
                    onChange={ (event) => {
                        setRegisterEmail(event.currentTarget.value)
                    }}
                />
                <input 
                    type='text' 
                    className='w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 ' 
                    placeholder='Password (8 or more characters)'
                    onChange={ (event) => {
                        setregisterPassword(event.currentTarget.value)
                    }}
                />
                
            
                <label className="flex flex-row justify-start items-start p-1">
                <input type="checkbox" className=" h-3 w-3 mt-1 focus:outline-green-500"/>
                <span className=" ml-2 text-gray-700 text-sm">Yes I understand and agree to the <span className='text-primary'>Fixer Finder Terms of Service,</span> including the <span className='text-primary'>User Agreement and Privacy Policy.</span></span>
                </label>
                
                <button onClick={ register } className='w-full px-3 py-2 bg-primary text-white hover:bg-lime-600 cursor-pointer rounded-full font-md'>
                    Create my Account
                </button>
            </div>
        </div>
     );
}

export default SignUpFixer;