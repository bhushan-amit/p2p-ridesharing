import React, {useState} from 'react'
import { useRouter } from 'next/navigation'

function Login() {
   
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [userType,setuserType]=useState("Rider")
   
    const Router=useRouter()
    function handleSubmit(e){
        e.preventDefault();
        console.log(password)
        console.log(email)
        validateCredentials(password,email)
        console.log(userType)
        if(userType==""){
            
        }else if (userType=="Rider"){
            //redirect to /main
            Router.push("/main")
        }else if(userType=="Driver"){
            //reditect to /driver
            Router.push("/driver")
        }
    }

    function handleSelection(e){
        setuserType(e.target.value) 
    }
 
    function validateCredentials(password,email){
        return true;
    }
  return (
    <div>
        
<form onSubmit={handleSubmit}>
  <div className="mb-6">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@p2pRideShare.com" required
        onChange={(e) => setEmail(e.target.value)}/>
  </div>
  <div className="mb-6">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
        onChange={(e) => setPassword(e.target.value)}/>
  </div>
  <label htmlFor="usertype" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select User Type </label>
        <select id="usertype" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
         onChange={(e) => handleSelection(e)} value={userType}>
        
        <option value="Rider">Rider</option>
        <option value="Driver">Driver</option>
        
        </select>
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>

    </div>
  )
}

export default Login