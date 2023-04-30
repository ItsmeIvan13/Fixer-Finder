import { TbCurrencyPeso } from "react-icons/tb";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase" 
import { getDoc, doc, updateDoc, addDoc, setDoc } from "firebase/firestore";

function EditAccount() {
	
	const navigate = useNavigate()
	const [userType, setUserType] = useState("Finder")

	const [firstname, setFirstName] = useState("")
	const [lastname, setLastName] = useState("")
	const [middlename, setMiddleName]  = useState("")
	const [suffix, setSuffix] = useState("")
	const [contactNo, setContactNo] = useState("")
	const [telephoneNo, setTelephoneNo] = useState('')
	const [emailAddress, setEmailAddress] = useState("")
	const [block, setBlock] = useState("")
	const [lot, setLot] = useState("")
	const [houseNo, setHouseNo] = useState("")
	const [province, setProvince] = useState("")
	const [barangay, setBarangay] = useState("")
	const [region, setRegion] = useState("")
	const [city, setCity] = useState("")
	const [zipcode, setZipcode] = useState("")
	
	const [title, setTitle] = useState("")
	const [rate, setRate] = useState("")

	const [overview, setOverview] = useState("")

	const [skills, setSkills] = useState([])
	const [certification, setCertification] = useState([])
	const [experience, setExperience] = useState([])

	const handleAddCertificate = async (  ) => {
		await addDoc(doc(db, "certifications"))
	}

	async function updateProfile(){
		await updateDoc(doc(db, "users", auth.currentUser.uid), {
			// Data TO Update
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
			skills: skills
		}).then( async (response) => {
			console.log("Successfully Updated")

		})
	}

	const logout = async() => {
		try {
			auth.signOut();
		} catch (e) {
			console.log(e);
		}
	}


	async function getUser(){
		const userInformationPromise = await getDoc(doc(db, "users", sessionStorage.getItem("UID")))
		const response = (await (userInformationPromise.data()))
		setUserType( response.AccountType )
		setFirstName(response.Firstname)
		setLastName(response.Lastname)
		setEmailAddress(auth.currentUser.email)
		setMiddleName(response.MiddleName)
		setSuffix(response.Suffix)
		setContactNo(response.ContactNo)
		setTelephoneNo(response.TelephoneNo)
		setBlock(response.Block)
		setLot(response.Lot)
		setHouseNo(response.HouseNo)
		setProvince(response.Province)
		setBarangay(response.Barangay)
		setRegion(response.Region)
		setCity(response.City)
		setZipcode(response.ZipCode)
		setTitle(response.Title)
		setRate(response.Rate)
		setOverview(response.Overview)
		response.skills.forEach( skill => {
			if (skills.includes(skill)) return
			skills.push(skill)
		})
	}
	
	
	useEffect(() => {
		
		getUser()
		onAuthStateChanged(auth, (user) => {
			if (!user) {
				// User just logged Out
				navigate("/");
            }
		});
		
	}, []);
	return (
		<div className="container mx-auto p-3 flex-row justify-start items-start">
			<div className="flex justify-between items-center py-6">
				<h1 className="font-bold font-sans text-2xl text-center py-6 text-center">
					My Profile
				</h1>
				<button
					className="bg-primary font-sans text-white px-6 p-2 hover:bg-green-500"
					onClick={ updateProfile }
				>
					Save
				</button>
				<button
					className="bg-primary font-sans text-white px-6 p-2 hover:bg-green-500"
					onClick={ logout }
				>
					Logout
				</button>
			</div>

			<form className="">
				<div className="flex items-center justify-center flex-col pb-3">
					<div className="relative w-48 h-48 rounded-full overflow-hidden">
						<img
							src="https://via.placeholder.com/300x300"
							alt="Profile"
							className="w-full h-full object-cover"
						/>
						<div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
							<label
								className="text-white font-bold cursor-pointer"
							>
								Upload Picture
							</label>
							<input type="file" id="profile-pic-upload" className="hidden" />
						</div>
					</div>
				</div>

				<label className="font-medium">
					Last name <span className="text-red-500">*</span>
				</label>
				<input
					type="text"
					className="w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3"
					onChange={ (event) => { setLastName(event.currentTarget.value) } }
					value = { lastname }
				/>

				<label className="font-medium">
					First name<span className="text-red-500">*</span>
				</label>
				<input
					type="text"
					className="w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 "
					onChange={ (event) => { setFirstName(event.currentTarget.value) } }
					value={ firstname }
				/>
				<div className="flex justify-between items-center py-3 gap-2">
					<div>
						<label className="font-medium">Middle name</label>
						<input
							type="text"
							className="w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 "
							onChange={ (event) => { setMiddleName(event.currentTarget.value) } }
							value={ middlename ? middlename : "" }
						/>
					</div>

					<div>
						<label className="font-medium">Suffix</label>
						<input
							type="text"
							className="w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 "
							onChange={ (event) => { setSuffix(event.currentTarget.value) } }
							value={ suffix ? suffix : "" }
						/>
					</div>
				</div>

				<label className="font-medium">
					Contact Number <span className="text-red-500">*</span>
				</label>
				<input
					type="number"
					className="w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3"
					onChange={ (event) => { setContactNo(event.currentTarget.value) } }
					value={ contactNo ? contactNo : "" }
				/>

				<label className="font-medium">Telephone Number </label>
				<input
					type="text"
					className="w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3"
					onChange={ (event) => { setTelephoneNo(event.currentTarget.value) } }
					value={ telephoneNo ? telephoneNo : "" }
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
							onChange={ (event) => { setBlock(event.currentTarget.value) } }
							value={ block ? block : "" }
						/>
					</div>

					<div>
						<label className="font-medium">
							Lot <span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							className="w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3"
							onChange={ (event) => setLot(event.currentTarget.value) }
							value={ lot ? lot : "" }
						/>
					</div>

					<div>
						<label className="font-medium">
							House Number <span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							className="w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3"
							onChange={ (event) => { setHouseNo(event.currentTarget.value) } }
							value={ houseNo ? houseNo : "" }
						/>
					</div>
				</div>

				<label className="font-medium">
					Province <span className="text-red-500">*</span>
				</label>
				<input
					type="text"
					className="w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3"
					onChange={ event => { setProvince(event.currentTarget.value) } }
					value={ province ? province : "" }
				/>

				<label className="font-medium">
					Barangay <span className="text-red-500">*</span>
				</label>
				<input
					type="text"
					className="w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3" 
					onChange={ event => { setBarangay(event.currentTarget.value) } }
					value={ barangay ? barangay : "" }
				/>

				<label className="font-medium">
					Region <span className="text-red-500">*</span>
				</label>
				<input
					type="text"
					className="w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3"
					onChange={ event => setRegion(event.currentTarget.value) }
					value={ region ? region : "" }
				/>

				<label className="font-medium">
					City <span className="text-red-500">*</span>
				</label>
				<input
					type="text"
					className="w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3"
					onChange={ event => { setCity(event.currentTarget.value) } }
					value={ city ? city : "" }
				/>
				<label className="font-medium">
					Zip code <span className="text-red-500">*</span>
				</label>
				<input
					type="text"
					className="w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3"
					onChange={ event => { setZipcode(event.currentTarget.value) } }
					value={ zipcode ? zipcode : ""}
				/>
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
								onChange={ event => { setTitle(event.currentTarget.value) } }
								value={ title ? title : ""}
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
										onChange={ event => { setRate(event.currentTarget.value) } }
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
								onChange={ event => { setOverview(event.currentTarget.value) } }
								value={ overview ? overview : "" } 
							></textarea>
						</div>

						<h1 className="font-sans font-medium text-lg text-center py-3 text-start pt-6">
							Skills
						</h1>

						{	
							skills?.map( (element, index) => {
								return  <select
										key={ index }
										onChange={ event => { 
											let newSkills = skills.map( (currentElement, currentIndex) => {
												if ( currentIndex === index){
													return event.currentTarget.value
												}else{
													return currentElement
												}
											})
											setSkills(newSkills); 
										}} 
										className="w-full px-3 py-2 border border-grey-200 rounded-md focus:outline-green-500"
										value={ element }
									>
										<option>Select Skills</option>
										<option value={ "Painter" }>Painter</option>
										<option value={ "Plumber" } >Plumber</option>
										<option value={ "Carpenter" } >Carpenter</option>
										<option value={ "Masonry" } >Masonry</option>
										<option value={ "Framer" } >Framer</option>
										<option value={ "Electrician" } >Electrician</option>
										<option value={ "Roofer" } >Roofer</option>
										<option value={ "Pipe Fitter" } >Pipe Fitter</option>
									</select>
							})
						}

						

						<div className="flex justify-between items-center py-6">
							<h1 className="font-sans font-medium text-lg text-center py-3">
								Certifications
							</h1>

							<button
								className="bg-primary font-sans text-white px-6 p-2 hover:bg-green-500"
								type="button"
							>
								Add
							</button>
						</div>

						<div className="flex justify-between items-center py-6">
							<h1 className="font-sans font-medium text-lg text-center py-3">
								Employment history
							</h1>

							<button
								type="button"
								className="bg-primary font-sans text-white px-6 p-2 hover:bg-green-500"
							>
								Add
							</button>
						</div>
					</div>
					
				}
			</form>
		</div>
	);
}

export default EditAccount;
