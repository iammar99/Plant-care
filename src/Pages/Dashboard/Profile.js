import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import back from "Assets/back.png"
import { collection, query, where, getDocs } from "firebase/firestore";
import { fireStore } from 'Config/firebase';
import DataLoader from 'Components/Screen Loader/DataLoader';
//  -------------  FireBase - Logout -------------
import { signOut } from 'firebase/auth'
import { auth } from 'Config/firebase'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import { useAuthContext } from 'Context/AuthContext';

export default function Profile() {

    const user = JSON.parse(localStorage.getItem("User"))
    const [data, setData] = useState([])
    const [isProcessing, setIsProcessing] = useState(true)
    const { dispatch } = useAuthContext()


    const fetchData = async () => {
        let array = []
        setIsProcessing(true)
        const q = query(collection(fireStore, "History"), where("userId", "==", user.ID));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            let data = doc.data()
            array.push(data)
        });
        setIsProcessing(false)
        setData(array)
    }

    useEffect(() => {
        fetchData()
    }, [])


    // For Logout 

    const handleLogout = (e) => {
        localStorage.removeItem("User")
        e.preventDefault()
        signOut(auth)
            .then(() => {
                toast.success("Loggoed Out")
                localStorage.setItem("Token", "False")
                localStorage.removeItem("User")
            })
            .catch((error) => {
                console.log('error', error)
                // ..
            });
        dispatch({ type: "Set_Logged_Out" })
        localStorage.setItem("Token", "false")
    }


    return (
        <>
            <div className="d-flex justify-content-between align-items-center px-4">
                <Link to={"/dashboard/agent"}>
                    <img src={back} alt="" style={{ "width": "45px", "margin": "15px 10px 10px 15px" }} />
                </Link>
                <button className="Btn" onClick={handleLogout}>
                    <div className="sign">
                        <svg viewBox="0 0 512 512">
                            <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                        </svg>
                    </div>
                    <div className="logout-text">Logout</div>
                </button>
            </div>

            <h1 className="my-4 text-start">
                Hello !  <span style={{ "textDecoration": "underline #307750" }}>{user.fullName}</span>
            </h1>

            <h2 className='text-center'>
                Here are you some past searches
            </h2>
            <div className="container my-5">
                <div className="accordion" id="teamAccordion">
                    {
                        isProcessing
                            ?
                            <DataLoader />
                            :
                            data.length == 0
                                ?
                                <h1 className='text-center my-3'>
                                    No Data Found
                                </h1>
                                :
                                <>
                                    {data.map((history, index) => (
                                        <div className="accordion-item" key={index}>
                                            <h2 className="accordion-header" id={`heading${index}`}>
                                                <button
                                                    className={`accordion-button ${index !== 0 ? "collapsed" : ""}`}
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target={`#collapse${index}`}
                                                    aria-expanded={index === 0 ? "true" : "false"}
                                                    aria-controls={`collapse${index}`}
                                                >
                                                    <div className="d-flex align-items-center">
                                                        <img
                                                            src={history.img}
                                                            alt={`${history.name} photo`}
                                                            className="img-thumbnail rounded-circle me-3"
                                                            style={{ width: "100px", height: "100px" }}
                                                        />
                                                        <div>
                                                            <h5>{history.time}</h5>
                                                        </div>
                                                    </div>
                                                </button>
                                            </h2>
                                            <div
                                                id={`collapse${index}`}
                                                className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                                                aria-labelledby={`heading${index}`}
                                                data-bs-parent="#teamAccordion"
                                            >
                                                <div className="accordion-body"><div dangerouslySetInnerHTML={{ __html: history.details }} /></div>
                                            </div>
                                        </div>
                                    ))}
                                </>
                    }
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
