import { useState} from "react";
import { SlLocationPin } from "react-icons/sl";
import Button from "./Button";
import { useSnackbar } from 'notistack';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";


function Landing({user, refresh, setRefresh}) {
    const [title,setTitle]=useState('')
    const [description,setDescription]=useState('')
    const [image,setImage]=useState()
    const [location,setLocation]=useState('')
    const [url,setUrl]=useState('')



    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    //delete Intervention record
    function handledelete(id) {

        enqueueSnackbar("Are you sure you want to delete this item?", {
            variant:'info',
            action: (key) => (
                <>
                    <Button  className={'hover:bg-transparent hover:text-black'} content={'Confirm'} onClick={() => { 
                        closeSnackbar(key);
                        fetch(`/intervention/${id}`, {
                            method: "DELETE",
                            headers: {
                                "Content-type": "application/json",
                            },
                        })
                        .then((res) => res.json())
                        .then((data) => {
                            enqueueSnackbar(data.message, { variant: 'info' });
                            setRefresh(!refresh);
                            console.log(data);
                        });
                    }}/>
                        
                 
                    <Button className={'hover:bg-transparent hover:text-black'} content={'Cancel'} onClick={() => closeSnackbar(key)}/>
                       
                </>
            ),
        });
    }
    


    //handleSubmit function, plus upload image url to database
    function handleSubmit(e){
        e.preventDefault()
        uploadImage()  
    }

    const uploadImage = () => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "ireporter");
        data.append("cloud_name", "mercy");
    
        fetch("https://api.cloudinary.com/v1_1/dtzodxlmb/image/upload", {
            method: "post",
            body: data,
        })
        .then((resp) => resp.json())
        .then((data) => {
            // Check if Cloudinary upload was successful and URL is obtained
            if (data.url) {
                // setUrl(data.url);
    
                fetch('/intervention', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title: title,
                        description: description,
                        image: data.url, 
                        location: location,
                        status: 'pending',
                        user_id: user.id,
                    }),
                })
                .then((res) => {
                    if (res.status === 200) {
                        enqueueSnackbar('Record posted!', { variant: 'success' });
                        return res.json();
                    } else {
                        return res.json().then((data) => {
                            enqueueSnackbar('Record post failed', { variant: 'error' });
                            console.log(data);
                        });
                    }
                })
                .then(() => setRefresh(!refresh))
                .catch((e) => console.log(e));
            } else {
                
                enqueueSnackbar('Image upload failed', { variant: 'error' });
            }
        })
        .catch((err) => console.log(err));
    }
    



        //update Records

    const [updateTitle,setUpdateTitle]=useState('')
    const [updateDescription,setUpdateDescription]=useState('')
    const [updateLocation,setUpdateLocation]=useState('')
    const[isEditing,setEditing]=useState(null)

    function editingRecord(id, newDescription, newTitle, newLocation){
        setEditing(id)
        setUpdateDescription(newDescription)
        setUpdateTitle(newTitle)
        setUpdateLocation(newLocation)
    }


    function updateRecords(intervention){

        fetch(`/intervention/${intervention.id}`,{
        method:"PATCH",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            title: updateTitle,
            description: updateDescription,
            location: updateLocation            
        })
        })
        .then(response=>response.json())
        .then(data=>{
        setRefresh(!refresh);
        setEditing(null)
        console.log(data)
        enqueueSnackbar("Record Updated", {variant:'success'})
        
        })
        .catch(error=>console.log(error))
    }
        
    
  return (
    <div className="bg-color-primary ">
        <>
      

        {(user && user.intervention_records)?(
            <>  
              <h1 className="text-color-blue2 font-medium p-3 text-3xl text-center">Your intervention Records</h1>

        <div className="flex flex-wrap"> 

            {user.intervention_records.map((intervention) => (              
                <div key={intervention.id} className="flex flex-row flex-wrap rounded-lg mt-4 overflow-hidden shadow-lg w-8/12 m-auto p-1">
                <img className="w-96 h-96 object-cover rounded-md hover:scale-105" src={intervention.image} alt="ireporter"/>
               
                <div className="w-8/12 m-auto px-6 py-4">
                    <div className="font-medium text-xl mb-2"> 
                        {isEditing === intervention.id ? (
                        <>
                            Title: <input type="text" className="rounded-md" value={updateTitle} onChange={(e) => setUpdateTitle(e.target.value)} />
                        </>
                    ) : (
                        <>Title: {intervention.title}</>
                    )}
                    </div>
                    <p className="text-gray-700 text-base">
                        {isEditing === intervention.id ? (
                        <>
                            Description: <textarea value={updateDescription} className="rounded-md" onChange={(e) => setUpdateDescription(e.target.value)} />
                        </>
                    ) : (
                         <>Description: {intervention.description}</>
                    )}

                    </p>

                    <p className=" text-black font-semibold text-1xl flex items-center mt-10">
                    {isEditing === intervention.id ? (                  
                    <>
                        Location:
                        <input value={updateLocation} type="text" className="m-2 rounded-md" onChange={(e) => setUpdateLocation(e.target.value)} />
                    </>
                ) : (
                    <>Location<SlLocationPin className="text-blue-500 w-6" />: {intervention.location}</>
                )}
                </p>
                 
                <div className="flex items-center p-2">
                    <img className="w-10 h-10 rounded-full mr-4" src={intervention.image} alt="intervention-record"/>
                    <div className="text-xl mt-7">
                        <p className="text-color-blue2 leading-none">Status: {intervention.status}</p>
                        <p className="text-gray-600">Created at: {intervention.created_at}</p>
                    </div>
                </div>

                {intervention.status === 'pending' && (
                  <div className="flex items-center justify-between mt-3">
                    {isEditing === intervention.id ? (
                      <>
                        <button
                          onClick={() => updateRecords(intervention)}
                          className="px-2 py-1 ml-3 mr-2 bg-color-blue2 hover:bg-color-secondary text-white rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditing(null)}
                          className="px-2 py-1 bg-color-red text-white rounded"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                        <div className="flex text-2xl items-center justify-evenly"> 
                            <Button className="text-color-tertiary hover:text-blue-500  hover:bg-transparent" content={<MdEdit onClick={(()=>editingRecord(intervention.id,intervention.description,intervention.title,intervention.location))} />}/>
                            <Button className=" text-color-tertiary hover:bg-transparent hover:text-color-red" onClick={()=>handledelete(intervention.id)}  content={<MdDelete  />}/> 
                        </div>
                        
                    )}
                  </div>

                )}

                </div>                   


            </div>
             
            ))}

        </div>

            </>
 
            ):
            <p></p>
        }        
        
        </>
        <p className="text-gray-600 font-medium m-10 ml-40 text-2xl text-center" >
              If you have witnessed an incident linked to corruption, please use this form to report the details.
              Your contribution helps in promoting transparency and fighting against corruption in our community.
        </p>


        <form className='flex flex-col content-center mb-1 justify-center bg-color-blue   max-w-xs w-full' onSubmit={handleSubmit}> 
            <label className="m-2 text-color-tertiary font-bold">Title:</label>
            <input type="text" className="text-rich-black px-2 rounded" onChange={(e)=>setTitle(e.target.value)}/>
            <label className="m-2 text-color-tertiary font-bold">Description:</label>
            <textarea className="text-rich-black px-2 rounded"  onChange={(e)=>setDescription(e.target.value)}/>
            <label className="m-2 text-color-tertiary font-bold">Location:</label>
            <input type="text" className="text-rich-black px-2 rounded"  onChange={(e)=>setLocation(e.target.value)}/>
            <label className="m-2 text-color-tertiary font-bold">Image:</label>
            <input type="file" className="text-rich-black px-2 rounded"  onChange={(e)=>setImage(e.target.files[0])}/>
            
            <Button type='submit' content='Submit' className='text-sm bg-color-blue2 my-5 mx-auto py-2  w-2/6' />
        </form>
        
    </div>
  )
}

export default Landing