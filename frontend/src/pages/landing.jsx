
import React from 'react'
import "../App.css"
import { Link, useNavigate } from 'react-router-dom'
export default function LandingPage() {


    const router = useNavigate();

    return (
        <div className='landingPageContainer'>
            <nav>
                <div className='navHeader'>
                    <h2>NexaTalk</h2>
                </div>
                <div className='navlist'>
                    <p onClick={() => {
                        router("/aljk23")
                    }}>Join as Guest</p>
                    <p onClick={() => {
                        router("/auth")

                    }}>Register</p>
                    <div onClick={() => {
                        router("/auth")

                    }} role='button'>
                        <p>Login</p>
                    </div>
                </div>
            </nav>


            <div className="landingMainContainer">
                <div>
                    <span className="nx-badge"><span className="dot"></span> Crystal-clear HD video calling</span>
                    <h1><span>Connect</span> with your loved ones</h1>

                    <p>Bridge any distance with NexaTalk — secure, lightning-fast video meetings that bring people closer, wherever they are.</p>
                    <div role='button'>
                        <Link to={"/auth"}>Get Started →</Link>
                    </div>

                    <div className="nx-stats">
                        <div className="nx-stat">
                            <strong>10k+</strong>
                            <span>Meetings hosted</span>
                        </div>
                        <div className="nx-stat">
                            <strong>99.9%</strong>
                            <span>Uptime</span>
                        </div>
                        <div className="nx-stat">
                            <strong>HD</strong>
                            <span>Video & audio</span>
                        </div>
                    </div>
                </div>
                <div>

                    <img src="/mobile.png" alt="NexaTalk mobile app" />

                </div>
            </div>



        </div>
    )
}
