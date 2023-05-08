import { TbCurrencyPeso } from "react-icons/tb";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db, storage } from "../firebase" 
import { getDoc, doc, updateDoc, addDoc, setDoc } from "firebase/firestore";
<<<<<<< HEAD
import Swal from "sweetalert2";
import { ref, uploadBytes } from "firebase/storage";
import { slide as Menu, CrossIcon } from "react-burger-menu"; //para sa slide menu
import { CgMenuLeftAlt } from "react-icons/cg";
import { MdManageAccounts } from "react-icons/md";
import {
	BsFillClipboard2CheckFill,
} from "react-icons/bs";
import { BiHomeAlt2, BiLogOut } from "react-icons/bi";
=======
import { CgMenuLeftAlt } from "react-icons/cg";
import { MdPersonSearch, MdManageAccounts } from "react-icons/md";
import { slide as Menu, CrossIcon } from "react-burger-menu"; //para sa slide menu
import {
	BsPersonCircle,
	BsFillArrowRightCircleFill,
	BiHomeAlt,
	BsFillClipboard2CheckFill,
  } from "react-icons/bs";
  import { BiHomeAlt2, BiLogOut } from "react-icons/bi";

>>>>>>> dbf006c86637f371df6e18c52a9eaff867388fff
function EditAccount() {
	
	const navigate = useNavigate()

	const [userImage, setUserImage] = useState("")

	const [userDisplayName, setUserDisplayName] = useState("")

	const [userType, setUserType] = useState("Finder")

	const [firstname, setFirstName] = useState("N/A")
	const [lastname, setLastName] = useState("N/A")
	const [middlename, setMiddleName] = useState("N/A")
	const [suffix, setSuffix] = useState("N/A")
	const [contactNo, setContactNo] = useState("N/A")
	const [telephoneNo, setTelephoneNo] = useState('N/A')
	const [emailAddress, setEmailAddress] = useState("N/A")
	const [block, setBlock] = useState("N/A")
	const [lot, setLot] = useState("N/A")
	const [houseNo, setHouseNo] = useState("N/A")
	const [province, setProvince] = useState("N/A")
	const [barangay, setBarangay] = useState("N/A")
	const [region, setRegion] = useState("N/A")
	const [city, setCity] = useState("N/A")
	const [zipcode, setZipcode] = useState("N/A")
	
	const [title, setTitle] = useState("N/A")
	const [rate, setRate] = useState("N/A")

	const [overview, setOverview] = useState("N/A")

	const [skills, setSkills] = useState([])

	const [carpenty, setCarpentry] = useState(false)
	const [plumber, setPlumber] = useState(false)
	const [electrician, setElectrician] = useState(false)
	const [tileSetter, setTileSetter] = useState(false)
	const [roofer, setRoofer] = useState(false)
	const [mason, setMason] = useState(false)
	const [flooring, setFlooring] = useState(false)
	const [concrete, setConcrete] = useState(false)
	const [pipeFitter, setPipeFitter] = useState(false)
	
	const [certification, setCertification] = useState([])
	const [experience, setExperience] = useState([])

	const handleAddCertificate = async (  ) => {
		await addDoc(doc(db, "certifications"))
	}

	
	const logout = async () => {
		try {
			auth.signOut();
			navigate("/");
		} catch (e) {
			console.log(e);
		}
	};

	async function handleUpdate(){
		let object = {}
		if(userType === "Finder"){
			object = {
				profilePicture: userImage,
				FirstName: firstname,
				Lastname: lastname,
				MiddleName: middlename,
				Suffix: suffix,
				ContactNo: contactNo,
				TelephoneNo: telephoneNo,
				Block: block,
				Lot: lot,
				HouseNo: houseNo,
				Province: province,
				Barangay: barangay,
				Region: region,
				City: city,
				ZipCode: zipcode
			}
		}
		else{
			object = {
				profilePicture: userImage,
				FirstName: firstname,
				Lastname: lastname,
				MiddleName: middlename,
				Suffix: suffix,
				ContactNo: contactNo,
				TelephoneNo: telephoneNo,
				Block: block,
				Lot: lot,
				HouseNo: houseNo,
				Province: province,
				Barangay: barangay,
				Region: region,
				City: city,
				ZipCode: zipcode,
				Title: title,
				Rate: rate,
				Overview: overview,
				skills: getSkill(),
				experience: experience,
				certification: certification
			}
		}

		await updateDoc(doc(db, "users", auth.currentUser.uid), object).then( async (response) => {
			Swal.fire({
				title: "Profile has been Successfully updated",
				icon: "success"
			}).then( last => {

			})
		})
	}

	const prepareCertifications = ( ) => {
		let returnedData = []
		
		certification.forEach( async (element, index) => {
			await uploadBytes( ref(storage, auth.currentUser.uid + "/" + element.file.name), element.file).then( (response) => {
				returnedData.push({ file: auth.currentUser.uid + "/" + element.file.name, description: element.description })
			})
		})
		return returnedData
	}

	async function getUser(){
		await getDoc(doc(db, "users", auth.currentUser.uid)).then( async userInformationPromise =>  {
			const response = userInformationPromise.data()
			setUserType( response.AccountType )
			setFirstName(response.FirstName)
			setLastName(response.Lastname)
			setEmailAddress(auth.currentUser.email)
			setMiddleName(response.MiddleName ? response.MiddleName : "N/A")
			setSuffix(response.Suffix ? response.Suffix : "N/A")
			setContactNo(response.ContactNo ? response.ContactNo : "N/A")
			setTelephoneNo(response.TelephoneNo ? response.TelephoneNo : "N/A")
			setBlock(response.Block ? response.Block : "N/A")
			setLot(response.Lot ? response.Lot : "N/A")
			setHouseNo(response.HouseNo ? response.HouseNo : "N/A")
			setProvince(response.Province ? response.Province : "N/A")
			setBarangay(response.Barangay ? response.Barangay : "N/A")
			setRegion(response.Region ? response.Region : "N/A")
			setCity(response.City ? response.City : "N/A")
			setZipcode(response.ZipCode ? response.ZipCode : "N/A")
			setTitle(response.Title ? response.Title : "N/A")
			setRate(response.Rate ? response.Rate : 0)
			setOverview(response.Overview ? response.Overview : "N/A")
			if( response.AccountType === "Fixer" ){
				if (response.skills.includes("Carpentry")) setCarpentry(true)
				if (response.skills.includes("Plumber")) setPlumber(true)
				if (response.skills.includes("Electrician")) setElectrician(true)
				if (response.skills.includes("Tile Setter")) setTileSetter(true)
				if (response.skills.includes("Roofer")) setRoofer(true)
				if (response.skills.includes("Mason")) setMason(true)
				if (response.skills.includes("Flooring")) setFlooring(true)
				if (response.skills.includes("Concrete")) setConcrete(true)
				if (response.skills.includes("Pipefitter")) setPipeFitter(true)
				setCertification(response.certification)
				setExperience(response.experience)
			}
			setUserImage(response.profilePicture ? response.profilePicture : "")
			setUserDisplayName(response.FirstName + " " + response.Lastname)
		})
	}

	const getSkill = () => {
		let returned = []
		if (carpenty) returned.push("Carpentry")
		if (plumber) returned.push("Plumber")
		if (electrician) returned.push("Electrician")
		if (tileSetter) returned.push("Tile Setter")
		if (roofer) returned.push("Roofer")
		if (mason) returned.push("Mason")
		if (flooring) returned.push("Flooring")
		if (concrete) returned.push("Concrete")
		if (pipeFitter) returned.push("Pipefitter")
		return returned
	}

	
 {/*	 useEffect(() => {
		
		onAuthStateChanged(auth, (user) => {
			if (!user) {
				// User just logged Out
				navigate("/")
				return
            }
			getUser()
		});
		
<<<<<<< HEAD
	}, []);

	
	const [isOpen, setIsOpen] = useState(false);

	return (<>
	
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
=======
	}, []);*/} 

	const [isOpen, setIsOpen] = useState(false);
	return (


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
              <a id="about" className="text-base" href="">
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





		
>>>>>>> dbf006c86637f371df6e18c52a9eaff867388fff
		<div className="container mx-auto p-3 flex-row justify-start items-start">
			<div className="flex justify-between items-center py-6">
				<h1 className="font-bold font-sans text-2xl text-center py-6 text-center">
					My Profile
				</h1>
				<button
					className="bg-primary font-sans text-white px-6 p-2 hover:bg-green-500"
					onClick={ handleUpdate }
				>
					Save
				</button>
			</div>

			<form onSubmit={ handleUpdate }>
				<div className="flex items-center justify-center flex-col pb-3">
					<div className="relative w-48 h-48 rounded-full overflow-hidden">
						<img
							src={ userImage === "" ? "https://via.placeholder.com/300x300" : userImage }
							alt="Profile"
							className="w-full h-full object-cover"
						/>
						<div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
							<label
								className="text-white font-bold cursor-pointer"
							>
								<input type="file" id="profile-pic-upload" className="hidden"
									onChange={ event => {

										const reader = new FileReader()
										reader.addEventListener("load", readerEvent => {
											setUserImage(readerEvent.target.result)
										})
										reader.readAsDataURL(event.target.files[0])
									}}
								/>
								Upload Picture
							</label>
						</div>
					</div>
				</div>

				<label className="font-medium">
					Last name <span className="text-red-500">*</span>
				</label>
				<input
					type="text"
					className="w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3"
					onChange={ (event) => { setLastName(event.target.value) } }
					value = { lastname }
					required
				/>

				<label className="font-medium">
					First name<span className="text-red-500">*</span>
				</label>
				<input
					type="text"
					className="w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 "
					onChange={ (event) => { setFirstName(event.target.value) } }
					value={ firstname }
				/>
				<div className="flex justify-between items-center py-3 gap-2">
					<div>
						<label className="font-medium">Middle name</label>
						<input
							type="text"
							className="w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 "
							onChange={ (event) => { setMiddleName(event.target.value) } }
							value={ middlename }
						/>
					</div>

					<div>
						<label className="font-medium">Suffix</label>
						<input
							type="text"
							className="w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 "
							onChange={ (event) => { setSuffix(event.target.value) } }
							value={ suffix }
						/>
					</div>
				</div>

				<label className="font-medium">
					Contact Number <span className="text-red-500">*</span>
				</label>
				<input
					type="text"
					className="w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3"
					onChange={ (event) => { setContactNo(event.target.value) } }
					value={ contactNo }
				/>

				<label className="font-medium">Telephone Number </label>
				<input
					type="text"
					className="w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3"
					onChange={ (event) => { setTelephoneNo(event.target.value) } }
					value={ telephoneNo }
				/>

				<label className="font-medium">
					Email Address <span className="text-red-500">*</span>
				</label>
				<input
					type="email"
					className="w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3"
					readOnly
					value={ emailAddress }
				/>

				{ userType === "Finder" &&
					<>
						<h1 className="font-sans font-medium text-lg text-center py-3 text-start pt-6">
							Address Information
						</h1>

						<div className="flex justify-between items-center gap-2">
							<div>
								<label className="font-medium">
									Block <span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									className="w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3"
									onChange={ (event) => { setBlock(event.target.value) } }
									value={ block }
								/>
							</div>

							<div>
								<label className="font-medium">
									Lot <span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									className="w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3"
									onChange={ (event) => setLot(event.target.value) }
									value={ lot }
								/>
							</div>

							<div>
								<label className="font-medium">
									House Number <span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									className="w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3"
									onChange={ (event) => { setHouseNo(event.target.value) } }
									value={ houseNo }
								/>
							</div>
						</div>

						<label className="font-medium">
							Province <span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							className="w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3"
							onChange={ event => { setProvince(event.target.value) } }
							value={ province }
						/>

						<label className="font-medium">
							Barangay <span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							className="w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3" 
							onChange={ event => { setBarangay(event.target.value) } }
							value={ barangay }
						/>

						<label className="font-medium">
							Region <span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							className="w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3"
							onChange={ event => setRegion(event.target.value) }
							value={ region }
						/>

						<label className="font-medium">
							City <span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							className="w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3"
							onChange={ event => { setCity(event.target.value) } }
							value={ city }
						/>
						<label className="font-medium">
							Zip code <span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							className="w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3"
							onChange={ event => { setZipcode(event.target.value) } }
							value={ zipcode }
						/>
					
					</>
				}

				
				{ userType === "Fixer" &&
					<div>

						<div className="py-5 ">
							<label className="font-medium fon-sans">
								Title <span className="text-red-500">*</span>
							</label>
							<br></br>
							<span className="text-xs font-sans">
								Enter a single sentence description of your professional
								skills/experience.
							</span>
							<input
								type="text"
								className="w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3"
								onChange={ event => { setTitle(event.target.value) } }
								value={ title }
							/>
						</div>

						<div className="py-5 ">
							<label className="font-medium font-sans">
								Hourly Rate <span className="text-red-500">*</span>
							</label>
							<br></br>
							<div className="flex justify-start items-center gap-3 ">
								<div className="relative">
									<input
										type="number"
										className="w-full pl-8 px-3 py-2  text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 "
										onChange={ event => { setRate(event.target.value) } }
										value={ rate ? rate : 0 }
									/>
									<div className="absolute inset-y-0 left-1 flex items-center">
										<TbCurrencyPeso className="w-6 h-6 text-primary" />
									</div>
								</div>

								<h1 className="font-sans font-medium">/hr</h1>
							</div>
						</div>

						<div className="py-6">
							<h1 className="font-sans font-medium text-lg text-center py-3 text-start pt-6">
								Overview
							</h1>
							<h1 className="font-sans text-sm">
								Use this space to show clients you have the skills and experience they're
								looking for.
							</h1>

							<ul className="font-sans text-xs space-y-3 py-3">
								<li>Describe your strength and skills</li>
								<li>Highlight projects, accomplishments and education</li>
								<li>Keep it short and simple</li>
							</ul>

							<textarea
								className="border border-grey-200 focus:outline-green-500"
								rows="7"
								cols="35"
								onChange={ event => { setOverview(event.target.value) } }
								value={ overview } 
							></textarea>
						</div>
						
						<div>
							<h1 className="font-sans text-start text-lg font-medium space-y-3">Skills</h1>

							<div className="flex justify-between">
							
							<div className="">
								<input type="checkbox" value="Carpenter" defaultChecked={ carpenty } onChange={ event => { setCarpentry(event.target.value) }} />
								<label>Carpenter</label><br></br>
								<input type="checkbox" value="Plumber" defaultChecked={ plumber } onChange={ event => { setPlumber(event.target.value) }}/>
								<label>Plumber</label><br></br>	
								<input type="checkbox" value="Electrician" defaultChecked={ electrician } onChange={ event => { setElectrician(event.target.value) }}/>
								<label>Electrician</label><br></br>
								<input type="checkbox" value="Tiles setter" defaultChecked={ tileSetter } onChange={ event => { setTileSetter(event.target.value) }}/>
								<label>Tiles setter</label><br></br>
								<input type="checkbox" value="Roofer" defaultChecked={ roofer } onChange={ event => { setRoofer(event.target.value) }}/>
								<label>Roofer</label>
							</div>

							<div>
							<input type="checkbox" value="Mason" defaultChecked={ mason } onChange={ event => { setMason(event.target.value) }}/>
							<label>Mason</label><br></br>
							<input type="checkbox" value="Flooring" defaultChecked={ flooring } onChange={ event => { setFlooring(event.target.value) }}/>
							<label>Flooring</label><br></br>
							<input type="checkbox" value="Concrete" defaultChecked={ concrete } onChange={ event => { setConcrete(event.target.value) }}/>
							<label>Concrete</label><br></br>
							<input type="checkbox" value="Pipefitter" defaultChecked={ pipeFitter } onChange={ event => { setPipeFitter(event.target.value) }}/>
							<label>Pipefitter</label><br></br>
							</div>

							</div>
						</div>

						

						<div className="flex justify-between items-center py-6">
							<h1 className="font-sans font-medium text-lg text-center py-3">
								Certifications
							</h1>

								<button
									type="button" id="certificate_add" className="bg-primary font-sans text-white px-6 p-2 hover:bg-green-500"
									onClick={ async event => {
										
										const { value: file } = await Swal.fire({
											title: 'Select Certificate image',
											input: 'file',
											inputAttributes: {
											  'accept': 'image/*',
											  'aria-label': 'Upload your certificate image'
											}
										})
										  
										if (file) {
											const reader = new FileReader()
											reader.onload = async (e) => {
												const { value: description } = await Swal.fire({
													title: 'Enter certification description',
													input: 'text',
													inputLabel: 'Certification Description',
													imageUrl: e.target.result,
													imageAlt: 'The uploaded picture',
													showCancelButton: true,
													inputValidator: (value) => {
														if (!value) {
															return 'You need to write something!'
														}
													}
												})
												  
												if (description) {
													setCertification( previous => [ ...previous, {file: e.target.result, description: description} ])
												}
											}
											reader.readAsDataURL(file)
										}			
														
									}}
								>Add</button>
						</div>
						{
							certification && 
							certification.map( (element, index) => {
								return <>
									<div key={index} className="flex-col place-content-center my-auto border-solid border-2 justify-between align-center text-center px-2">
										
										<img className="text-center mx-auto" src={ element.file } alt={ element.file.name } />
										<h5> { element.description } </h5>
										<button className="bg-red-600 font-sans text-white px-6 p-2 hover:bg-red-500" value={ index } type="button">Remove</button>
									</div>
								</>
							})
						}

						<div className="flex justify-between items-center py-6">
							<h1 className="font-sans font-medium text-lg text-center py-3">
								Employment history
							</h1>

							<label
								className=""
							>
								<button
									type="button" id="experience_add" className="bg-primary font-sans text-white px-6 p-2 hover:bg-green-500"
									onClick={ async event => {
										const { value: experienceInput } = await Swal.fire({
											title: 'Enter experience entailment',
											input: 'text',
											showCancelButton: true,
											inputValidator: (value) => {
												if (!value) {
													return 'You need to write something!'
												}
											}
										})
										  
										if (experienceInput) {
											setExperience( previous => [...previous, experienceInput])
										}
									}}
								>Add</button>
							</label>
						</div>
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
					
				}
			</form>

			<div>
				<h1 className="font-sans text-start text-lg font-medium space-y-3">Skills</h1>

				<div className="flex justify-between">
				
				<div className="">
				<input type="checkbox" value="Painter"/>
				<label>Painter</label><br></br>
				<input type="checkbox" value="Plumber"/>
				<label>Plumber</label><br></br>
				<input type="checkbox" value="Electrician"/>
				<label>Electrician</label><br></br>
				<input type="checkbox" value="Tiles setter"/>
				<label>Tiles setter</label><br></br>
				<input type="checkbox" value="Roofer"/>
				<label>Roofer</label>
				</div>

				<div>
				<input type="checkbox" value="Mason"/>
				<label>Mason</label><br></br>
				<input type="checkbox" value="Flooring"/>
				<label>Flooring</label><br></br>
				<input type="checkbox" value="Concrete"/>
				<label>Concrete</label><br></br>
				<input type="checkbox" value="Pipefitter"/>
				<label>Pipefitter</label><br></br>
				</div>

				</div>
			</div>
		</div>
<<<<<<< HEAD
	</>
	);
=======

		</>
		
		);
>>>>>>> dbf006c86637f371df6e18c52a9eaff867388fff
}

export default EditAccount;
