
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import VideocamIcon from '@mui/icons-material/Videocam';

import { IconButton } from '@mui/material';
import "../App.css";

export default function History() {


    const { getHistoryOfUser } = useContext(AuthContext);

    const [meetings, setMeetings] = useState([])


    const routeTo = useNavigate();


    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                setMeetings(history);
            } catch {
                // IMPLEMENT SNACKBAR
            }
        }

        fetchHistory();
    }, [])

    let formatDate = (dateString) => {

        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0")
        const year = date.getFullYear();

        return `${day}/${month}/${year}`

    }

    return (
        <div className="nx-history">

            <div className="nx-history-header">
                <IconButton className="nx-icon-btn" onClick={() => { routeTo("/home") }}>
                    <HomeIcon />
                </IconButton>
                <h2>Meeting History</h2>
            </div>

            {
                (meetings.length !== 0) ? (
                    <div className="nx-history-grid">
                        {meetings.map((e, i) => (
                            <Card key={i} className="nx-history-card" variant="outlined">
                                <CardContent>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.6rem", color: "#ff9839" }}>
                                        <VideocamIcon fontSize="small" />
                                        <Typography className="nx-history-code">
                                            {e.meetingCode}
                                        </Typography>
                                    </div>
                                    <Typography className="nx-history-date">
                                        {formatDate(e.date)}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="nx-empty">
                        <h3>No meetings yet</h3>
                        <p>Your past meetings will appear here once you start calling.</p>
                    </div>
                )
            }

        </div>
    )
}
