import { createTheme } from "@mui/material";
import { BORDERRADIUS } from "../../utils/constants/uiConsts";

const base = createTheme({
  palette: {
    primary: {
      main: "#068DCF",
    },
    secondary: {
      main: "#34B3BC",
    },
  },

  typography: {
    fontFamily: "Quicksand, sans-serif",
    fontSize: 14,
  },

  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: `${BORDERRADIUS}px`,
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          padding: "1rem",
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: `${BORDERRADIUS}px`,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: BORDERRADIUS,
          textTransform: "capitalize",
          boxShadow: "none",
        },
      },
    },
    // MuiFilledInput: {
    //   styleOverrides: {
    //     root: ({ ownerState }) => {
    //       switch (ownerState.size) {
    //         case "small":
    //           return {
    //             height: "2.34rem",
    //             borderRadius: `${BORDERRADIUS}px`,
    //           };
    //         case "medium":
    //           return {
    //             height: "3rem",
    //           };
    //         default:
    //           return {
    //             height: "2.34rem",
    //           };
    //       }
    //     },
    //   },
    // },
  },
});

export default base;
