import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { Navigate, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { slide as Menu, CrossIcon } from "react-burger-menu"; //para sa slide menu

import { CgMenuLeftAlt } from "react-icons/cg";
import { MdPersonSearch } from "react-icons/md";
import { BsPersonCircle, BsFillArrowRightCircleFill } from "react-icons/bs";

function Dashboard() {
	const user = auth.currentUser;
	const navigate = useNavigate();

	const logout = async () => {
		try {
			auth.signOut();
		} catch (e) {
			console.log(e);
		}
	};
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (!user) {
				// User just logged Out
				navigate("/");
            }
		});
	}, [navigate]);


	const [isOpen, setIsOpen] = useState(false);
    if(auth.currentUser)
        return (
            // SET TO EMAIL MUNA YUNG SA USERNAME, SETTUP KO PA MUNA YUNG NEED KASI SABAY DAPAT SA REGISTRATION

            <>
                {/* ICON NG SIDEBAR*/}

                <button onClick={() => setIsOpen(true)} className="bm-burger-button p-3">
                    <CgMenuLeftAlt className="w-8 h-16" />
                </button>

                {/* SIDE BAR MENU */}
                <Menu
                    isOpen={isOpen}
                    onStateChange={(state) => setIsOpen(state.isOpen)}
                    className="flex flex-col justify-center items-center pt-32 bg-gray-200"
                >
                    <h1>Welcome! {auth.currentUser.email}</h1>
                    <div className="py-6">
                        <a id="home" className="" href="">
                            Home
                        </a>
                    </div>
                    <div className="py-6">
                        <a id="about" className="" href="">
                            About
                        </a>
                    </div>
                    <div className="py-6">
                        <a id="contact" className="" href="">
                            Contact
                        </a>
                    </div>
                    <div className="py-6">
                        <a className="" href="">
                            Settings
                        </a>
                    </div>

                    <div className="pt-3">
                        <button onClick={logout}>Logout</button>
                    </div>
                </Menu>

                <div className="container mx-auto p-3">
                    {/* SEARCH BAR INPUT*/}
                    <form className="w-1/2 ml-10 mt-2 flex gap-2">
                        <input
                            className="1/2 px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 "
                            placeholder="Search fixer's"
                        />

                        {/* BUTTON NG SEARCH BAR*/}
                        <button>
                            <MdPersonSearch className="w-8 h-8 text-primary" />
                        </button>
                    </form>

                    <h1 className="pt-2 font-sans font-medium text-sm">Quick Access</h1>

                    {/* OVERFLOW SELECTION NG DIFFERENT FIXERS */}
                    <div className="py-3 flex px-2 gap-2 overflow-auto ">
                        <div className="py-2">
                            <a className="bg-primary text-white p-2 rounded-full px-6 text-sm font-medium ">
                                Painter
                            </a>
                        </div>
                        <div className="py-2">
                            <a className="bg-primary text-white p-2 rounded-full px-6 text-sm font-medium ">
                                Plumber
                            </a>
                        </div>

                        <div className="py-2">
                            <a className="bg-primary text-white p-2 rounded-full px-6 text-sm font-medium ">
                                Electrician
                            </a>
                        </div>

                        <div className="py-2 ">
                            <a className="bg-primary text-white p-2 rounded-full px-6 text-sm font-medium ">
                                Tiles
                            </a>
                        </div>

                        <div className="py-2">
                            <a className="bg-primary text-white p-2 rounded-full px-6 text-sm font-medium">
                                Roofer
                            </a>
                        </div>

                        <div className="py-2">
                            <a className="bg-primary text-white p-2 rounded-full px-6 text-sm font-medium">
                                Mason
                            </a>
                        </div>

                        <div className="py-2">
                            <a className="bg-primary text-white p-2 rounded-full px-6 text-sm font-medium">
                                Flooring
                            </a>
                        </div>

                        <div className="py-2">
                            <a className="bg-primary text-white p-2 rounded-full px-6 text-sm font-medium">
                                Concrete
                            </a>
                        </div>

                        <div className="py-2">
                            <a className="bg-primary text-white p-2 rounded-full px-6 text-sm font-medium">
                                Carpenter
                            </a>
                        </div>

                        <div className="py-2">
                            <a className="bg-primary text-white p-2 rounded-full px-6 text-sm font-medium">
                                Pipefitter
                            </a>
                        </div>
                    </div>

                    <h1 className="pt-9 font-sans font-medium text-sm">Top Fixers</h1>

                    {/* TOP FIXER*/}
                    <div className="flex flex-row justify-between items-center py-3 p-3 rounded-lg shadow-xl">
                        <BsPersonCircle className="w-8 h-12 text-primary" />

                        <div>
                            <h1 className="font-medium text-lg">John Doe</h1> {/* */}
                            <h1 className="text-sm pt-2">Field of expertise</h1>
                            <div className="flex flex-row gap-1 text-sm ">
                                <a className="bg-primary text-white p-1 rounded-full px-2 text-xs font-medium">
                                    Electrician
                                </a>
                                <a className="bg-primary text-white p-1 rounded-full px-2 text-xs font-medium">
                                    Mason
                                </a>
                                <a className="bg-primary text-white p-1 rounded-full px-3 text-xs font-medium">
                                    Roofer
                                </a>
                            </div>
                        </div>

                        <BsFillArrowRightCircleFill className="w-8 h-12 text-primary" />
                    </div>
                </div>
            </>
        )
    else{
        <Navigate replace to="/"/>
    }
}

export default Dashboard;
