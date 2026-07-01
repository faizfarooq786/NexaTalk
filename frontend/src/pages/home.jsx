import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
import "../App.css";
import { Button, IconButton, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';

function HomeComponent() {


    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");


    const { addToUserHistory } = useContext(AuthContext);
    let handleJoinVideoCall = async () => {
        await addToUserHistory(meetingCode)
        navigate(`/${meetingCode}`)
    }

    return (
        <div className="nx-home">

            <div className="navBar">

                <div style={{ display: "flex", alignItems: "center" }}>
                    <h2>Nexa<span>Talk</span></h2>
                </div>

                <div className="nx-nav-actions">
                    <IconButton className="nx-icon-btn" onClick={() => { navigate("/history") }}>
                        <RestoreIcon />
                        <span style={{ fontSize: "0.95rem" }}>History</span>
                    </IconButton>

                    <Button
                        variant="outlined"
                        onClick={() => {
                            localStorage.removeItem("token")
                            navigate("/auth")
                        }}
                        sx={{
                            color: "#f4f4f8",
                            borderColor: "rgba(255,255,255,0.2)",
                            borderRadius: "999px",
                            textTransform: "none",
                            px: 2.5,
                            "&:hover": { borderColor: "#ff9839", backgroundColor: "rgba(255,152,57,0.08)" }
                        }}
                    >
                        Logout
                    </Button>
                </div>


            </div>


            <div className="meetContainer">
                <div className="leftPanel">
                    <div>
                        <h2>Quality video calls, just like quality education</h2>
                        <p className="nx-sub">Enter a meeting code to instantly join your room. No downloads, no friction — just connect and start talking.</p>

                        <div className="nx-join-card">
                            <div className="nx-join-label">Join a meeting</div>
                            <div className="nx-join-row">
                                <TextField
                                    onChange={e => setMeetingCode(e.target.value)}
                                    id="outlined-basic"
                                    label="Meeting Code"
                                    variant="outlined"
                                    fullWidth
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            color: "#f4f4f8",
                                            borderRadius: "12px",
                                            "& fieldset": { borderColor: "rgba(255,255,255,0.18)" },
                                            "&:hover fieldset": { borderColor: "rgba(255,255,255,0.35)" },
                                            "&.Mui-focused fieldset": { borderColor: "#ff9839" },
                                        },
                                        "& .MuiInputLabel-root": { color: "#a9abc4" },
                                        "& .MuiInputLabel-root.Mui-focused": { color: "#ff9839" },
                                    }}
                                />
                                <Button
                                    onClick={handleJoinVideoCall}
                                    variant='contained'
                                    sx={{
                                        background: "linear-gradient(135deg, #ff9839, #f07d12)",
                                        borderRadius: "12px",
                                        textTransform: "none",
                                        fontWeight: 700,
                                        px: 4,
                                        boxShadow: "0 10px 30px -8px rgba(255,152,57,0.5)",
                                        "&:hover": { background: "linear-gradient(135deg, #ffa54f, #ff8a1f)" }
                                    }}
                                >
                                    Join
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='rightPanel'>
                    <img srcSet='/logo3.png' alt="NexaTalk" />
                </div>
            </div>
        </div>
    )
}


export default withAuth(HomeComponent)
