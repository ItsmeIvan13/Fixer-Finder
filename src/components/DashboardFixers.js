

import { TbCurrencyPeso } from "react-icons/tb";

function DashboardFixers() {
    return ( 
        <div className="container mx-auto p-3 flex-row justify-start items-start">

     <div className="flex justify-between items-center py-6">
        <div></div>
        <div></div>
            <h1 className="font-bold font-sans text-2xl text-center py-6 text-center">My Profile</h1>
            <a href="#" className="bg-primary font-sans text-white px-6 p-2 hover:bg-green-500">Edit</a>

      
         </div>

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

        <label className="font-medium">Last name <span className="text-red-500">*</span></label>
            <input 
                    type='text' 
                    className='w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3' 
                />

                <label className="font-medium">First name<span className="text-red-500">*</span></label>
            <input 
                    type='text' 
                    className='w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 ' 
                />
                <div className="flex justify-between items-center py-3 gap-2">
                    <div>
                <label className="font-medium">Middle name</label>
            <input 
                    type='text' 
                    className='w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 ' 
                />
                </div>

                <div>
                <label className="font-medium">Suffix</label>
                <input 
                    type='text' 
                    className='w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 ' 
                />
                </div>

            </div>

            <label className="font-medium">Contact Number <span className="text-red-500">*</span></label>
            <input 
                    type='text' 
                    className='w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3' 
                />

            <label className="font-medium">Telephone Number </label>
            <input 
                    type='text' 
                    className='w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3' 
                />  

            <label className="font-medium">Email Address <span className="text-red-500">*</span></label>
            <input 
                    type='email' 
                    className='w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3' 
                />

            <h1 className="font-sans font-medium text-lg text-center py-3 text-start pt-6">Address Information</h1>       
                
            <div className="flex justify-between items-center gap-2">
                <div>
                <label className="font-medium">Block <span className="text-red-500">*</span></label>
            <input 
                    type='text' 
                    className='w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3' 
                /> 
                </div>

                <div>
                <label className="font-medium">Lot <span className="text-red-500">*</span></label>
            <input 
                    type='text' 
                    className='w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3' 
                />
                </div>

                <div>
                <label className="font-medium">House Number <span className="text-red-500">*</span></label>
            <input 
                    type='text' 
                    className='w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3' 
                />
                </div>
            </div>

            <label className="font-medium">Province <span className="text-red-500">*</span></label>
            <input 
                    type='text' 
                    className='w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3' 
                />

            <label className="font-medium">Baranggay <span className="text-red-500">*</span></label>
            <input 
                    type='text' 
                    className='w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3' 
                />

            <label className="font-medium">Region <span className="text-red-500">*</span></label>
            <input 
                    type='text' 
                    className='w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3' 
                />

            <label className="font-medium">City <span className="text-red-500">*</span></label>
            <input 
                    type='text' 
                    className='w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3' 
                />
          <label className="font-medium">Zip code <span className="text-red-500">*</span></label>
            <input 
                    type='text' 
                    className='w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3' 
                />


        <div className="py-5 ">
        <label className="font-medium fon-sans">Title <span className="text-red-500">*</span></label><br></br>
        <span className="text-xs font-sans">Enter a single sentence description of your professional skills/experience.</span>
            <input 
                    type='text' 
                    className='w-full px-3 py-2 text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 mb-3' 
                />
        </div>

        <div className="py-5 ">
        <label className="font-medium font-sans">Hourly Rate <span className="text-red-500">*</span></label><br></br>
                 <div className="flex justify-start items-center gap-3 ">
                  <div className="relative">
                   <input 
                    type='text' 
                    className="w-full pl-8 px-3 py-2  text-md font-medium border border-grey-200 rounded-md focus:outline-green-500 "
                />
                <div className="absolute inset-y-0 left-1 flex items-center">
               <TbCurrencyPeso className="w-6 h-6 text-primary" />
                </div>
                </div>

                <h1 className="font-sans font-medium">/hr</h1>
                </div>
        </div>


        <div className="py-6">
            <h1 className="font-sans font-medium text-lg text-center py-3 text-start pt-6">Overview</h1>
        <h1 className="font-sans text-sm">Use this space to show clients you have the skills and experience they're looking for.</h1>
        
        <ul className="font-sans text-xs space-y-3 py-3">
        <li>Describe your strength and skills</li>
        <li>Highlight projects, accomplishments and education</li>
        <li>Keep it short and simple</li>
        </ul>

        <textarea className="border border-grey-200 focus:outline-green-500" rows="7" cols="35">

        </textarea>
        </div>












    
            <h1 className="font-sans font-medium text-lg text-center py-3 text-start pt-6">Skills</h1>
       

         <div className="space-y-3">
         <select className="w-full px-3 py-2 border border-grey-200 rounded-md focus:outline-green-500">
         <option>Select Skills</option>
        <option>Painter</option>
        <option>Plumber</option>
        <option>Carpenter</option>
        <option>Masonry</option>
        <option>Framer</option>
        <option>Electrician</option>
        <option>Roofer</option>
        <option>PipeFitter</option>
         </select>

         <select className="w-full px-3 py-2 border border-grey-200 rounded-md focus:outline-green-500">
         <option>Years of Experienced</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8 and more</option>
         </select>

         <select className="w-full px-3 py-2 border border-grey-200 rounded-md focus:outline-green-500">
         <option>Select Skills</option>
        <option>Painter</option>
        <option>Plumber</option>
        <option>Carpenter</option>
        <option>Masonry</option>
        <option>Framer</option>
        <option>Electrician</option>
        <option>Roofer</option>
        <option>PipeFitter</option>
         </select>

         <select className="w-full px-3 py-2 border border-grey-200 rounded-md focus:outline-green-500">
         <option>Years of Experienced</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8 and more</option>
         </select>

         <select className="w-full px-3 py-2 border border-grey-200 rounded-md focus:outline-green-500">
         <option>Select Skills</option>
        <option>Painter</option>
        <option>Plumber</option>
        <option>Carpenter</option>
        <option>Masonry</option>
        <option>Framer</option>
        <option>Electrician</option>
        <option>Roofer</option>
        <option>PipeFitter</option>
         </select>

         <select className="w-full px-3 py-2 border border-grey-200 rounded-md focus:outline-green-500">
         <option>Years of Experienced</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8 and more</option>
         </select>

         </div>

        <div className="flex justify-between items-center py-6">
         <h1 className="font-sans font-medium text-lg text-center py-3">Certifications</h1>

         <a href="#" className="bg-primary font-sans text-white px-6 p-2 hover:bg-green-500">Add</a>
         </div>


         <div className="flex justify-between items-center py-6">
         <h1 className="font-sans font-medium text-lg text-center py-3">Employment history</h1>

         <a href="#" className="bg-primary font-sans text-white px-6 p-2 hover:bg-green-500">Add</a>
         </div>

         <div className="flex justify-between items-center py-6">
         <h1 className="font-sans font-medium text-lg text-center py-3">Other experience</h1>

         <a href="#" className="bg-primary font-sans text-white px-6 p-2 hover:bg-green-500">Add</a>
         </div>
            </form>
        </div>
     );
}

export default DashboardFixers;