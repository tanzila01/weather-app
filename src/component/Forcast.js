import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button, Grid, makeStyles } from "@material-ui/core";
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
  container: {
    backgroundColor: "#158689",
    display: "flex",
    flexDirection: "row",
    borderRadius: "12px",
  },
  forcastDetails: {
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
export default function Forcast() {
  const classes = useStyles();
  const location = useLocation();
  const { item } = location.state;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0a5658" }}>
      <Grid container>
        <Grid item xs={2} sm={3} md={3} lg={3} className={classes.right}></Grid>
        <Grid className={classes.container} item xs={12} sm={6} md={6} lg={6}>
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
            <div className={classes.forcastDetails}>
              <h3 style={{ margin: "0px" }}>{item?.item?.main?.temp} F</h3>

              <img
                src={`http://openweathermap.org/img/wn/${item?.item?.weather[0]?.icon}@2x.png`}
              />
              <p>{item?.item?.weather[0]?.description}</p>
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
            ></Grid>
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
                {item?.item?.main?.temp_max} <br /> {item?.item?.main?.temp_min}{" "}
                <br /> {item?.item?.main?.humidity} <br />{" "}
                {item?.item?.main?.pressure} <br /> {item?.item?.wind?.speed}
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
            ></Grid>
          </Grid>
        </Grid>
        <Grid item xs={2} sm={3} md={3} lg={3} className={classes.right}></Grid>
      </Grid>
    </div>
  );
}
