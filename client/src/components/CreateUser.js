import React, { useState } from "react";
import { Container, TextField, Paper, Button } from "@mui/material";
/* import { Formik, Form } from "formik"; */
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useFormik } from "formik";
import axios from "axios";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useNavigate } from "react-router-dom";

function CreateUser() {

  const navigation = useNavigate();
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [error,setError]=useState(false)

  //adding user
  const addUser = async (values) => {
    setSubmissionSuccess(false);
    setError(false)
     axios
      .post(`http://localhost:3333/users`, values)
      .then((res) => {
        console.log(res);
        setSubmissionSuccess(true);
        navigation('/')
      })
      .catch((error)=>{
        setError(true)
        setSubmissionSuccess(false)
        console.log(error);
      })
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      statusMessage: "",
      email: "",
      age: "",
      isPublic: "",
      createdAt: new Date().toISOString(),
      avatarUrl: "",
    },

    onSubmit: (values) => {
      console.log(values);
      alert(JSON.stringify(values, null, 2));
      addUser(values);
    },
  });
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
     { error &&
     <div>
      <p>Something went wrong</p>
      </div>}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <PersonAddAltIcon fontSize="large" />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",

          marginBottom: 20,
        }}
      >
        <h1 style={{ color: "black", fontFamily: "sans-serif" }}>
          Create User
        </h1>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <form onSubmit={formik.handleSubmit}>
          <Paper>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TextField
                style={{ margin: 15, marginTop: 15 }}
                id="nam"
                name="name"
                label="Name"
                variant="outlined"
                value={formik.values.name}
                onChange={formik.handleChange}
                required
                type="text"
                fullWidth
              />
              <TextField
                style={{ margin: 15, marginTop: 15 }}
                name="statusMessage"
                label="StatusMessage"
                variant="outlined"
                required
                fullWidth
                type="text"
                value={formik.values.statusMessage}
                onChange={formik.handleChange}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TextField
                style={{ margin: 15, marginTop: 15 }}
                name="email"
                label="Email"
                variant="outlined"
                required
                fullWidth
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              <TextField
                style={{ margin: 15, marginTop: 15 }}
                name="age"
                label="Age"
                variant="outlined"
                required
                fullWidth
                type="number"
                value={formik.values.age}
                onChange={formik.handleChange}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "row" }}>
              <TextField
                style={{ margin: 15, marginTop: 15 }}
                name="avatarUrl"
                label="AvatarUrl"
                variant="outlined"
                required
                type="url"
                value={formik.values.avatarUrl}
                onChange={formik.handleChange}
              />
              <div style={{ margin: 15 }}>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    IsPublic
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="isPublic"
                    onChange={formik.handleChange}
                    value={formik.values.isPublic}
                  >
                    <FormControlLabel
                      value="true"
                      control={<Radio />}
                      label="True"
                    />
                    <FormControlLabel
                      value="false"
                      control={<Radio />}
                      label="False"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
           
          </Paper>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              flexDirection: "row",
              marginTop: 25,
            }}
          >
            <Button type="submit" variant="contained">
              Create
            </Button>
          </div>
        </form>

        {/*  </Formik> */}
      </div>
    </Container>
  );
}

export default CreateUser;
