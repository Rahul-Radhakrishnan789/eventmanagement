import { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import styles from "./signinpage.module.css";
import axios from "../../utils/AxiosInstance";
import toast, { Toaster } from "react-hot-toast";
import Checkbox from '@mui/material/Checkbox';
import { pink } from '@mui/material/colors';
import { Link } from "react-router-dom";

function SignInPage() {
  const initialValues = {
    username: "",
    email: "",
    contactNumber: "", 
  };

  const [signinValues, setsigninValues] = useState(initialValues);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckBoxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/commonregister", {
        username: signinValues.username,
        email: signinValues.email,
        contactNumber: isChecked ? signinValues.contactNumber : "",
        isOrganizer: isChecked,
      });

      console.log("Registration successful:", response.data);

      const userEmail = response.data.data;

      localStorage.setItem("userEmail", userEmail);

      setsigninValues(initialValues);

      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message, {
        duration: 3000,
        style: {
          borderRadius: "10px",
          background: "#e24242",
          color: "#fff",
        },
      });
      console.error("Registration error:", error);
      console.log("Response:", error.response);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setsigninValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  return (
    <>
      <div className={styles.mainbody}>
        <div className={styles.container}>
          <div className={styles.img}>
            <div className={styles.formbox}>
              <form onSubmit={handleSubmit}>
                <div className={styles.form}>
                  <h2>Register</h2>
                  <div className={styles.inputbox}>
                    <input
                      type="text"
                      name="username"
                      value={signinValues.username}
                      required
                      onChange={handleChange}
                    />
                    <label>Username</label>
                  </div>
                  <div className={styles.inputbox}>
                    <input
                      type="text"
                      name="email"
                      value={signinValues.email}
                      onChange={handleChange}
                      required
                    />
                    <label>Email</label>
                  </div>
                  {isChecked && (
                    <div className={styles.inputbox}>
                      <input
                        type="text"
                        name="contactNumber"
                        value={signinValues.contactNumber}
                        onChange={handleChange}
                        required={isChecked}
                      />
                      <label>Contact Number</label>
                    </div>
                  )}

                  <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <div>
                      <label>
                        Organizer
                        <Checkbox
                          checked={isChecked}
                          onChange={handleCheckBoxChange}
                          defaultChecked={false}
                          color="primary"
                          sx={{
                            color: pink[800],
                            '&.Mui-checked': {
                              color: pink[600],
                            },
                          }}
                        />
                      </label>
                    </div>
                    <div className={styles.links}>
                      <Link to={"/login"}>Already a user ?</Link>
                    </div>
                  </div>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      color: "white",
                      alignItems: "center",
                      marginTop: "10%",
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
                      Sign Up
                    </Button>
                  </Box>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Toaster />
      </div>
    </>
  );
}

export default SignInPage;
