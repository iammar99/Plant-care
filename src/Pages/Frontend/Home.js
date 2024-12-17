import React from 'react'
import Card from 'Components/Card'
import vid1 from '../../Assets/1st.webp'
import vid2 from '../../Assets/2nd.webp'
import vid3 from '../../Assets/search.png'
import vid4 from '../../Assets/growth.png'
import vid5 from '../../Assets/man.png'
import react from '../../Assets/react.png'
import plantid from '../../Assets/logo.png'
import meta from '../../Assets/llama.png'
import '../../SCSS/Pages/_home.scss'
import Carousel from '../../Components/Accordian'
import Header from 'Components/Header'
export default function Home() {
  return (
    <div>
      <Header />
      <section className='sect1' style={{ marginTop: "60px" }}>
        <div className="container">
          <div className="row">
            <h1 className='text-center'>What is PlantCare AI?</h1>
            <div className="col-lg-6 col-md-6 col-sm-12 mx-auto mt-5 " >
              <p className='mt-3 sect1-p text-center'>PlantCare AI is an advanced tool designed to support plant enthusiasts in nurturing and maintaining their greenery. Utilizing cutting-edge artificial intelligence, PlantCare AI analyzes plant images to identify diseases, recommend growth-enhancing solutions, and provide personalized care tips. By leveraging machine learning algorithms, the platform empowers users with accurate diagnoses and actionable insights, ensuring healthier and thriving plants. Whether you’re a beginner or an experienced gardener, PlantCare AI simplifies plant care, helping you cultivate a lush and vibrant indoor or outdoor garden effortlessly.</p>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 mx-auto" >
              <img src={vid1} className='' autoPlay loop muted style={{ width: "100%", height: "70%" }} />
            </div>
          </div>
        </div>
      </section>
      {/* ----Working section----- */}
      <section >
        <div className="container">
          <h1 className='text-center'>How to use PlantCare AI?</h1>
          <p>Its very simple and easy to use.</p>
          <div className="row">
            <div className="col">
              <h2 >Step 1: </h2>
              <p>Go to PlantCare Ai agent page.</p>
              <h2 >Step 2: </h2>
              <p>Upload / Take picture of the plant.</p>
              <h2 >Step 3:</h2>
              <p>After uploading the image, click Generate button.</p>
              <h2 > Step 4:</h2>
              <p>Ai will tell about the disease, precautions and treatment.</p>
            </div>
            <div className="col">
              <img src={vid2} autoPlay loop muted style={{ width: "100%", height: "100%", objectFit: "cover" }} ></img>
            </div>
          </div>
        </div>
      </section>
      {/* ----Need section----- */}
      <section className='mb-5'>
        <div className="container">
          <h1 className='text-center my-5'>Why we need PlantCare AI?</h1>
          <div className="row">
            <div className="col-md-4 mb-4">
              <Card
                title="Quick Disease Detection"
                description="Instantly identifies plant diseases through image analysis to prevent crop loss."
                video={vid3}
              />
            </div>
            <div className="col-md-4 mb-4">
              <Card
                title="Healthy Plant Growth"
                description="Provides tailored solutions to promote robust and healthy plants."
                video={vid4}
              />
            </div>
            <div className="col-md-4 mb-4">
              <Card
                title="Expert Guidance for All"
                description="Makes plant care advice accessible to both farmers and gardening enthusiasts."
                video={vid5}
              />
            </div>
          </div>
        </div>
      </section>
      {/* Tech Used */}
      <section style={{ marginTop: "120px" }}>
        <div className="container mt-2 text-center">
          <h1 className='mb-5'>Technologies Used</h1>
          <div className="row">
            <div className="col-md-4 col-sm-6 mb-3">
              <div className="card card-block p-4" data-aos="fade-in" style={{ height: "100%", width: "100%", margin: "auto" }}>
                <img src={react} style={{ width: "100px", height: "100px", margin: "auto" }} />
                <h5 className="card-title mt-3 mb-3">React JS</h5>
                <p className="card-text"> ReactJS for a seamless, dynamic, and user-friendly interface, ensuring a smooth experience for all users.</p>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 mb-3">
              <div className="card card-block p-4" data-aos="fade-in" style={{ height: "100%", width: "100%", margin: "auto" }}>
                <img src={plantid} style={{ width: "100px", height: "100px", margin: "auto" }} />
                <h5 className="card-title  mt-3 mb-3">Plant.id API</h5>
                <p className="card-text">Plant.id API for accurate plant identification and disease diagnosis, ensuring reliable and data-driven insights for plant care.</p>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 mb-3">
              <div className="card card-block p-4" data-aos="fade-in" style={{ height: "100%", width: "100%", margin: "auto" }}>
                <img src={meta} style={{ width: "100px", height: "100px", margin: "auto" }} />
                <h5 className="card-title  mt-3 mb-3">Llama-3.3-70B</h5>
                <p className="card-text"> Llama-3.3-70B Versatile by Groq for advanced natural language processing, ensuring precise and efficient AI-powered solutions</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Our Team */}
      <section style={{ marginTop: "120px" }}>
        <Carousel />
      </section>
    </div>
  )
}
