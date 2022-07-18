import React, { useEffect, useState } from "react";
import styles from "./Users.module.css";
import axios from "axios";
import { FormControl, MenuItem, Select, Grid, ButtonBase } from "@mui/material";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CardMedia from "@mui/material/CardMedia";

import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import _ from "lodash";

import { useFormik } from "formik";
import UserPreview from "./UserPreview";

const Users = () => {
  const navigation = useNavigate();

  //formik for preview

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
  });

  //states
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(
    localStorage.getItem("pageNumber")
  );

  const [searchText, setSearchText] = useState(
    localStorage.getItem("searchTText")
  );

  const [error, setError] = useState(false);
  const [sortValue, setSortValue] = useState("createdAt");
  const [sortType, setSortType] = useState("desc");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);
  const [name, setName] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isPublic, setIsPublic] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  console.log(searchText);

  //search text handling
  const handleChange = (value) => {
    setSearchText(value);
  };

  useEffect(() => {
    if (searchText !== "") {
      console.log("hai");
    }
  }, [searchText]);

  //debounce function
  /*const debounceResults = _.debounce(function (value) {
    handleChange(value);
  }, 1000);*/

  //fetching users reusable function
  const getUsers = async (Page, searchTextt, sortValuee, type) => {
    const baseUrl = `http://localhost:3333/users`;
    let url = baseUrl;
    let UrlParams = { params: { _page: currentPage, _limit: 10 } };
    if (Page) {
      UrlParams = {
        params: {
          _page: currentPage,
          _sort: sortValue,
          _order: "desc",
          _limit: 10,
        },
      };
    }

    if (sortValuee || type) {
      UrlParams = {
        params: {
          _page: currentPage,
          _sort: sortValuee,
          _order: type,
          _limit: 10,
        },
      };
    }
    if (searchTextt) {
      UrlParams = {
        params: { q: searchTextt, _sort: sortValuee, _order: type, _limit: 10 },
      };
    }

    console.log(url);
    axios
      .get(url, UrlParams)
      .then((res) => {
        if (res.data.length !== 0) {
          setError(false);

          let totalCount = Math.ceil(res.headers["x-total-count"] / 10);
          setCount(totalCount);
          console.log(res.data);
          setUsers(res.data);
          setLoading(false);
        } else {
          setError(true);
          console.log("no Results found");
        }
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
      });
  };

  //first render
  useEffect(() => {
    setLoading(true);
    localStorage.removeItem("searchTText");
    localStorage.removeItem("pageNumber");
    getUsers(currentPage, searchText, sortValue, sortType);
  }, [currentPage]);

  //Search functionality
  const searchHandler = async (searchTextt) => {
    setPreview(false);
    localStorage.removeItem("searchTText");

    console.log("hai");
    if (searchTextt !== "") {
      localStorage.setItem("searchTText", searchTextt);
      setLoading(true);
      getUsers(currentPage, searchTextt, sortValue, sortType);
    } else {
      setError(false);
      setLoading(true);
      getUsers(currentPage, searchTextt, sortValue, sortType);
      console.log("No search text found");
    }
  };

  //sort functionality
  const sortHandler = async (value, type) => {
    setError(false);
    if (value) {
      setSortValue(value);
      console.log(sortType);
      console.log(currentPage);
      setLoading(true);
      console.log(sortType);
      getUsers(currentPage, searchText, value, sortType);
    } else {
      setSortType(type);
      setLoading(true);
      getUsers(currentPage, searchText, sortValue, type);
    }
  };

  //navigation to create user page
  const createUserClickHandler = () => {
    navigation("createUser");
  };

  //OpenDetailsPage
  const openDetailsPage = (id) => {
    navigation(`/userDetails/${id}`);
    localStorage.setItem("pageNumber", currentPage);
  };

  //preview user fetching

  const getUser = async (id) => {
    axios
      .get(`http://localhost:3333/users?id=${id}`)
      .then((res) => {
        console.log(res.data[0].name);

        setName(res.data[0].name);
        console.log(formik.values.name);

        setStatusMessage(res.data[0].statusMessage);

        setEmail(res.data[0].email);

        setAvatarUrl(res.data[0].avatarUrl);

        setAge(res.data[0].age);
        setIsPublic(res.data[0].isPublic);
        setCreatedAt(res.data[0].createdAt);
        setPreview(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //preview page open
  const previewOpen = (id) => {
    getUser(id);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Container className={styles.container}>
        <div className={styles.headers}>
          <div>
            <h2>Users</h2>
          </div>
          <div>
            <input
              style={{ height: 30 }}
              onChange={(e) => handleChange(e.target.value)}
              className="search-input"
              type="text"
              value={searchText}
              placeholder="search by name"
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
                  <MenuItem
                    value={"age"}
                    onClick={() => sortHandler("age", "")}
                  >
                    Age
                  </MenuItem>
                  <MenuItem
                    value={"createdAt"}
                    onClick={() => sortHandler("createdAt", "")}
                  >
                    Created At
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
                  <MenuItem
                    value={"asc"}
                    onClick={() => sortHandler("", "asc")}
                  >
                    Asc
                  </MenuItem>
                  <MenuItem
                    value={"desc"}
                    onClick={() => sortHandler("", "desc")}
                  >
                    Desc
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>

        {error ? (
          <div>
            {" "}
            <h3 style={{ color: "red" }}>Not results found </h3>
          </div>
        ) : (
          <div>
            {loading ? (
              <div>
                <h2>Loading...</h2>
              </div>
            ) : (
              <div style={{ padding: 15 }}>
                <Grid container spacing={2}>
                  {users.map((user, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                      <Card>
                        <ButtonBase /*onClick={() => openDetailsPage(user.id)}*/
                        >
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
                        <Button onClick={() => previewOpen(user.id)}>
                          Preview
                        </Button>
                        <Button onClick={() => openDetailsPage(user.id)}>
                          Open
                        </Button>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </div>
            )}

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
          </div>
        )}

        <div
          style={{ display: "flex", justifyContent: "flex-end", padding: 2 }}
        >
          <Button variant="contained" onClick={() => createUserClickHandler()}>
            Create User
          </Button>
        </div>
      </Container>

      {preview && (
        <UserPreview
          name={name}
          statusMessage={statusMessage}
          email={email}
          age={age}
          avatarUrl={avatarUrl}
          createdAt={createdAt}
        />
      )}
    </div>
  );
};

export default Users;
