import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { Navigate, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { slide as Menu, CrossIcon } from "react-burger-menu"; //para sa slide menu

import { CgMenuLeftAlt } from "react-icons/cg";
import { MdPersonSearch, MdManageAccounts } from "react-icons/md";
import {
	BsPersonCircle,
	BsFillArrowRightCircleFill,
	BiHomeAlt,
	BsFillClipboard2CheckFill,
} from "react-icons/bs";
import { BiHomeAlt2, BiLogOut } from "react-icons/bi";
import { collection, query, where, getDocs, getDoc, doc, documentId, addDoc } from "firebase/firestore";
import { TbCurrencyPeso, TbX } from "react-icons/tb";
import Swal from "sweetalert2";

function DashboardFinder() {
	const user = auth.currentUser;
	const navigate = useNavigate();
    
    const [fixerViewActive, setFixerViewActive] = useState(false)
    const [activeFixer, setActiveFixer] = useState("")

	const [fixers, setFixers] = useState([]);
    const [displayName, setDisplayName] = useState("")

	const logout = async () => {
		try {
			auth.signOut();
		} catch (e) {
			console.log(e);
		}
	};

	const loadFixers = async (specialty) => {
		setFixers([]);
		await getDocs(
			query(collection(db, "users"), where("AccountType", "==", "Fixer"))
		).then(async (snapShot) => {
			snapShot.forEach(async (document) => {
				if (!document.empty) {
					let data = await document.data();
                    data.id = document.id
                    if(specialty && data.skills.includes(specialty)){
                        setFixers((previous) => [...previous, data]);
                        return
                    }else{
                        setFixers((previous) => [...previous, data]);
                    }
				}
			});
		});
	};

    
	const fetchUserDetails = async () => {
		await getDoc(doc(db, "users", auth.currentUser.uid)).then((response) => {
			const finalData = response.data();
			setDisplayName(finalData.FirstName + " " + finalData.Lastname);
		});
	};

	const FixerBanner = (props) => {
		return (
			<>
				<div className="flex flex-row justify-between items-center py-3 p-3 rounded-lg shadow-xl">
					<img src={ props.props.profilePicture } className="w-12 h-12 text-primary" />

					<div> 
						<h1 className="font-medium text-lg">{ props.props.FirstName } { props.props.Lastname}</h1> {/* */}
						<h1 className="text-sm pt-2">Field of expertise</h1>
						<div className="flex flex-row gap-1 text-sm ">
                            {
                                props.props.skills &&
                                props.props.skills.map( (element, index) => {
                                    return <>
                                        <div className="bg-primary text-white p-1 rounded-full px-2 text-xs font-medium">
                                            { element }
                                        </div>
                                    </>
                                })
                            }
						</div>
					</div>

					<button 
                        type="button"
                        value={ props.props.id }
                        onClick={ event => {
                            setActiveFixer(event.currentTarget.value)
                            setFixerViewActive(true)
                        }}
                    >
						<BsFillArrowRightCircleFill className="w-8 h-12 text-primary"/>
					</button>
				</div>
			</>
		)
	}

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (!user) {
				// User just logged Out
				navigate("/");
			}
            fetchUserDetails()
		});
        loadFixers("Plumber")
	}, []);


    
    const FixerView = ( props ) => {

        const [userDisplayName, setUserDisplayName] = useState("");
        const [userImage, setUserImage] = useState("")
        const [firstname, setFirstname] = useState("")
        const [lastname, setLastname] = useState("")
        const [middlename, setMiddlename] = useState("")
        const [title, setTitle] = useState("")
        const [rate, setRate] = useState("")
        const [overview, setOverview] = useState("")
        const [certification, setCertification] = useState([])
        const [experience, setExperience] = useState([])
        const [contactNo, setContactNo] = useState("")
        const [phoneNo, setPhoneNo] = useState("")

        const loadDetails = async (  ) => {
            await getDoc( doc(db, "users", props.id) ).then( (response) => {
                const finalData = response.data();
                setUserDisplayName(finalData.FirsNname + " " + finalData.Lastname)
                setUserImage(finalData.profilePicture)
                setFirstname(finalData.FirstName)
                setLastname(finalData.Lastname + " " + (finalData.Suffix == "N/A" ? "" : finalData.Suffix))
                setMiddlename(finalData.MiddleName)
                setTitle(finalData.Title)
                setOverview(finalData.Overview)
                setRate(finalData.Rate)
                setCertification(finalData.certification)
                setExperience(finalData.experience)
                setPhoneNo(finalData.TelephoneNo)
                setContactNo(finalData.ContactNo)
            })
        }

        useEffect( (  ) => {
            loadDetails()
        })
        const sendMessage = async (to, message) => {
            await addDoc(collection(db, "messages"), {
                message: message,
                to: to,
                from: auth.currentUser.uid,
                datetime: new Date(),
            });
        };

        return <>
            <div className="rounded rounded-4 border-solid border-2 mx-5 my-5 absolute top-0 left-0 right-0 bg-slate-200">
                <div className="container mx-auto p-3">
                    <div className="flex-items-center justify-end px-5 py-5 col-2"
                        onClick={ event => props.setter(false) }
                    >
                        <button className="bg-primary font-sans text-white px-6 p-2 hover:bg-green-500"
                            value={ props.id }
                            onClick={ event => {
                                Swal.fire({
                                    title: "Are you sure you want to hire this fixer?",
                                    icon: "info",
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "Confirm",
                                }).then( async (result) => {
                                    if (result.isConfirmed) {
                                        await sendMessage(event.target.value , "Hello").then( response => {
                                            Swal.fire({
                                                title: "You are now connected",
                                                icon: "success"
                                            })
                                        })
                                    }
                                });
                            }}
                        >
                            Connect
                        </button>
                        <button className="float-right">
                            <TbX className="w-6 h-6 text-primary" />
                        </button>
                    </div>
                    <div className="flex items-center justify-center flex-col pb-3  my-5">
                        <div className="relative w-48 h-48 rounded-full overflow-hidden">
                            <img
                                src={ userImage === "" ? "https://via.placeholder.com/300x300" : userImage }
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-center col-3 mx-5">
                        <div className="flex flex-col">
                            <label className="font-medium">
                                Last name 
                            </label>
                            <input readOnly className="w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3" value={ lastname } />
                        </div>
                        <div className="flex flex-col mx-5" >
                            <label className="font-medium">
                                First Name 
                            </label>
                            <input readOnly className="w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3" value={ firstname } />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-medium">
                                Middle Name 
                            </label>
                            <input readOnly className="w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3" value={ middlename } />
                        </div>
                    </div>
                    <div className="flex items-center justify-center col-2">
                        <div className="flex flex-col mr-5">
                            <label className="font-medium">
                                Title:
                            </label>
                            <input readOnly className="w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3" value={ title } />
                        </div>
                        <div className="flex flex-col ml-5">
                            <label className="font-medium">
                                Rate:
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    className="w-full pl-8 px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3"
                                    onChange={ event => { setRate(event.currentTarget.value) } }
                                    value={ rate ? rate : 0 }
                                    readOnly
                                />
                                <div className="absolute inset-y-1 left-1 flex items-center mb-2">
                                    <TbCurrencyPeso className="w-6 h-6 text-primary" />
                                </div>
                            </div>	
                        </div>
                    </div>
                    <div className="flex flex-col items-center text-left justify-start mx-5">
                        <label className="font-medium">
                            Overview:
                        </label>
                        <textarea className="w-full mx-5 px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3" value={ overview }>

                        </textarea>
                    </div>
                    <hr className="my-5"></hr>
                    <div className="flex flex-col items-center justify-center mx-auto">
                        <h1 className="font-medium my-4">Certifications</h1>
                        {
                            certification && 
                            certification.map( (element, index) => {
                                return <>
                                    <div key={index} className="py-4 my-2 flex-col place-content-center my-auto border-solid border-2 justify-between align-center text-center px-2">
                                        <img className="text-center mx-auto" src={ element.file } alt={ element.file.name } />
                                        <h5> { element.description } </h5>
                                    </div>
                                </>
                            })
                        }
                    </div>
                    <hr className="my-5"></hr>
                    <div className="flex flex-col items-center justify-center mx-auto">
                        <h1 className="font-medium my-4">Experiences</h1>
                        <ul className="list-disc">
                            {
                                experience && 
                                experience.map( (element, index) => {
                                    return <>
                                        <li key={index} className="justify-start flex flex-row align-center">
                                            <h5> { element } </h5>
                                        </li>
                                    </>
                                })
                            }
                        </ul>
                    </div>
                    <div className="flex items-center text-left justify-center mx-auto col-2 my-5">

                    </div>
                </div>
            </div>
        </>
    }

	const [isOpen, setIsOpen] = useState(false);
<<<<<<< HEAD
    return (
        // SET TO EMAIL MUNA YUNG SA USERNAME, SETTUP KO PA MUNA YUNG NEED KASI SABAY DAPAT SA REGISTRATION
=======
{/* if(auth.currentUser) */} 
        return (
            // SET TO EMAIL MUNA YUNG SA USERNAME, SETTUP KO PA MUNA YUNG NEED KASI SABAY DAPAT SA REGISTRATION
>>>>>>> dbf006c86637f371df6e18c52a9eaff867388fff

        <>
            {/* ICON NG SIDEBAR*/}

            <button
                onClick={() => {setIsOpen(true)}}
                className="bm-burger-button p-3"
            >
                <CgMenuLeftAlt className="w-8 h-16" />
            </button>

<<<<<<< HEAD
            {/* SIDE BAR MENU */}
            <Menu
                isOpen={isOpen}
                onStateChange={(state) => setIsOpen(state.isOpen)}
                className="flex flex-col justify-center items-center pt-32 bg-gray-200"
            >
                <h1>Welcome! { displayName }</h1>
                <div className="py-6 ">
                    <div className="flex flex-row justify-start items-start gap-2 ">
                        <BiHomeAlt2 className="h-5 w-5" />
                        <a id="about" className="text-base" href="">
                            Home
                        </a>
                    </div>
                </div>
                <div className="py-6">
                    <div className="flex flex-row justify-start items-start gap-2">
                        <MdManageAccounts className="h-5 w-5" />
=======
                {/* SIDE BAR MENU */}
                <Menu
                    isOpen={isOpen}
                    onStateChange={(state) => setIsOpen(state.isOpen)}
                    className="flex flex-col justify-center items-center pt-32 bg-gray-200"
                >
                 {/*   <h1>Welcome! {auth.currentUser.email}</h1>*/}
                    <div className="py-6">
                        <div className="flex flex-row justify-start items-start gap-2">
                            <MdManageAccounts className="h-5 w-5"/>
>>>>>>> dbf006c86637f371df6e18c52a9eaff867388fff
                        <a id="home" className="" href="/accountsettings">
                            Account
                        </a>
                    </div>
                </div>
                <div className="py-6">
                    <div className="flex flex-row justify-start items-start gap-2 ">
                        <BsFillClipboard2CheckFill className="h-5 w-5" />
                        <a id="messages" className="" href="/messages">
                            Messages
                        </a>
                    </div>
                </div>
                <div className="py-6">
                    <div className="flex flex-row justify-start items-start gap-2">
                        <BiLogOut className="h-5 w-5" />
                        <button onClick={logout}>Logout</button>
                    </div>
                </div>
                <div className="pt-3"></div>
            </Menu>

            <div className="container mx-auto p-3">
                {/* SEARCH BAR INPUT*/}
                <form className="relative w-72 ml-10 mt-2 flex gap-2">
                    <input
                        className="w-72 px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 "
                        placeholder="Search fixer's"
                    />

                    {/* BUTTON NG SEARCH BAR*/}
                    <button className="absolute inset-y-0 right-0 flex items-center px-1 bg-green-300 rounded-r-md">
                        <MdPersonSearch className="w-8 h-8 text-primary" />
                    </button>
                </form>

                <h1 className="pt-2 font-sans font-medium text-sm">Quick Access</h1>

                {/* OVERFLOW SELECTION NG DIFFERENT FIXERS */}
                <div className="py-3 flex px-2 gap-2 overflow-auto ">
                    <div className="py-2">
                        <button className="bg-primary text-white p-2 rounded-full px-6 text-sm font-medium ">
                            Painter
                        </button>
                    </div>
                    <div className="py-2">
                        <button className="bg-primary text-white p-2 rounded-full px-6 text-sm font-medium ">
                            Plumber
                        </button>
                    </div>

                    <div className="py-2">
                        <button className="bg-primary text-white p-2 rounded-full px-6 text-sm font-medium ">
                            Electrician
                        </button>
                    </div>

                    <div className="py-2 ">
                        <button className="bg-primary text-white p-2 rounded-full px-6 text-sm font-medium ">
                            Tiles
                        </button>
                    </div>

                    <div className="py-2">
                        <button className="bg-primary text-white p-2 rounded-full px-6 text-sm font-medium">
                            Roofer
                        </button>
                    </div>

                    <div className="py-2">
                        <button className="bg-primary text-white p-2 rounded-full px-6 text-sm font-medium">
                            Mason
                        </button>
                    </div>

                    <div className="py-2">
                        <button className="bg-primary text-white p-2 rounded-full px-6 text-sm font-medium">
                            Flooring
                        </button>
                    </div>

                    <div className="py-2">
                        <button className="bg-primary text-white p-2 rounded-full px-6 text-sm font-medium">
                            Concrete
                        </button>
                    </div>

                    <div className="py-2">
                        <button className="bg-primary text-white p-2 rounded-full px-6 text-sm font-medium">
                            Carpenter
                        </button>
                    </div>

                    <div className="py-2">
                        <button className="bg-primary text-white p-2 rounded-full px-6 text-sm font-medium">
                            Pipefitter
                        </button>
                    </div>
                </div>
<<<<<<< HEAD

                <h1 className="pt-9 font-sans font-medium text-sm">Top Fixers</h1>

                {
                    fixers &&
                    fixers.map( (value, index) => {
                        return <FixerBanner props={ value } />
                    })
                }
            </div>

            { fixerViewActive ? <FixerView id={ activeFixer } setter={ setFixerViewActive } /> : null }
        </>
    )
=======
            </>
        )
  {/*     else{
        <Navigate replace to="/"/>
    }*/} 
>>>>>>> dbf006c86637f371df6e18c52a9eaff867388fff
}

export default DashboardFinder;

