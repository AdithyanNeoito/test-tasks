import React, { useState, useEffect } from "react";

import { Paper, TextField } from "@mui/material";

import { Container } from "@mui/material";
const UserPreview = ({
  name,
  email,
  avatarUrl,
  age,
  statusMessage,
  createdAt,
}) => {
  const [rerender, setRerender] = useState(false);
  useEffect(() => {
    setRerender(!rerender);
  }, [name]);

  return (
    <div style={{ padding: 10, marginTop: 100 }}>
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <form>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img src={avatarUrl} alt="avatar"></img>
            </div>

            <Paper>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 10,
                }}
              >
                <TextField
                  style={{ margin: 15, marginTop: 15 }}
                  id="name"
                  name="name"
                  label="Name"
                  variant="outlined"
                  required
                  type="text"
                  fullWidth
                  value={name}
                />
                <TextField
                  style={{ margin: 15, marginTop: 15 }}
                  name="statusMessage"
                  label="StatusMessage"
                  variant="outlined"
                  required
                  fullWidth
                  type="text"
                  value={statusMessage}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 10,
                }}
              >
                <TextField
                  style={{ margin: 15, marginTop: 15 }}
                  name="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  type="email"
                  value={email}
                  Read
                  Only
                />
                <TextField
                  style={{ margin: 15, marginTop: 15 }}
                  name="age"
                  label="Age"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={age}
                  Read
                  Only
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
                  name="createdAt"
                  label="Created At"
                  variant="outlined"
                  Read
                  Only
                  value={createdAt}
                  required
                />
              </div>
            </Paper>
          </form>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              flexDirection: "row",
              marginTop: 25,
            }}
          ></div>

          {/*  </Formik> */}
        </div>
      </Container>
    </div>
  );
};

export default UserPreview;
