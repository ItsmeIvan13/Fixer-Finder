function DashboardFixers() {
    return ( 
        <div className="container mx-auto p-3 flex-row justify-start items-start">

            <h1 className="font-bold font-sans text-2xl text-center py-6">My Account</h1>

            <form className="">
            <div class="flex items-center justify-center flex-col pb-3">
  <div class="relative w-48 h-48 rounded-full overflow-hidden">
    <img src="https://via.placeholder.com/300x300" alt="Profile picture" class="w-full h-full object-cover" />
    <div class="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
      <label for="profile-pic-upload" class="text-white font-bold cursor-pointer">
        Upload Picture
      </label>
      <input type="file" id="profile-pic-upload" class="hidden" />
    
    </div>
  </div>
</div>

        <label>Last name <span>*</span></label>
            <input 
                    type='text' 
                    className='w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3' 
                />

                <label>First name<span>*</span></label>
            <input 
                    type='text' 
                    className='w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 ' 
                />
                <div className="flex justify-between items-center py-3 gap-2">
                    <div>
                <label>Middle name</label>
            <input 
                    type='text' 
                    className='w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 ' 
                />
                </div>

                <div>
                <label>Suffix</label>
                <input 
                    type='text' 
                    className='w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 ' 
                />
                </div>

            </div>

            <label>Contact Number <span>*</span></label>
            <input 
                    type='text' 
                    className='w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3' 
                />

            <label>Telephone Number </label>
            <input 
                    type='text' 
                    className='w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3' 
                />  

            <label>Email Address <span>*</span></label>
            <input 
                    type='email' 
                    className='w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3' 
                />

            <h1 className="font-sans font-medium text-lg text-center py-3">Address Information</h1>       
                
            <div className="flex justify-between items-center gap-2">
                <div>
                <label>Block <span>*</span></label>
            <input 
                    type='text' 
                    className='w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3' 
                /> 
                </div>

                <div>
                <label>Lot <span>*</span></label>
            <input 
                    type='text' 
                    className='w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3' 
                />
                </div>

                <div>
                <label>House Number <span>*</span></label>
            <input 
                    type='text' 
                    className='w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3' 
                />
                </div>
            </div>

            <label>Province <span>*</span></label>
            <input 
                    type='text' 
                    className='w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3' 
                />

            <label>Baranggay <span>*</span></label>
            <input 
                    type='text' 
                    className='w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3' 
                />

            <label>Region <span>*</span></label>
            <input 
                    type='text' 
                    className='w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3' 
                />

            <label>City <span>*</span></label>
            <input 
                    type='text' 
                    className='w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3' 
                />
          <label>Zip code <span>*</span></label>
            <input 
                    type='text' 
                    className='w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3' 
                />
            </form>
        </div>
     );
}

export default DashboardFixers;