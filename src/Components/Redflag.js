import React, { useState, useEffect } from 'react';
import '../styles/Redflag.css'
// import { useParams } from 'react-router-dom';

const RedFlag = ({user}) => {
  
  console.log(user);
  // const { id } = useParams();
  const [redFlags, setRedFlags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [redFlagData, setRedFlagData] = useState({
    title: '',
    description: '',
    location: '',
    images: [],
    videos: [],
  });
  console.log(user)
  
  useEffect(() => {
    const apiUrl = `https://ireporter-backend.onrender.com/redflags`;
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setRedFlags(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    setRedFlagData({
      ...redFlagData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userId = user.id;
    fetch(`https://ireporter-backend.onrender.com/redflags`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(redFlagData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Success:', data);

        setRedFlagData({
          title: '',
          description: '',
          location: '',
          image: "",
          video: "",
          status: "pending",
          user_id: {userId},
        });
      })
      .catch((error) => {
        console.error('Error posting redflag:', error);
      });
  };

   
  return (
    <div id="redflag-container">
  <h2>Red-Flag Records</h2>
  <div>
    {loading ? (
      <p>Loading...</p>
    ) : (
      <div className="card-container">
        {redFlags.map((redFlag) => (
          <div key={redFlag.id} className="card">
            <h3>Title: {redFlag.status}</h3>
            <p>Description: </p>
            <p>Location: {redFlag.location}</p>
            <p>Status: {redFlag.status}</p>
            <p>Created at: {redFlag.created_at}</p>
            <img src={redFlag.image} alt="" />
            <div id="buttons">
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </div>
        ))}
      </div>
    )}
</div>
          <div className="form-div">
            <p id="paragraph">
              If you have witnessed an incident linked to corruption, please use this form to report the details.
              Your contribution helps in promoting transparency and fighting against corruption in our community.
            </p>
            <form onSubmit={handleSubmit}>
              <label>Title:</label>
              <input type="text" name="title" onChange={handleInputChange} required placeholder='Enter title'/>

              <label>Description:</label>
              <textarea name="description" onChange={handleInputChange} required placeholder='Describe the incident'/>

              <label>Location:</label>
              <input type="text" name="location" onChange={handleInputChange} required placeholder='Enter the location'/>

              <label>Images:</label>
              <input type="file" onChange={handleInputChange} placeholder='Enter image URL'/>

              <label>Videos:</label>
              <input type="text" onChange={handleInputChange} placeholder='Enter video URL'/>

              <button id="submit-btn" type="submit">Submit</button>
            </form>
          </div>
    </div>
  );
};

export default RedFlag;

// import React, { useState, useEffect } from 'react';
// import '../styles/Redflag.css';
// import { useParams } from 'react-router-dom';

// const RedFlag = ({ user }) => {
//   const { id } = useParams();
//   const [redFlags, setRedFlags] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [redFlagData, setRedFlagData] = useState({
//     title: '',
//     description: '',
//     location: '',
//     images: [],
//     videos: [],
//   });
//   console.log(user)

//   const fetchRedFlags = () => {
//     const userId = user.id;
//     if (!user || !user.id) {
//       console.error('User or user id is undefined');
//       return;
//     }

//     const apiUrl = `https://ireporter-backend.onrender.com/user/${userId}`;
//     fetch(apiUrl)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`Network response was not ok: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setRedFlags(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       });
//   };

//   const postRedFlag = () => {
//     const userId = user.id;

//     fetch(`https://ireporter-backend.onrender.com/user/${userId}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ ...redFlagData, user_id: userId }),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`Network response was not ok: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         console.log('Success:', data);

//         setRedFlagData({
//           title: '',
//           description: '',
//           location: '',
//           images: '',
//           videos: '',
//         });

//         fetchRedFlags();
//       })
//       .catch((error) => {
//         console.error('Error posting redflag:', error);
//       });
//   };

//   useEffect(() => {
//     fetchRedFlags();
//   }, [id, user?.id]);

//   const handleInputChange = (e) => {
//     setRedFlagData({
//       ...redFlagData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     postRedFlag();
//   };

//   return (
//     <div id="redflag-container">
//    <h2>Red-Flag Records</h2>
//    <div>
//      {loading ? (
//        <p>Loading...</p>
//      ) : (
//        <div className="card-container">
//          {redFlags.map((redFlag) => (
//            <div key={redFlag.id} className="card">
//              <h3>Title: {redFlag.status}</h3>
//              <p>Description: </p>
//              <p>Location: {redFlag.location}</p>
//              <p>Status: {redFlag.status}</p>
//              <p>Created at: {redFlag.created_at}</p>
//              <img src={redFlag.image} alt="" />
//              <div id="buttons">
//                <button>Edit</button>
//                <button>Delete</button>
//              </div>
//            </div>
//          ))}
//        </div>
//      )}
//  </div>
//            <div className="form-div">
//              <p id="paragraph">
//                If you have witnessed an incident linked to corruption, please use this form to report the details.
//                Your contribution helps in promoting transparency and fighting against corruption in our community.
//              </p>
//              <form onSubmit={handleSubmit}>
//                <label>Title:</label>
//                <input type="text" name="title" onChange={handleInputChange} required placeholder='Enter title'/>

//                <label>Description:</label>
//                <textarea name="description" onChange={handleInputChange} required placeholder='Describe the incident'/>

//                <label>Location:</label>
//                <input type="text" name="location" onChange={handleInputChange} required placeholder='Enter the location'/>

//                <label>Images:</label>
//                <input type="text" onChange={handleInputChange} placeholder='Enter image URL'/>

//                <label>Videos:</label>
//                <input type="text" onChange={handleInputChange} placeholder='Enter video URL'/>

//                <button id="submit-btn" type="submit">Submit</button>
//              </form>
//            </div>
//      </div>
//   );
// };

// export default RedFlag;