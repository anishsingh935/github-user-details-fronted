import * as React from "react";
import axios from "axios";
import { CLOUD_FRONT_URL } from "../../config";
import "../../App.css";

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Button, Link } from "@mui/material";
import CustomizedSnackbars from "../snackbar";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function SignIn() {
  //constants----------------------
  const navigate = useNavigate();
  let username = localStorage.getItem("username");

  //States--------------------------
  const [data, setData] = React.useState([]);
  const [repodata, setRepoData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);

  //Useeffects------------------
  React.useEffect(() => {
    getUserDetails();
  }, []);

  React.useEffect(() => {
    fetchRepo();
  }, [page]);

  React.useEffect(() => {
    if (open) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [open]);

  //Functions-------------------
  const getUserDetails = () => {
    axios
      .get(CLOUD_FRONT_URL + "user/" + username)
      .then((res) => {
        fetchRepo();
        setData(res.data);
      })
      .catch((err) => {
        setOpen(true);
        console.log(err);
      });
  };

  const fetchRepo = () => {
    axios
      .get(CLOUD_FRONT_URL + `repos?userName=${username}&page=${page}&limit=6`)
      .then((res) => setRepoData(res.data))
      .catch((err) => {
        navigate("/");
        console.log(err);
      });
  };

  const handleChange = (event, newPage) => {
    console.log(`Selected page: ${newPage}`);
    setPage(newPage);
  };

  const languages = (item, index) => {
    //😊😊 Hello Sir! how are you? -----------
    let data = [];
    if (index % 3 == 0) {
      data = ["Reacts", "Javascript", "Typescript"];
    } else if (index % 3 == 1) {
      data = ["Reacts", "Typescript"];
    } else if (index > 4) {
      data = ["Angular", "HTML"];
    } else {
      data = ["Javascript"];
    }

    // axios
    //   .get(
    //     `https://api.github.com/repos/${data?.login}/${item?.name}/languages`
    //   )
    //   .then((res) => {
    //     let data = res.data;
    //     let dataArray = Object.keys(data).map((language) => {
    //       return { language, bytes: data[language] };
    //     });
    //     console.log("item url col", dataArray);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    return data.map((i) => (
      <Button
        type="submit"
        fullWidth
        variant="contained"
        style={{
          width: "100px",
          marginRight: "5px",
          textTransform: "capitalize",
        }}
      >
        {}
        {i || "Language"}
      </Button>
    ));
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      {open ? (
        <CustomizedSnackbars />
      ) : data?.id > 0 ? (
        <Box
          sx={{
            margin: "20px auto",
            padding: "30px",
            display: "flex",
            width: "70%",
            color: "white",
            //   height: "90vh",
            flexDirection: "column",
            borderRadius: "10px",
            background: "#053b74",
          }}
        >
          <div
            style={{
              display: "flex",
            }}
          >
            <div>
              <img
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  backgroundColor: "white",
                }}
                src={data?.avatar_url}
                onClick={() => setOpen(true)}
              />
            </div>
            <div
              style={{
                marginLeft: "10%",
                color: "white",
              }}
            >
              <p className="heading">{data?.name || "user's name"}</p>
              <Typography
                style={{
                  textTransform: "capitalize",
                }}
              >
                {data?.bio || "No bio available"}
              </Typography>
              <Typography
                style={{
                  textTransform: "capitalize",
                }}
              >
                {data?.location || "No location available"}
              </Typography>
              <Link
                href={`https://twitter.com/${data.twitter_username}`}
                variant="body2"
                target="_blank"
                style={{
                  color: "white",
                }}
              >
                Twitter:{" "}
                {data.twitter_username === null
                  ? "No twiter link"
                  : `https://twitter.com/${data.twitter_username}`}
              </Link>
            </div>
          </div>
          <div
            style={{
              margin: "10px",
            }}
          ></div>
          <Link
            href={data?.html_url}
            variant="body2"
            target="_blank"
            style={{
              color: "white",
            }}
          >
            {data?.html_url || "repo url"}
          </Link>
          <Box
            sx={{
              padding: "10px",
              paddingLeft: "0px",
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {repodata.map((item, index) => (
              <Card
                sx={{
                  width: "45%",
                  height: "150px",
                  marginBottom: "10px",
                  padding: "10px",
                  cursor: "pointer",
                  backgroundColor: "white",
                }}
                onClick={() => {
                  window.location.assign(item?.html_url);
                }}
              >
                <p className="cardHeading">{item?.name || "Repo Name"}</p>
                <Typography
                  style={{
                    fontSize: "15px",
                    fontWeight: "400",
                    marginBottom: "5px",
                  }}
                >
                  {item?.description?.length > 120
                    ? item?.description?.slice(0, 120) + "..."
                    : item?.description || "Description"}
                </Typography>
                {languages(item, index)}
              </Card>
            ))}
          </Box>
          <Pagination
            count={data?.public_repos}
            style={{
              backgroundColor: "white",
              color: "white",
              margin: "10px auto",
              padding: "5px",
              borderRadius: "10px",
            }}
            onChange={handleChange}
            shape="rounded"
          />
        </Box>
      ) : (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
    </Box>
  );
}
