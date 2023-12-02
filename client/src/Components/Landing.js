import { useState} from "react";
import { SlLocationPin } from "react-icons/sl";
import Button from "./Button";


function Landing({user}) {
    const [title,setTitle]=useState('')
    const [description,setDescription]=useState('')
    const [image,setImage]=useState()
    const [location,setLocation]=useState('')
    const [url,setUrl]=useState('')
    console.log(user);

    //handleSubmit function, plus upload image url to database
    function handleSubmit(e){
        e.preventDefault()
        uploadImage()  
        // e.target.reset()
    }
   

    const uploadImage = () => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "ireporter")
        data.append("cloud_name","mercy")
        fetch("https://api.cloudinary.com/v1_1/dtzodxlmb/image/upload",{
        method:"post",
        body: data
        })
        .then(resp => resp.json())
        .then(data => {
        setUrl(data.url)
            fetch('http://127.0.0.1:5555/redflags',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title:title,
                    description: description,
                    image: url,
                    location:location,
                    status:'pending',
                    user_id:user.id
                }),
            })
            .then(res=>res.json())
            .then(data=>console.log(data))
            .catch(e=>console.log(e))
            })
            .catch(err => console.log(err))    
        }
    
    
  return (
    <div className="bg-color-primary ">
        <>

        {/* {user? (
            <h1>You have no Records yet...</h1>
        ):
        <p></p>} */}

        {(user && user.red_flag_records)?(
            <>  

        <div className="flex flex-row flex-wrap"> 

            {user.red_flag_records.map((redFlag) => (              
                <div key={redFlag.id} className="max-w-sm rounded-lg mt-4 overflow-hidden shadow-lg w-11/12 m-auto  p-1">
                    <img className="w-full rounded-sm hover:scale-105" src={redFlag.image} alt="ireporter"/>
                   
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2"> Title: {redFlag.title}</div>
                        <p className="text-gray-700 text-base">
                           Description: {redFlag.description}
                        </p>
                    </div>
                    <p className=" text-black text-1xl flex items-center px-6 ">
                    Location<SlLocationPin className="text-blue-500 w-6 mr-2" />:
                        {redFlag.location}
                    </p>
                    
                    <div className="flex items-center">
                        <img className="w-10 h-10 rounded-full mr-4" src={redFlag.image} alt="redflag-record"/>
                        <div className="text-sm">
                            <p className="text-gray-900 leading-none">Status: {redFlag.status}</p>
                            <p className="text-gray-600">Created at: {redFlag.created_at}</p>
                        </div>
                    </div>
                </div>
             
            ))}

        </div>

            </>

            
            ):
            <p></p>
        }

        
        
        </>


        <form className='flex flex-col content-center mb-1 justify-center bg-color-blue   max-w-xs w-full' onSubmit={handleSubmit}> 
        <label className="m-2 text-color-tertiary font-bold">Title:</label>
        <input type="text" className="text-rich-black px-2 rounded" onChange={(e)=>setTitle(e.target.value)}/>
        <label className="m-2 text-color-tertiary font-bold">Description:</label>
        <input type="text" className="text-rich-black px-2 rounded"  onChange={(e)=>setDescription(e.target.value)}/>
        <label className="m-2 text-color-tertiary font-bold">Image:</label>
        <input type="file" className="text-rich-black px-2 rounded"  onChange={(e)=>setImage(e.target.files[0])}/>
        <label className="m-2 text-color-tertiary font-bold">Location:</label>
        <input type="text" className="text-rich-black px-2 rounded"  onChange={(e)=>setLocation(e.target.value)}/>
        <Button type='submit' content='Submit' className='text-sm bg-color-blue2 my-5 mx-auto py-2  w-2/6' />
        </form>
        
    </div>
  )
}

export default Landing