import { makeStyles, createStyles, Theme } from "@material-ui/core"

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "500px",
      display: "block",
      minHeight: "50%",
    },
    button: {
      padding: "30px",
      width: "120px",
      fontSize: 20,
      margin: "10px",
    },
    total: {
      fontSize: 30,
      background: "#2E3030",
      textAlign: "center",
      padding: "40px",
      width: "320px",
      margin: "10px 10px 100px 10px",
      borderRadius: "5px",
    },
    button2: {
      marginTop: "10px",
      padding: "7px",
      marginLeft: "27px",
    },
    input: {
      margin: "0 0 50px 10px ",
    },
    welcome: {
      fontSize: 30,
      background: "#2E3030",
      textAlign: "center",
      margin: " 0 10px 20px 10px",
      padding: "10px",
      borderRadius: "5px",
      width: "380px",
    },
  })
)
