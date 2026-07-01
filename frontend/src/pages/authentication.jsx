import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar } from '@mui/material';

const defaultTheme = createTheme({ palette: { mode: 'dark' } });

const fieldSx = {
    "& .MuiOutlinedInput-root": {
        color: "#f4f4f8",
        borderRadius: "12px",
        backgroundColor: "rgba(255,255,255,0.04)",
        "& fieldset": { borderColor: "rgba(255,255,255,0.18)" },
        "&:hover fieldset": { borderColor: "rgba(255,255,255,0.35)" },
        "&.Mui-focused fieldset": { borderColor: "#ff9839" },
    },
    "& .MuiInputLabel-root": { color: "#a9abc4" },
    "& .MuiInputLabel-root.Mui-focused": { color: "#ff9839" },
};

export default function Authentication() {

    const [username, setUsername] = React.useState();
    const [password, setPassword] = React.useState();
    const [name, setName] = React.useState();
    const [error, setError] = React.useState();
    const [message, setMessage] = React.useState();

    const [formState, setFormState] = React.useState(0);

    const [open, setOpen] = React.useState(false)


    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    let handleAuth = async () => {
        try {
            if (formState === 0) {
                let result = await handleLogin(username, password)
            }
            if (formState === 1) {
                let result = await handleRegister(name, username, password);
                console.log(result);
                setUsername("");
                setMessage(result);
                setOpen(true);
                setError("")
                setFormState(0)
                setPassword("")
            }
        } catch (err) {
            console.log(err);
            let message = (err.response.data.message);
            setError(message);
        }
    }


    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <div className="nx-auth">
                <div className="nx-auth-aside">
                    <div className="nx-auth-aside-inner">
                        <h2 className="nx-auth-brand">NexaTalk</h2>
                        <h1 className="nx-auth-tagline">Meetings that feel<br />effortlessly close.</h1>
                        <p className="nx-auth-copy">Secure, HD video calling that bridges any distance. Sign in to start connecting in seconds.</p>
                    </div>
                </div>

                <div className="nx-auth-main">
                    <div className="nx-auth-card">
                        <h2 className="nx-auth-title">{formState === 0 ? "Welcome back" : "Create your account"}</h2>
                        <p className="nx-auth-subtitle">{formState === 0 ? "Sign in to continue to NexaTalk" : "Join NexaTalk in just a moment"}</p>

                        <div className="nx-auth-toggle">
                            <button
                                className={formState === 0 ? "active" : ""}
                                onClick={() => { setFormState(0) }}
                            >
                                Sign In
                            </button>
                            <button
                                className={formState === 1 ? "active" : ""}
                                onClick={() => { setFormState(1) }}
                            >
                                Sign Up
                            </button>
                        </div>

                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            {formState === 1 ? <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="fullname"
                                label="Full Name"
                                name="fullname"
                                value={name}
                                autoFocus
                                onChange={(e) => setName(e.target.value)}
                                sx={fieldSx}
                            /> : <></>}

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                value={username}
                                autoFocus
                                onChange={(e) => setUsername(e.target.value)}
                                sx={fieldSx}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                value={password}
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                id="password"
                                sx={fieldSx}
                            />

                            {error ? <p className="nx-auth-error">{error}</p> : null}

                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                onClick={handleAuth}
                                sx={{
                                    mt: 3,
                                    mb: 1,
                                    py: 1.3,
                                    background: "linear-gradient(135deg, #ff9839, #f07d12)",
                                    borderRadius: "12px",
                                    textTransform: "none",
                                    fontWeight: 700,
                                    fontSize: "1rem",
                                    boxShadow: "0 10px 30px -8px rgba(255,152,57,0.5)",
                                    "&:hover": { background: "linear-gradient(135deg, #ffa54f, #ff8a1f)" }
                                }}
                            >
                                {formState === 0 ? "Login" : "Register"}
                            </Button>
                        </Box>
                    </div>
                </div>
            </div>

            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={() => setOpen(false)}
                message={message}
            />

        </ThemeProvider>
    );
}
