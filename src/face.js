// FaceTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const FaceTable = () => {
  const [unrecognisedFaces, setUnrecognisedFaces] = useState([]);
  const [recognisedFaces, setRecognisedFaces] = useState([]);
  const [nameInputs, setNameInputs] = useState([]);
  const [setShowRecognitionSuccess] = useState(false);

  const fetchUnrecognisedFaces = async () => {
    try {
      const unrecognisedResponse = await axios.get('https://facerecognition-47b7.onrender.com/faces/unrecognised');
      setUnrecognisedFaces(unrecognisedResponse.data);
      setNameInputs(Array(unrecognisedResponse.data.length).fill(''));
    } catch (error) {
      console.error('Error fetching unrecognised faces:', error);
    }
  };

  const fetchRecognisedFaces = async () => {
    try {
      const recognisedResponse = await axios.get('https://facerecognition-47b7.onrender.com/faces/recognised');
      setRecognisedFaces(recognisedResponse.data);
    } catch (error) {
      console.error('Error fetching recognised faces:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchUnrecognisedFaces();
      await fetchRecognisedFaces();
    };

    fetchData();

    // Polling interval (e.g., every 5 seconds)
    const intervalId = setInterval(fetchData, 60000);

    return () => {
      clearInterval(intervalId); // Cleanup interval on component unmount
    };
  }, []); // Empty dependency array means this effect runs once after the initial render

  const recogniseFace = async (event, id, name, index) => {
    event.preventDefault(); // Prevent the default form submission behavior

    if (!name) {
      alert('Please enter a name before recognising the face.');
      return;
    }

    try {
      await axios.post(`https://facerecognition-47b7.onrender.com/faces/recognise/${id}`, { name });
      setUnrecognisedFaces((prevFaces) => prevFaces.filter((face) => face._id !== id));
      setRecognisedFaces((prevFaces) => [
        ...prevFaces,
        { _id: new Date().getTime(), name, image: unrecognisedFaces.find((face) => face._id === id).image },
      ]);
      setNameInputs((prevInputs) => {
        const newInputs = [...prevInputs];
        newInputs[index] = ''; // Clear the input after recognition
        return newInputs;
      });
      setShowRecognitionSuccess(true); // Show the success alert
    } catch (error) {
      console.error('Error recognising face:', error);
    }
  };

  return (
    <div className="container">
      <div>
        <h2>Unrecognised Faces</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {unrecognisedFaces.map((face, index) => (
              <tr key={face._id}>
                <td>{face._id}</td>
                <td>
                  <img src={`data:image/jpeg;base64,${arrayBufferToBase64(face.image.data)}`} alt="Face" />
                </td>
                <td>
                  <form onSubmit={(e) => recogniseFace(e, face._id, nameInputs[index], index)}>
                    <input
                      type="text"
                      placeholder="Enter Name"
                      value={nameInputs[index] || ''}
                      onChange={(e) => {
                        const newInputs = [...nameInputs];
                        newInputs[index] = e.target.value;
                        setNameInputs(newInputs);
                      }}
                    />
                    <button type="submit">Recognise</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2>Recognised Faces</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {recognisedFaces.map((face) => (
              <tr key={face._id}>
                <td>{face._id}</td>
                <td>{face.name}</td>
                <td>
                  <img src={`data:image/jpeg;base64,${arrayBufferToBase64(face.image.data)}`} alt="Face" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

const arrayBufferToBase64 = (buffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

export default FaceTable;
