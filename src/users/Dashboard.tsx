import { makeStyles, Theme, createStyles, Divider } from "@material-ui/core"
import React from "react"
import { UserList } from "./List"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "80%",
      display: "flex",
      alignItems: "center",
      margin: "0 auto",
      justifyContent: "center",
    },
  })
)

export const Dashboard = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <UserList />
    </div>
  )
}
