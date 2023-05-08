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
import { getDoc, doc } from "firebase/firestore";
import { TbCurrencyPeso, TbEyeFilled, TbPennantFilled } from "react-icons/tb";

function DashboardFixer() {
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

	const navigate = useNavigate();

	const logout = async () => {
		try {
			auth.signOut();
			navigate("/");
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if(!user) {
				navigate("/")
				return
			}
			fetchUserDetails();
		})
	}, []);

	const fetchUserDetails = async () => {
		await getDoc(doc(db, "users", auth.currentUser.uid)).then((response) => {
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
		});
	};

	const [isOpen, setIsOpen] = useState(false);
	return (
		// SET TO EMAIL MUNA YUNG SA USERNAME, SETTUP KO PA MUNA YUNG NEED KASI SABAY DAPAT SA REGISTRATION

		<>
			<button
				onClick={() => setIsOpen(true)}
				className="bm-burger-button p-3"
			>
				<CgMenuLeftAlt className="w-8 h-16" />
			</button>

			<Menu
				isOpen={isOpen}
				onStateChange={(state) => setIsOpen(state.isOpen)}
				className="flex flex-col justify-center items-center px-5 pt-32 bg-gray-200"
			>
				<h1>Welcome! { userDisplayName }</h1>
				<div className="py-6 ">
					<div className="flex flex-row justify-start items-start gap-2 ">
						<BiHomeAlt2 className="h-5 w-5" />
						<a id="about" className="text-base" href="/fixer/dashboard">
							Home
						</a>
					</div>
				</div>
				<div className="py-6">
					<div className="flex flex-row justify-start items-start gap-2">
						<MdManageAccounts className="h-5 w-5" />
						<a id="home" className="" href="/accountsettings">
							Account
						</a>
					</div>
				</div>
				<div className="py-6">
					<div className="flex flex-row justify-start items-start gap-2 ">
						<BsFillClipboard2CheckFill className="h-5 w-5" />
						<a id="message" className="" href="/messages">
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
				<div className="flex items-center text-left justify-start mx-auto col-2">
					<div className="flex flex-col">
						<label className="font-medium">
							Title:
						</label>
						<input readOnly className="w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3" value={ title } />
					</div>
					<div className="flex flex-col">
						<label className="font-medium">
							Rate:
						</label>
						<div className="relative">
							<input
								type="number"
								className="w-full -8 px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3"
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
				<div className="flex flex-col items-center text-left justify-start mx-auto">
					<label className="font-medium">
						Overview:
					</label>
					<textarea className="w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3" value={ overview }>

<<<<<<< HEAD
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
					<div className="flex flex-col mx-5">
						<label className="font-medium">
							Profile Views:
						</label>
						<div className="relative">
							<input
								type="number"
								className="w-full pl-8 px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3"
								value={ rate ? rate : 0 }
								readOnly
							/>
							<div className="absolute inset-y-1 left-1 flex items-center mb-2">
								<TbEyeFilled className="w-6 h-6 text-primary" />
							</div>
						</div>	
					</div>
					<div className="flex flex-col mx-5">
						<label className="font-medium">
							Matches:
						</label>
						<div className="relative">
							<input
								type="number"
								className="w-full pl-8 px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3"
								value={ rate ? rate : 0 }
								readOnly
							/>
							<div className="absolute inset-y-1 left-1 flex items-center mb-2">
								<TbPennantFilled className="w-6 h-6 text-primary" />
							</div>
						</div>	
					</div>
				</div>
			</div>
		</>
	)
=======
  const [isOpen, setIsOpen] = useState(false);
 {/* if (auth.currentUser)   */}
    return (
      // SET TO EMAIL MUNA YUNG SA USERNAME, SETTUP KO PA MUNA YUNG NEED KASI SABAY DAPAT SA REGISTRATION

      <>
        {/* ICON NG SIDEBAR*/}

        <button
          onClick={() => setIsOpen(true)}
          className="bm-burger-button p-3"
        >
          <CgMenuLeftAlt className="w-8 h-16" />
        </button>

        {/* SIDE BAR MENU */}
        <Menu
          isOpen={isOpen}
          onStateChange={(state) => setIsOpen(state.isOpen)}
          className="flex flex-col justify-center items-center pt-32 bg-gray-200"
        >
    {/*       <h1>Welcome! { userDisplayName }</h1>  */}
          <div className="py-6">
            <div className="flex flex-row justify-start items-start gap-2">
              <MdManageAccounts className="h-5 w-5" />
              <a id="home" className="" href="/accountsettings">
                Account
              </a>
            </div>
          </div>
          <div className="py-6 ">
            <div className="flex flex-row justify-start items-start gap-2 ">
              <BiHomeAlt2 className="h-5 w-5" />
              <a id="about" className="text-base" href="/fixer/dashboard">
                Home
              </a>
            </div>
          </div>
          <div className="py-6">
            <div className="flex flex-row justify-start items-start gap-2 ">
              <BsFillClipboard2CheckFill className="h-5 w-5" />
              <a id="contact" className="" href="/message">
                Activity
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

      <h1 className="text-center space-y-6 font-sans font-medium text-medium pt-6">Welcome Fixer!</h1>

        <div className="flex justify-center items-center gap-3 pt-6">
          <div className="bg-primary p-3 rounded-lg">
          <h1 className="text-white font-sans text-center">Transaction</h1>
          <h3 className="text-white font-sans text-center text-sm">0</h3>
          </div>
          <div className="bg-primary p-3 rounded-lg">
          <h1 className="text-white font-sans text-center">Contracts</h1>
          <h3 className="text-white font-sans text-center text-sm">0</h3>
          </div>
          <div className="bg-primary p-3 rounded-xl">
          <h1 className="text-white font-sans text-center">Messages</h1>
          <h3 className="text-white font-sans text-center text-sm">0</h3>
          </div>
        </div>

        </div>
      </>
    );
 {/* else {
    return <Navigate replace to="/" />;
  }
*/}
  
>>>>>>> dbf006c86637f371df6e18c52a9eaff867388fff
}

export default DashboardFixer;
