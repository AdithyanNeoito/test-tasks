import React, { useEffect, useState } from "react";
import styles from "./Users.module.css";
import axios from "axios";
import { FormControl, MenuItem, Select, Grid, ButtonBase } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CardMedia from "@mui/material/CardMedia";

import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";

const Users = () => {
  const navigation = useNavigate();

  //states
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchText, setSearchText] = useState("");

  const [error, setError] = useState(false);
  const [sortValue, setSortValue] = useState("None");
  const [sortType, setSortType] = useState("None");

  //fetching users reusable function
  const getUsers = async (Page, searchTextt, sortValuee, type) => {
    const baseUrl = `http://localhost:3333/users`;
    let url = baseUrl + `?_page=${currentPage}&_limit=10`;
    if (Page) {
      url = baseUrl + `?_page=${currentPage}&_limit=10`;
    }
    if (searchTextt) {
      url = baseUrl + `?name=${searchTextt}&_limit=10`;
    }
    if (sortValuee !== "None") {
      url =
        baseUrl +
        `?_page=${currentPage}&_sort=${sortValue}&_order=asc&_limit=10`;
    }
    if (type !== "None") {
      url =
        baseUrl +
        `?_page=${currentPage}&_sort=${sortValue}&_order=${type}&_limit=10`;
    }
    console.log(url);
    await axios
      .get(url)
      .then((res) => {
        if (res.data.length !== 0) {
          setError(false);
          let totalCount = Math.ceil(res.headers["x-total-count"] / 10);
          setCount(totalCount);
          console.log(res.data);
          setUsers(res.data);
        } else {
          setError(true);
          console.log("no Results found");
        }
      })
      .catch((error) => {
        setError(true);
      });
  };

  //first render 
  useEffect(() => {
    const fetchUsers = () => {
      getUsers(currentPage, searchText, sortValue, sortType);
    };

    fetchUsers();
  }, [currentPage]);

  //Search functionality
  const searchHandler = async (searchText) => {
    setSortType("None");
    setSortValue("None");
    if (searchText !== "") {
      getUsers(currentPage, searchText, sortValue, sortType);
    } else {
      setError(false);
      getUsers(currentPage, searchText, sortValue, sortType);
      console.log("No search text found");
    }
  };

  //sorting value handler
  const sortValueHandler = (item) => {
    setSortValue(item);
    setSortType("None");
  };

  //sort functionality
  const sortHandler = async (type) => {
    setError(false);
   if (type !== "None" && sortValue !== "None") {
      console.log(type);
      setSortType(type);
      console.log(sortType);
      console.log(currentPage);

      console.log(sortType);
      getUsers(currentPage, searchText, sortValue, type);
    } else {
      setSortType("None");
      setSortValue("None");
    }
  };

  //navigation to create user page
  const createUserClickHandler = () => {
    navigation("createUser");
  };

  //OpenDetailsPage
  const openDetailsPage = (id) => {
    navigation(`/userDetails/${id}`);
  };

  return (
    <Container className={styles.container}>
      {error && (
        <div style={{ color: "red" }}>
          <p>No Results Found</p>
        </div>
      )}
      <div className={styles.headers}>
        <div>
          <h2>Users</h2>
        </div>
        <div>
          <input
            style={{ height: 30 }}
            onChange={(e) => setSearchText(e.target.value)}
            className="search-input"
            type="text"
            placeholder="search By Name..."
          ></input>
          <Button
            variant="contained"
            style={{ margin: 5 }}
            onClick={() => searchHandler(searchText)}
          >
            Search
          </Button>
        </div>

        <div style={{ display: "flex", flexDirection: "row" }}>
          <p style={{ padding: 2 }}>Sort By</p>
          <div style={{ padding: 2 }}>
            <FormControl>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sortValue}
              >
                <MenuItem value={"age"} onClick={() => sortValueHandler("age")}>
                  Age
                </MenuItem>
                <MenuItem
                  value={"createdAt"}
                  onClick={() => sortValueHandler("createdAt")}
                >
                  Created At
                </MenuItem>
                <MenuItem
                  value={"None"}
                  onClick={() => sortValueHandler("None")}
                >
                  None
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <p style={{ padding: 2 }}>Order</p>
          <div style={{ padding: 2 }}>
            <FormControl>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sortType}
              >
                <MenuItem value={"asc"} onClick={() => sortHandler("asc")}>
                  Asc
                </MenuItem>
                <MenuItem value={"desc"} onClick={() => sortHandler("desc")}>
                  Desc
                </MenuItem>
                <MenuItem value={"None"} onClick={() => sortHandler("None")}>
                  None
                </MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>

      <div style={{ padding: 15 }}>
        <Grid container spacing={2}>
          {users.map((user) => (
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <ButtonBase onClick={() => openDetailsPage(user.id)}>
                  <CardMedia
                    component="img"
                    height="165"
                    image={user.avatarUrl}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {user.name}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {user.age}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {user.createdAt}
                    </Typography>
                    <Typography>{user.statusMessage}</Typography>
                  </CardContent>
                 </ButtonBase>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Stack spacing={2}>
          <Pagination
            count={count}
            variant="outlined"
            shape="rounded"
            onChange={(e, value) => setCurrentPage(value)}
          />
        </Stack>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", padding: 2 }}>
        <Button variant="contained" onClick={() => createUserClickHandler()}>
          Create User
        </Button>
      </div>
    </Container>
  );
};

export default Users;
