import { css } from "styled-components";

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 380px) {
      ${props}
    }

    @media only screen (min-width: 300px) and (min-width: 760px) {
      display: "none";
    }
  `;
};

export const tablet = (props) => {
  return css`
    @media only screen (min-width: 400px) and (min-width: 760px) {
      ${props}
    }
  `;
};
