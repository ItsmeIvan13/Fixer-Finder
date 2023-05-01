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

function DashboardFixer() {

  const [userDisplayName, setUserDisplayName] = useState('')

  const navigate = useNavigate();

  const logout = async () => {
    try {
      auth.signOut();
      navigate("/")
    } catch (e) {
      console.log(e);
    }
  };


  useEffect(() => {
    fetchUserDetails()
  }, []);

  const fetchUserDetails = async () => {
    await getDoc(doc(db, "users", auth.currentUser.uid)).then( response => {
      const finalData = response.data()
      setUserDisplayName(finalData.Firstname + " " + finalData.Lastname)
    })
  }



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

        <div className="container mx-auto p-3">

      <h1 className="text-center space-y-6 font-sans font-medium text-medium pt-6">Welcome Fixer!</h1>


        </div>
      </>
    );
 {/* else {
    return <Navigate replace to="/" />;
  }
*/}
  
}

export default DashboardFixer;
