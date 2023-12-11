import {useNavigate } from "react-router-dom";

const NotFound = () => {
    let navigate = useNavigate();
    
    return ( 
        <div className="text-center">
            <h2 className="p-3 text-red-600">Error 404</h2>
            <p className="p-4 text-2xl text-red-700 ">Page Not Found</p>
            <button className="bg-color-blue2" onClick={()=>navigate("/")}> Back Home </button>
        </div>
     );
}
 
export default NotFound;