import { Button } from "@material-ui/core"
import React from "react"
import { Board } from "./users/List"
import { useStyles } from "./users/style"



function App() {
  const classes = useStyles()
  return (
    <div className= {classes.appRoot}>
      <Button disabled variant="contained" className={classes.refresh}>Play Again</Button>
      <Board />
    </div>
  )
}

export default App
