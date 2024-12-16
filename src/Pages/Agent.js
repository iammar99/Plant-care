import React, { useState, useRef, useCallback } from 'react'
import Webcam from "react-webcam";
import { Link } from 'react-router-dom'
import Groq from 'groq-sdk';
import logo from "../Assets/growth.png"
import { marked } from 'marked';
import { ToastContainer , toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"


export default function Agent() {

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
        console.log(JSON.stringify(newResponse.choices[0].message.content))
        const groqContent = newResponse.choices[0].message.content;
        const formattedData = marked(groqContent)

        // Set the extracted plant and disease names in state
        setDetail(formattedData)
        setPlantName(plantName);
        setDiseaseName(diseaseName);
        console.log("first")
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
    "width": "186px",
    "margin": "auto"
  }

  return (
    <main>
      {/* ----------- Logo ----------------- */}
      <Link className='text-decoration-none' style={{ color: "black" }} to={"/"}>
        <img src={logo} alt="" style={{ "width": "9%", "margin": "15px 10px 10px 15px" }} />
      </Link>

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
                height="2em"
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
                height="2em"
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
            <button className="generate-button" style={btnStyle} onClick={handleSubmit}>
              <div className="inner">
                <div className="svgs">
                  <svg
                    viewBox="0 0 256 256"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                    className="svg-l"
                  >
                    <path
                      d="M240 128a15.79 15.79 0 0 1-10.5 15l-63.44 23.07L143 229.5a16 16 0 0 1-30 0l-23.06-63.44L26.5 143a16 16 0 0 1 0-30l63.44-23.06L113 26.5a16 16 0 0 1 30 0l23.07 63.44L229.5 113a15.79 15.79 0 0 1 10.5 15"
                      fill="currentColor"
                    />
                  </svg>
                  <svg
                    viewBox="0 0 256 256"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                    className="svg-s"
                  >
                    <path
                      d="M240 128a15.79 15.79 0 0 1-10.5 15l-63.44 23.07L143 229.5a16 16 0 0 1-30 0l-23.06-63.44L26.5 143a16 16 0 0 1 0-30l63.44-23.06L113 26.5a16 16 0 0 1 30 0l23.07 63.44L229.5 113a15.79 15.79 0 0 1 10.5 15"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                {loading ? "loading..." : "generate"}
                {/* Generate */}
              </div>
            </button>
          </div>
        </div>
      </div>



      {/* ------- Details--------- */}

      <div className="container my-5">
        <div className="row">
          <div className="col">
            <div className="data rounded-2" style={{ border: "1px solid", minHeight: "300px", "padding": "15px 27px" }}>
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
              <Webcam audio={false} height={250} ref={webcamRef} screenshotFormat="image/jpeg" width={470} videoConstraints={videoConstraints} />
            </div>
            <div className="modal-footer">
              <button className="capture mx-auto" style={{ "width": "50px", "height": "50px", "borderRadius": "50%", "border": "12px #d1d1d1 solid" }}data-bs-dismiss="modal"aria-label="Close" onClick={capture}>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Toast Container */}
      <ToastContainer/>
    </main>
  )
}
