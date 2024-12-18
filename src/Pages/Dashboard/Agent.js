import React, { useState, useRef, useCallback } from 'react'
import Webcam from "react-webcam";
import { Link } from 'react-router-dom'
import Groq from 'groq-sdk';
import logo from "../../Assets/growth.png"
import profile from "../../Assets/profile.png"
import { marked } from 'marked';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import { fireStore } from 'Config/firebase';
import { setDoc, doc } from 'firebase/firestore';



export default function Agent() {

  const user = JSON.parse(localStorage.getItem("User"))
  const [base64, setBase64] = useState(null)
  const [loading, setLoading] = useState(false)

  // For getting image and converting it into 64 base

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // For getting results
  let Plant_API = process.env.REACT_APP_PLANT_ID_API;
  let GROQ_API = process.env.REACT_APP_GROQ_API
  const groq = new Groq({ apiKey: GROQ_API, dangerouslyAllowBrowser: true });





  const [plantName, setPlantName] = useState('');
  const [diseaseName, setDiseaseName] = useState('');
  const [nonMarked, setNonMarked] = useState('');
  const [detail, setDetail] = useState('');

  // Function to get results

  async function plantDiseaseInfo(diseaseName) {
    return groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `You are a highly knowledgeable plant expert. Based on the following plant disease name, provide a comprehensive and detailed response including the disease name, its symptoms, causes, cure, and precautions. The response should be thorough and informative. Do not leave any sections out.\n
                  **Disease Details**:\n
                  - Disease Name: ${diseaseName}\n\n
                  **Response Format**:\n
                  1. **Name**: The full name of the disease.\n
                  2. **Symptoms**: A detailed list of symptoms associated with this disease. Include common signs on the plant.\n
                  3. **Causes**: The underlying causes or conditions that lead to this disease.\n
                  4. **Cure**: Recommended treatments and medicines to cure this disease, including any specific products.\n
                  5. **Precautions**: Preventive measures to avoid this disease in the future, including maintenance tips and best practices for plant care.\n\n
                  Please ensure the response is well-structured and includes all the details requested above.`
        }
      ],
      model: "llama3-8b-8192", // Your specified model
    });
  }


  const handleSubmit = async () => {
    if (base64) {
      setLoading(true)
      var myHeaders = new Headers();
      myHeaders.append("Api-Key", Plant_API);
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "images": [base64],
        "latitude": 49.207,
        "longitude": 16.608,
        "similar_images": true
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      try {
        // Fetch response from Plant.id API
        const response = await fetch("https://plant.id/api/v3/identification?details=common_names,url,description,taxonomy,rank,gbif_id,inaturalist_id,image,synonyms,edible_parts,watering,best_light_condition,best_soil_type,common_uses,cultural_significance,toxicity,best_watering&language=en", requestOptions)

        // Get result as JSON
        const result = await response.json();

        // Get suggestions from the result
        const suggestions = result.result.classification.suggestions;

        // Initialize plant and disease name variables
        let plantName = '';
        let diseaseName = '';

        // Iterate through suggestions to find plant and disease names
        suggestions.forEach(item => {
          if (item.details && item.details.taxonomy) {
            // Check for plant (kingdom Plantae)
            if (item.details.taxonomy.kingdom === 'Plantae' && !plantName) {
              plantName = item.name;
            }

            // Check for disease (kingdom Fungi)
            else if (item.details.taxonomy.kingdom === 'Fungi' && !diseaseName) {
              diseaseName = item.name;
            }
          }
        });

        // Get Groq detail for the disease name
        const newResponse = await plantDiseaseInfo(diseaseName);
        const groqContent = newResponse.choices[0].message.content;
        setNonMarked(groqContent)
        const formattedData = marked(groqContent)

        // Set the extracted plant and disease names in state
        setDetail(formattedData)
        setPlantName(plantName);
        setDiseaseName(diseaseName);
        const now = new Date();
        const currentTime = now.toLocaleTimeString();
        let id = Math.floor(10000000 + Math.random() * 90000000).toString();
        let obj = {
          img: base64,
          details: formattedData,
          time: currentTime,
          userId: user.ID
        }
        console.log(detail)
        console.log(obj)
        setDoc(doc(fireStore, "History", id), obj)
      } catch (error) {
        console.log('error', error);
      } finally {
        setLoading(false)
      }
    }
    else {
      toast.warn("Please enter input", {
        theme: "dark"
      })
    }
  };


  // Styling for webcam

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

  // Funvtion to capture image

  const webcamRef = useRef(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setBase64(imageSrc)
  },
    [webcamRef]
  );

  // Styling for buttons

  const btnStyle = {
    width: "186px",
    margin: "auto",
    height: "50px",
    background: "linear-gradient(0deg, #3BBF91, #307750)",
    boxShadow: `
      inset 0px 1px 0px 0px rgba(255, 255, 255, 0.4),
      inset 0px -4px 0px 0px rgba(0, 0, 0, 0.2),
      0px 0px 0px 4px rgba(255, 255, 255, 0.2),
      0px 0px 180px 0px #29A67E
    `,
    transform: "translateY(-2px)"
  };


  return (
    <main>
      {/* ----------- Logo ----------------- */}

      <div className="d-flex justify-content-between px-4">
        <Link className='text-decoration-none' style={{ color: "black" }} to={"/"}>
          <img src={logo} alt="" style={{ "width": "9%", "margin": "15px 10px 10px 15px" }} />
        </Link>
        <Link to={"/dashboard/profile"} style={{"alignItems":"center","display":"flex"}}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width={50}
            height={50}
            viewBox="0 0 48 48"
          >
            <path d="M 24 4 C 12.972066 4 4 12.972074 4 24 C 4 35.027926 12.972066 44 24 44 C 35.027934 44 44 35.027926 44 24 C 44 12.972074 35.027934 4 24 4 z M 24 7 C 33.406615 7 41 14.593391 41 24 C 41 33.406609 33.406615 41 24 41 C 14.593385 41 7 33.406609 7 24 C 7 14.593391 14.593385 7 24 7 z M 24 12 C 22.125 12 20.528815 12.757133 19.503906 13.910156 C 18.478997 15.063179 18 16.541667 18 18 C 18 19.458333 18.478997 20.936821 19.503906 22.089844 C 20.528815 23.242867 22.125 24 24 24 C 25.875 24 27.471185 23.242867 28.496094 22.089844 C 29.521003 20.936821 30 19.458333 30 18 C 30 16.541667 29.521003 15.063179 28.496094 13.910156 C 27.471185 12.757133 25.875 12 24 12 z M 24 15 C 25.124999 15 25.778816 15.367867 26.253906 15.902344 C 26.728997 16.436821 27 17.208333 27 18 C 27 18.791667 26.728997 19.563179 26.253906 20.097656 C 25.778816 20.632133 25.124999 21 24 21 C 22.875001 21 22.221184 20.632133 21.746094 20.097656 C 21.271003 19.563179 21 18.791667 21 18 C 21 17.208333 21.271003 16.436821 21.746094 15.902344 C 22.221184 15.367867 22.875001 15 24 15 z M 17.259766 26 C 15.478261 26 14 27.477066 14 29.259766 L 14 30.341797 C 14 32.32976 15.256514 34.057405 17.046875 35.199219 C 18.837236 36.341033 21.229275 37.001953 24 37.001953 C 26.770725 37.001953 29.162764 36.341033 30.953125 35.199219 C 32.743486 34.057405 34 32.32976 34 30.341797 L 34 29.259766 C 34 27.478261 32.522934 26 30.740234 26 L 17.259766 26 z M 17.259766 29 L 30.740234 29 C 30.901535 29 31 29.09927 31 29.259766 L 31 30.341797 C 31 31.053834 30.535733 31.907236 29.339844 32.669922 C 28.143954 33.432608 26.284275 34.001953 24 34.001953 C 21.715725 34.001953 19.856046 33.432608 18.660156 32.669922 C 17.464267 31.907236 17 31.053834 17 30.341797 L 17 29.259766 C 17 29.098465 17.09927 29 17.259766 29 z" />
          </svg>

          {/* <img src={profile} alt="" className='d-block ms-auto' style={{ "width": "17%", "margin": "15px 10px 10px 15px" }} /> */}
        </Link>
      </div>

      {/* ---Live Preview--------- */}
      <div className="container">
        <div className="row">
          <div className="col d-flex justify-content-center">
            <div className="live-preview d-flex justify-content-center aligh-items-center" style={{ width: "30%", height: "200px" }}>
              {base64 && <img src={base64} alt="preview" />}
            </div>
          </div>
        </div>
      </div>

      {/* ---Buttons--------- */}

      <div className="container">
        <div className="row my-2">
          <div className="col text-center d-flex justify-content-center flex-column flex-sm-row">
            {/* Button trigger modal / Camera opening btton */}
            <button className="container-btn-file  mb-2 mb-sm-0 ms-auto " style={btnStyle} data-bs-toggle="modal" data-bs-target="#exampleModal">
              <svg
                viewBox="0 0 1024 1024"
                fill="currentColor"
                height="20px"
                width="2em"
              >
                <path d="M864 260H728l-32.4-90.8a32.07 32.07 0 00-30.2-21.2H358.6c-13.5 0-25.6 8.5-30.1 21.2L296 260H160c-44.2 0-80 35.8-80 80v456c0 44.2 35.8 80 80 80h704c44.2 0 80-35.8 80-80V340c0-44.2-35.8-80-80-80zM512 716c-88.4 0-160-71.6-160-160s71.6-160 160-160 160 71.6 160 160-71.6 160-160 160zm-96-160a96 96 0 10192 0 96 96 0 10-192 0z" />
              </svg>
              Take an IMG
            </button>
            {/* Button Upload image */}
            <button className="container-btn-file  mt-2 mt-sm-0" style={btnStyle} >
              <svg
                fill="currentColor"
                viewBox="0 0 16 16"
                height="20px"
                width="2em"
              >
                <path d="M6.002 5.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M1.5 2A1.5 1.5 0 000 3.5v9A1.5 1.5 0 001.5 14h13a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0014.5 2h-13zm13 1a.5.5 0 01.5.5v6l-3.775-1.947a.5.5 0 00-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 00-.63.062L1.002 12v.54A.505.505 0 011 12.5v-9a.5.5 0 01.5-.5h13z" />
              </svg>
              Upload IMG
              <input type="file" onChange={handleImageUpload} />
            </button>
          </div>
        </div>
        <div className="row my-4">
          <div className="col text-center d-flex justify-content-center flex-column flex-sm-row">
            {/* Generate image */}

            <button className="btn" style={btnStyle} onClick={handleSubmit}>
              <svg height="24" width="24" fill="#FFFFFF" viewBox="0 0 24 24" data-name="Layer 1" id="Layer_1" className="sparkle">
                <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
              </svg>

              <span className="text">
                {loading ? "loading..." : "Generate"}
              </span>
            </button>
          </div>
        </div>
      </div>



      {/* ------- Details--------- */}

      <div className="container my-5 ">
        <div className="row">
          <div className="col">
            <div className="data rounded-2 " style={{ "minHeight": "300px", "padding": "15px 27px", "border": "0.1px solid #a5a5a5" }}>
              <div dangerouslySetInnerHTML={{ __html: detail }} />
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Take A Photo
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <Webcam audio={false} height={250} ref={webcamRef} screenshotFormat="image/jpeg" style={{ "width": "100%", "height": "250px", "margin": "auto" }} videoConstraints={videoConstraints} />
            </div>
            <div className="modal-footer">
              <button className="capture mx-auto" style={{ "width": "50px", "height": "50px", "borderRadius": "50%", "border": "12px #d1d1d1 solid" }} data-bs-dismiss="modal" aria-label="Close" onClick={capture}>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Toast Container */}
      <ToastContainer />
    </main>
  )
}
