import { useState} from "react";
import { SlLocationPin } from "react-icons/sl";


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
            fetch('http://127.0.0.1:8000/redflags',{
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
{/* 
        {user? (
            <h1>Hello</h1>
        ):
        <p></p>} */}

        {(user && user.red_flag_records)?(
            <>  

        <div className="flex flex-row flex-wrap"> 

            {user.red_flag_records.map((redFlag) => (              
                <div key={redFlag.id} className="max-w-sm rounded overflow-hidden w-11/12 m-auto  p-1">
                    <p className=" text-black text-2xl flex items-center">
                        <SlLocationPin className="text-blue-500 text-2xl w-6 mr-2" />
                        {redFlag.location}
                    </p>
                    <img className="w-full rounded-lg" src={redFlag.image} alt="ireporter"/>
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2"> Title: {redFlag.title}</div>
                        <p className="text-gray-700 text-base">
                           Description: {redFlag.description}
                        </p>
                    </div>
                    
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
            <p>You have no Records yet...</p>
        }

        
        
        </>


        <form onSubmit={handleSubmit}> 
        <label className="text-black">Title:</label>
        <input type="text" onChange={(e)=>setTitle(e.target.value)}/>
        <label className="text-black">Description:</label>
        <input type="text" onChange={(e)=>setDescription(e.target.value)}/>
        <label className="text-black">Image:</label>
        <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
        <label className="text-black">Location:</label>
        <input type="text" onChange={(e)=>setLocation(e.target.value)}/>
        <button type="submit">Submit</button>
        </form>
        
    </div>
  )
}

export default Landing