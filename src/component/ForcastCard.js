import React, { useState, useEffect } from "react";
import { Button, Grid, makeStyles } from "@material-ui/core";
import axios from "axios";

function ForcastCard({ item }) {
  return (
    <div>
      <Grid container>
        <Grid>
          <Grid
            style={{
              background: "#b1f3f545",
              borderRadius: "12px",
              display: "flex",
              flexDirection: "column",
              //   paddingRight: "10px",
              //   paddingLeft: "10px",
              marginLeft: "8px",
              marginBottom: "4px",
              marginTop: "4px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              style={{ height: " 80px", width: "78px", margin: "0px" }}
              src={`http://openweathermap.org/img/wn/${item?.weather[0]?.icon}@2x.png`}
            />
            <p style={{ color: "#fff" }}>
              {item?.main?.temp_max} F <br /> {item?.main?.temp_min} F
            </p>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default ForcastCard;
