import logo from './img/fixer_finder_logo.png'
import { MdConstruction, MdPersonSearch } from "react-icons/md";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from 'react-router-dom'



function Accounts() {
    return ( 
        <div className="container mx-auto p-3 flex flex-col justify-center items-center">
             <img src={logo} className='w-1/2' alt="Logo" />

             <h1 className='font-sans text-2xl font-bold py-3'>Select account type</h1>

            <div className='space-y-3'>
             <Link to="/signupfixer" className='bg-white p-5 px-9 flex justify-between items-center shadow-xl gap-2'>
             <MdConstruction className='w-12 h-12 mt-1 text-primary'/> 
              <h1 className='font-sans text-black text-lg font-medium'>I want to work</h1>
              <AiOutlineArrowRight className='w-9 mt-1'/>
             </Link>

             <Link to="/signupfinder" className='bg-white p-5 px-9 flex justify-between items-center shadow-xl gap-2'>
             <MdPersonSearch className='w-12 h-12 mt-1 text-primary'/> 
              <h1 className='font-sans text-black text-lg font-medium'>I want to hire</h1>
              <AiOutlineArrowRight className='w-9 mt-1'/>
             </Link>
             </div>

        </div>
     );
}

export default Accounts;