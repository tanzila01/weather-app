import React, { useEffect, useState } from "react";
import Thunder from "../assets/thunder.jpg";
import {
  Button,
  Grid,
  makeStyles,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import axios from "axios";
import ForcastCard from "./ForcastCard";
import { Link } from "react-router-dom";
// import { mobile } from "../responseive";
// import { tablet } from "../responseive";

const useStyles = makeStyles((theme) => ({
  right: {
    //
    // tablet({ display: none })
    // you can use this as well - less accuray at 768 px
    // [theme.breakpoints.down("sm")]: {
    //   display: "none",
    // },
    // you can use the media querry - more accuracy
    // ["@media (max-width:760px)"]: {
    //   display: "none",
    // },
    // for min and max width
    ["@media (min-width: 300px) and (max-width: 760px)"]: {
      display: "none",
    },
  },
  wrap: {
    [theme.breakpoints.down("lg")]: {
      flexWrap: "wrap",
    },
  },
  card: {
    backgroundColor: "pink",
    display: "flex",
    flexDirection: "row",

    // ["@media (max-width:425px)"]: {
    //   flexDirection: "column",
    // },
  },
  dataDetails: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    color: "#fff",
    alignItems: "center",
  },
  searchContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "20px",
  },
}));

export default function CardMediaQuery() {
  const classes = useStyles();
  const [search, setSearch] = useState("Paris");
  const [today, setToday] = useState();
  const [forcastData, setForcastData] = useState();
  const [update, setUpdate] = useState("");
  const MINUTE_MS = 60000;
  useEffect(() => {
    axios
      .post(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=7bb146e83da9de119d8e785fdd490228`
      )
      .then(
        (response) => {
          setToday(response.data);
          // const numberBeforeDecimal = parseInt(today?.main?.temp_max);
        },
        (error) => {
          console.log(error);
        }
      );
    const interval = setInterval(() => {
      setUpdate(interval);
    }, MINUTE_MS);
    return () => clearInterval(interval);
  }, [search, update]);

  const temp = parseInt(today?.main?.temp_max);
  useEffect(() => {
    axios
      .post(
        `https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=7bb146e83da9de119d8e785fdd490228`
      )
      .then(
        (response) => {
          let forcastList = response?.data?.list;
          var data = forcastList.slice(1, 6);
          setForcastData(data);
        },
        (error) => {
          console.log(error);
        }
      );
  }, [search]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <div className={classes.right} style={{ backgroundColor: "green" }}>
        {" "}
        Left j djek je jri
      </div>
      <div className={classes.card}>
        {" "}
        <div
          className={classes.dataDetails}
          style={{ backgroundColor: "cadetblue" }}
        >
          <h2> {today?.name}</h2>
          <h3 style={{ margin: "0px" }}>{temp} F</h3>

          <img
            src={`http://openweathermap.org/img/wn/${today?.weather[0]?.icon}@2x.png`}
          />
          <p>{today?.weather[0]?.description}</p>
        </div>
        <div
          className={classes.searchContainer}
          style={{ backgroundColor: "coral" }}
        >
          <div
            style={{
              borderRadius: "12px",
              overflow: "hidden",
              backgroundColor: "darkgrey",
            }}
          >
            <input
              type="search"
              autoCapitalize
              placeholder="Paris"
              style={{
                padding: "12px",
                //  width: "100vw",
                // width: "30vw",
              }}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              color: "#fff",
              justifyContent: "space-between",
            }}
          >
            {" "}
            <p>
              {" "}
              Max temp
              <br /> Min temp
              <br /> Humidity <br /> Pressure <br /> Wind speed
            </p>
            <p>
              {" "}
              {today?.main?.temp_max} <br /> {today?.main?.temp_min} <br />{" "}
              {today?.main?.humidity} <br /> {today?.main?.pressure} <br />{" "}
              {today?.wind?.speed}
            </p>
          </div>

          <div
            className={classes.wrap}
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            {forcastData?.map((item, index) => (
              <Link
                to="/forcast"
                state={{ item: { item } }}
                style={{ textDecoration: "none", color: "#000" }}
              >
                <ForcastCard item={item} />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className={classes.right} style={{ backgroundColor: "green" }}>
        {" "}
        Right j djek je jri
      </div>
    </div>
  );
}
