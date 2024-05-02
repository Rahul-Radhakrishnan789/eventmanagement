import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Checkbox from '@mui/material/Checkbox';
import { pink } from '@mui/material/colors';

import styles from "./loginpage.module.css";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/AxiosInstance";
import toast, { Toaster } from "react-hot-toast";

function LoginPage() {
  
  const navigate = useNavigate();

  const [loginPassword, setloginPassword] = useState("");
  const [isChecked, setIsChecked]=useState(false)
  

  const userEmail = localStorage.getItem("userEmail");

  //functionality for organizer is true or false
      
  const handleChange = (event) => {
    setIsChecked(event.target.checked);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/commonlogin", {
        password: loginPassword,
        email:userEmail,
        isOrganizer:isChecked

      });
      console.log("Login successful:", response.data);
      toast.success("Login Successful", {
        duration: 5000,
        style: {
          borderRadius: "10px",
          color: "#000",
        },
      });
      if(response.data.type==='admin'){
        //navigate to  admin page
      }
      if(response.data.type==='oraganizer'){
        localStorage.setItem("organizerId",response.data.Id)
        navigate("/organizer")
      }
      if(response.data.type==='user'){
        localStorage.setItem("userId",response.data.Id)
        navigate("/user/dashboard")
      }

      console.log("Login successful:", response.data);
    } catch (error) {
      toast.error(error.response.data.message, {
        duration: 3000,
        style: {
          borderRadius: "10px",
          background: "#e24242",
          color: "#fff",
        },
      });
      console.error("login error:", error);
      console.log("Response:", error.response);
    }
  };

  return (
    <div className={styles.mainbody}>
      <div className={styles.container}>
        <div className={styles.img}>
          <div className={styles.formbox}>
            <form onSubmit={handleSubmit}>
              <div className={styles.form}>
                <h2>Login</h2>

                <div className={styles.inputbox}>
                  <input type="text" 
                  defaultValue={userEmail}
                   required />
                  <label>Email</label>
                </div>
                <div className={styles.inputbox}>
                  <input
                    type="text"
                    name="loginPassword"
                    value={loginPassword}
                    onChange={(e) => setloginPassword(e.target.value)}
                    required
                  />
                  <label for="">Password</label>
                </div>

               
        <label>
        Organizer
      <Checkbox
        checked={isChecked} 
        onChange={handleChange}
        defaultChecked={false} 
        color="primary" 
        // inputProps={{ 'aria-label': 'isOrganizer' }} 
        sx={{
          color: pink[800],
          '&.Mui-checked': {
            color: pink[600],
          },
        }}
      />
      
    </label>
        
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    color: "white",
                    alignItems: "center",
                    marginTop: "20%",
                    "& > *": {
                      m: 1,
                    },
                  }}
                >
                  <Button
                    type="submit"
                    variant="outlined"
                    sx={{ color: "white", border: "1px solid" }}
                  >
                    Login
                  </Button>
                </Box>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default LoginPage;
