import React, { useEffect, useState } from "react";
// import Forcast from "../assets/rainy-day.png";
import Thunder from "../assets/thunder.jpg";
import { Button, Grid, makeStyles } from "@material-ui/core";
import axios from "axios";
import ForcastCard from "./ForcastCard";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  right: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  wrap: {
    [theme.breakpoints.down("lg")]: {
      flexWrap: "wrap",
    },
  },
  card: {
    backgroundColor: "#158689",
    display: "flex",
    flexDirection: "row",
    borderRadius: "12px",
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

export default function Card() {
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
    <div>
      <Grid container>
        <Grid item xs={2} sm={3} md={3} lg={3} className={classes.right}></Grid>
        <Grid className={classes.card} item xs={12} sm={6} md={6} lg={6}>
          <Grid
            style={{
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
            item
            xs={4}
            sm={4}
            md={3}
            lg={3}
          >
            {" "}
            <div className={classes.dataDetails}>
              <h2> {today?.name}</h2>
              <h3 style={{ margin: "0px" }}>{temp} F</h3>

              <img
                src={`http://openweathermap.org/img/wn/${today?.weather[0]?.icon}@2x.png`}
              />
              <p>{today?.weather[0]?.description}</p>
            </div>
          </Grid>
          <Grid
            className={classes.searchContainer}
            item
            xs={8}
            sm={8}
            md={9}
            lg={9}
          >
            <Grid
              style={{
                borderRadius: "12px",
                overflow: "hidden",
              }}
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
            >
              <input
                type="search"
                autoCapitalize
                placeholder="Paris"
                style={{
                  padding: "12px",
                  width: "100vw",
                }}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </Grid>
            <Grid
              style={{
                display: "flex",
                color: "#fff",
                justifyContent: "space-between",
              }}
              item
              md={12}
              lg={12}
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
            </Grid>

            <Grid
              className={classes.wrap}
              style={{
                display: "flex",
                flexDirection: "row",
              }}
              item
              md={12}
              lg={12}
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
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2} sm={3} md={3} lg={3} className={classes.right}></Grid>
      </Grid>
    </div>
  );
}
