import logo from './img/fixer_finder_logo.png'

function SignUpFixer() {
    return ( 
        <div className='container mx-auto p-3 flex flex-col justify-center items-center'>
            <img src={logo} className='w-28'/>

            <h1 className='font-bold text-4xl text-black font-sans pt-6'>Sign up <span className='text-primary'>Fixer</span></h1>

            <form className='py-3 space-y-3 w-full pt-20'>
            <input type='text' className='w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 ' placeholder='First name'/>
            <input type='text' className='w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 ' placeholder='Last name'/>
            <input type='text' className='w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 ' placeholder='Username'/>
            <input type='text' className='w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 ' placeholder='Password (8 or more characters)'/>
            
           
            <label class="flex flex-row justify-start items-start p-1">
            <input type="checkbox" class=" h-3 w-3 mt-1 focus:outline-green-500"/>
            <span class=" ml-2 text-gray-700 text-sm">Yes I understand and agree to the <span className='text-primary'>Fixer Finder Terms of Service,</span> including the <span className='text-primary'>User Agreement and Privacy Policy.</span></span>
            </label>
              
            <input type="submit" value='Create my account' className='w-full px-3 py-2 bg-primary text-white hover:bg-lime-600 cursor-pointer rounded-full font-md'/>
            </form>
            
        </div>
     );
}

export default SignUpFixer;