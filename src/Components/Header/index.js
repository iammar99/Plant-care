import React from 'react'
import { Link } from 'react-router-dom'
import bg from '../../Assets/wallpaperflare-cropped.jpg'
import '../../SCSS/Components/_header.scss'
import png from '../../Assets/growth.png'
export default function Header() {
    return (
        <>
            <div className="bg" style={{ backgroundImage: `url(${bg})` }}>
                <div className="container title">
                    <div className="row">
                        <div className="col">
                            <h1>PlantCare AI</h1>
                            <h3>'Nurture Nature with Smart Solutions' <img src={png} alt="" style={{ width: '45px' }} /></h3>
                            <div className="button mt-3">
                            <Link to={"/dashboard/agent"} className='link'>
                                <button className="signupBtn">
                                    Try Now
                                    <span className="arrow">
                                        <svg fill="rgb(183, 128, 255)" viewBox="0 0 320 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"></path></svg>
                                    </span>
                                </button></Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
