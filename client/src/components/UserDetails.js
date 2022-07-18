import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UserDetails = () => {
  const [fetched, setfetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [edited, setEdited] = useState(false);
  const [error, setError] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const navigation = useNavigate();

  const getUser = async () => {
    setError(false);
    axios
      .get(`http://localhost:3333/users?id=${id}`)
      .then((res) => {
        console.log(res.data[0]);

        formik.values.name = res.data[0].name;

        formik.values.statusMessage = res.data[0].statusMessage;

        formik.values.email = res.data[0].email;

        formik.values.avatarUrl = res.data[0].avatarUrl;

        formik.values.age = res.data[0].age;
        formik.values.isPublic = res.data[0].isPublic;
        formik.values.createdAt = res.data[0].createdAt;

        setfetched(!fetched);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  };

  const editSaveUser = (values) => {
    setError(false);
    setEdited(false);
    axios
      .put(`http://localhost:3333/users/${id}`, values)
      .then((res) => {
        console.log(res);
        setEdited(true);
      })
      .catch((error) => {
        setError(true);
      });
  };

  let { id } = useParams();
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      getUser(id);
    };
    fetchUser();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      statusMessage: "",
      email: "",
      age: "",
      isPublic: "",
      createdAt: "",
      avatarUrl: "",
    },

    onSubmit: (values) => {
      console.log(values);
      editSaveUser(values);
    },
  });

  // Success Alert closing Handler
  const closeHandler = (value) => {
    if (value == "edit") {
      setEdited(false);
      navigation("/");
    } else {
      setDeleted(false);
      navigation("/");
    }
  };

  //delete handler
  const deleteHandler = () => {
    axios
      .delete(`http://localhost:3333/users/${id}`)
      .then((res) => {
        console.log(res);
        setDeleted(true);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  };
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {edited && (
        <div style={{ marginTop: 10 }}>
          <Alert severity="success" onClose={() => closeHandler("edit")}>
            Successfully edited
          </Alert>
        </div>
      )}

      {deleted && (
        <div style={{ marginTop: 10 }}>
          <Alert severity="success" onClose={() => closeHandler("delete")}>
            Successfully deleted
          </Alert>
        </div>
      )}

      {error && (
        <div style={{ marginTop: 10 }}>
          <Alert severity="error" onClose={() => setError(false)}>
            Something went wrong
          </Alert>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>userDetails</h1>
      </div>

      {loading ? (
        <div>
          <h2>loading....</h2>
        </div>
      ) : (
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
                  id="name"
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
                  name="createdAt"
                  label="Created At"
                  variant="outlined"
                  disabled={true}
                  required
                  value={formik.values.createdAt}
                  onChange={formik.handleChange}
                />
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
              <div style={{ margin: 5 }}>
                <Button type="submit" variant="contained">
                  Save
                </Button>
              </div>

              <div style={{ margin: 5 }}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    deleteHandler();
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          </form>

          {/*  </Formik> */}
        </div>
      )}
    </Container>
  );
};

export default UserDetails;
