import logo from './img/fixer_finder_logo.png'
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "../firebase"
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { useState, useEffect } from 'react';

function HomePage() {
    
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const login = async () => {
        try{
            const user = await signInWithEmailAndPassword(
                auth, 
                username, 
                password
            )
        }catch (e) {
            console.log(e)
        }
    }
    
    useEffect( () => {
        onAuthStateChanged(auth, (user) => {
            if(user){
                // User just logged in
                navigate("/dashboard")
            }
        })
    }, [navigate])

    return ( 
        <div className='container mx-auto p-3 flex flex-col justify-center items-center'>
            <img src={logo} alt='fixer_finder' className="w-1/2 "/>
            <div className='flex flex-row gap-2'>
            <h1 className='font-bold text-4xl text-black font-sans cursor-pointer text-primary'>Fixer </h1>
            
             <span className='font-bold text-4xl text-black font-sans cursor-pointer' >Finder</span>
        </div>



        <div className='py-3 space-y-3 w-full pt-20'>
            <input 
                onChange={ (event) => {
                    setUsername(event.currentTarget.value)
                }} 
                type='text' 
                className='w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 '
                placeholder='Username'
            />
            <input 
                onChange={ (event) => {
                    setPassword(event.currentTarget.value)
                }} 
                type='password' 
                className='w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 '
                placeholder='Password'
            />
            <button 
                onClick={ (event) => {
                    login()
                }}  
                type="button"
                text="Login"
                className='w-full px-3 py-2 bg-primary text-white hover:bg-lime-600 cursor-pointer'
            >
                Log In
            </button>
        </div>

        <div className='flex justify-between gap-9'>
            <Link to="/accounts" className='font-bold text-blue-500 text-sm cursor-pointer'>Sign up</Link>
            <Link to="/forgotpassword" className='font-bold text-blue-500 text-sm'>Forgot Password?</Link>
        </div>
        </div>
     );
}

export default HomePage;