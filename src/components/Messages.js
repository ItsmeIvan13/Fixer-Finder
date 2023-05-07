import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { slide as Menu, CrossIcon } from "react-burger-menu"; //para sa slide menu

import {
	addDoc,
	collection,
	getDoc,
	orderBy,
	getDocs,
	query,
	or,
	where,
	doc,
} from "firebase/firestore";
import { TbCaretLeft } from "react-icons/tb";
import { BiHomeAlt2, BiLogOut } from "react-icons/bi";
import { BsFillClipboard2CheckFill } from "react-icons/bs";
import { MdManageAccounts } from "react-icons/md";
import { CgMenuLeftAlt } from "react-icons/cg";
import { onAuthStateChanged } from "firebase/auth";

export default function Messages() {
	const [messageList, setMessageList] = useState([]);
	const [message, setMessage] = useState("");
	const [receiver, setReceiver] = useState("");
	const [currentMessageList, setCurrentMessageList] = useState([]);
	const [activeCurrentMessages, setActiveCurrentMessages] = useState(false)
	const [icon, setIcon] = useState("")
	const [userType, setUserType] = useState("Finder")

	const loadMessageHeaders = () => {
		setMessageList([]);
		getDocs(collection(db, "users")).then((documents) => {
			documents.forEach(async (document) => {
				const userInformation = await document.data();
				
				let hasMessages = false
				setCurrentMessageList([]);

				if (document.id === auth.currentUser.uid)
					return

				await getDocs(
					query(
						collection(db, "messages"),
						orderBy("datetime", "desc"),
						or(where("from", "==", auth.currentUser.uid), where("to", "==", auth.currentUser.uid))
					)
				).then(async (snapShot) => {
					if (!snapShot.empty) {
						snapShot.forEach(async (messageSnapshot) => {
							const threadInformation = await messageSnapshot.data()
							if( (threadInformation.to == auth.currentUser.uid && threadInformation.from == document.id) || (threadInformation.from == auth.currentUser.uid && threadInformation.to == document.id) )
								hasMessages = threadInformation.message
						});
					}
				});
				if (!hasMessages) return	

				const existingTest = messageList.map((element, index) => {
					return element.threadName === document.id;
				});
				if (existingTest) {
					setMessageList((previous) => [
						...previous,
						{
							threadName: document.id,
							displayName:
								userInformation.FirstName + " " + userInformation.Lastname,
							lastMessage: hasMessages,
							icon: userInformation.profilePicture
						},
					]);
				}
			});
		});
	};

	const loadMessage = async (id) => {
		setCurrentMessageList([]);
		const q = query(
			collection(db, "messages"),
			or(where("from", "==", auth.currentUser.uid), where("to", "==", auth.currentUser.uid))
		);
		await getDocs(q).then(async (snapShot) => {
			if (!snapShot.empty) {
				snapShot.forEach(async (document) => {
					const threadInformation = await document.data();
					if( (threadInformation.to === auth.currentUser.uid && threadInformation.from === id) || (threadInformation.from === auth.currentUser.uid && threadInformation.to === id) )
						setCurrentMessageList((previous) => [...previous, threadInformation]);
				});
			}
		});
	};

	useEffect(() => {
		onAuthStateChanged(auth,  user => {
			if(user) {
				loadMessageHeaders();
				fetchUserDetails()
			}
		})
	}, []);

	
	const fetchUserDetails = async () => {
		await getDoc(doc(db, "users", auth.currentUser.uid)).then((response) => {
			const finalData = response.data();
			setDisplayName(finalData.FirstName + " " + finalData.Lastname)
			setUserType(finalData.AccountType)
		});
	};

	const logout = async () => {
		try {
			auth.signOut();
		} catch (e) {
			console.log(e);
		}
	};

	
    const [displayName, setDisplayName] = useState("")
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			


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
                        <a id="about" className="text-base" href={ userType == "Fixer" ? "fixer/dashboard" : "finder/dashboard" }>
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
                        <a id="messages" className="" href="/messages">
                            Messages
                        </a>
                    </div>
                </div>
                <div className="py-6">
                    <div className="flex flex-row justify-start items-start gap-2">
                        <BiLogOut className="h-5 w-5" />
                        <button onClick={ logout }>Logout</button>
                    </div>
                </div>
                <div className="pt-3"></div>
            </Menu>
			{
				!activeCurrentMessages &&
				<div className="container mx-auto mt-5">
					<div className="min-w-full border rounded lg:grid lg:grid-cols-3">
						<div className="border-r border-gray-300 lg:col-span-1">
							<div className="mx-3 my-3">
								<button
									onClick={() => {setIsOpen(true)}}
									className="bm-burger-button p-3"
								>
									<CgMenuLeftAlt />
								</button>
								<div className="col-2 text-gray-600">
									<input
										type="search"
										className="py-2 pl-10 bg-gray-100 rounded outline-none"
										name="search"
										placeholder="Search"
										required
									/>
								</div>
							</div>

							<ul className="overflow-auto h-[32rem]">
								<h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
								{
									messageList &&
										messageList.map((value) => {
											return (
												<>
													<li>
														<button className="flex w-full items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none"
															onClick={(event) => {
																setReceiver(event.currentTarget.value)
																loadMessage(event.currentTarget.value)
																setActiveCurrentMessages(true)
															}} 
															key={value}
															value={ value.threadName }
														>
															<img
																className="object-cover w-10 h-10 rounded-full"
																src={ value.icon }
																alt="username"
															/>
															<div className="w-full pb-2">
																<div className="flex justify-between">
																	<span className="block ml-2 font-semibold text-gray-600">
																		{value.displayName}
																	</span>
																</div>
																<span className="block ml-2 text-sm text-gray-600 text-left">{value.lastMessage}</span>
															</div>
														</button>
													</li>
												</>
											);
								})}
							</ul>
						</div>
					</div>
				</div>

			}
			{
				activeCurrentMessages &&
					
					<div className="lg:col-span-2 lg:block fixed top-0 left-0 right-0 w-full">
						<div className="w-full">
							<div className="relative flex items-center p-3 border-b border-gray-300">
								<button className="flex flex-row" onClick={ event => {
									setActiveCurrentMessages(false)
								}}>
									<TbCaretLeft className="w-6 h-6 text-primary"  />
								</button>
								<img
									className="object-cover w-10 h-10 rounded-full"
									src={ icon }
									alt="username"
								/>
								<span className="block ml-2 font-bold text-gray-600">  </span>
							</div>
							<div className="relative w-full p-6 overflow-y-auto h-[40rem]">
								<ul className="space-y-2">
									{
										currentMessageList &&
										currentMessageList.map( (index) => {
											return <div key={ index }>
												<Bubble  sender={ index.from } message={ index.message } />
						
											</div>
										})
									}
								</ul>
							</div>

							<form className="flex items-center justify-between w-full sticky bottom-0 p-3 border-t border-gray-300"
								onSubmit={(event) => {
									event.preventDefault();
									sendMessage(receiver, message)
									loadMessageHeaders()
									loadMessage(receiver)
								}}
							>
								<input
									type="text"
									placeholder="Message"
									className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
									required
									value={ message }
									onInput={ event => {
										setMessage(event.target.value)
									}}
								/>
								<button type="submit">
									<svg
										className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
									</svg>
								</button>

							</form>
						</div>
					</div> 
			}
		</>
	);
}
const sendMessage = async (to, message) => {
	await addDoc(collection(db, "messages"), {
		message: message,
		to: to,
		from: auth.currentUser.uid,
		datetime: new Date(),
	});
};

const Bubble = (props) => {
	if(props.sender === auth.currentUser.uid){
		return (
			<>
				<li key={props} className="flex justify-end">
					<div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
						<span className="block">{ props.message }</span>
					</div>
				</li>
			</>
		);

	}else{
		return (
			<>
				
				<li key={props} className="flex justify-start">
					<div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
						<span className="block">{ props.message }</span>
					</div>
				</li>
			</>
		);
	}
};

