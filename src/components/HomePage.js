import logo from "./img/fixer_finder_logo.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect } from "react"
import { doc, getDoc } from "firebase/firestore"
import { HiUser } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";

function HomePage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const login = async () => {
		try {
			await signInWithEmailAndPassword(auth, username, password);
		} catch (e) {
			console.log(e);
		}
	};

{/*  useEffect( () => {
		onAuthStateChanged(auth, async (user) => {
            if(user){
                sessionStorage.setItem("UID", user.uid)
                await getDoc(doc(db, "users", auth.currentUser.uid)).then( async (userInformation) => {
                    const finalData = (await (userInformation.data()))
                    if(finalData.AccountType === "Finder"){
                        // If Finder
                        navigate("/finder/dashboard")
                        return
                    }
                    else if(finalData.AccountType === "Fixer"){
                        // If Fixer
                        navigate("/fixer/dashboard")
                        return
                    }
                })
            }
		});

	}, [navigate]);
    */}	
    return (
        <div className="container mx-auto p-3 flex flex-col justify-center items-center">
            <img src={logo} alt="fixer_finder" className="w-1/2 " />
            <div className="flex flex-row gap-2">
                <h1 className="font-bold text-4xl text-black font-sans cursor-pointer text-primary">
                    Fixer{" "}
                </h1>

                <span className="font-bold text-4xl text-black font-sans cursor-pointer">
                    Finder
                </span>
            </div>

            <div className="py-3 space-y-3 w-full pt-20">
                <div className="relative">
   
                <input
                    onChange={(event) => {
                        setUsername(event.currentTarget.value);
                    }}
                    type="text"
                    className="w-full pl-8 px-3 py-2  text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 "
                    placeholder="Username"
                />
                <div className="absolute inset-y-0 left-1 flex items-center">
               <HiUser className="w-6 h-6 text-primary" />
                </div> 
                </div>

                <div className="relative">
                <input
                    onChange={(event) => {
                        setPassword(event.currentTarget.value);
                    }}
                    type="password"
                    className="w-full px-3 py-2 pl-8 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 "
                    placeholder="Password"
                />
                <div className="absolute inset-y-0 left-1 flex items-center">
                    <RiLockPasswordFill className="w-6 h-6 text-primary" />
                </div>
                </div>
                <button
                    onClick={(event) => {
                        login();
                    }}
                    type="button"
                    text="Login"
                    className="w-full px-3 py-2 bg-primary text-white hover:bg-lime-600 cursor-pointer"
                >
                    Log In
                </button>
            </div>

            <div className="flex justify-between gap-9">
                <Link
                    to="/accounts"
                    className="font-bold text-blue-500 text-sm cursor-pointer"
                >
                    Sign up
                </Link>
                <Link to="/forgotpassword" className="font-bold text-blue-500 text-sm">
                    Forgot Password?
                </Link>
            </div>
        </div>
    );
}

export default HomePage;
