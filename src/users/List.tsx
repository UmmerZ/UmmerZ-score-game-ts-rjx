import { TextField, Button } from "@material-ui/core"
import { useStyles } from "./style"
import React from "react"
import { rawUsers$ } from "../store"

export const UserList = () => {
  const defaultUser: IUser = {
    _id: "2584566",
    username: "Loki",
    score: 170,
  }
  let numbers = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  const [users, setUsers] = React.useState<IUser[]>([defaultUser])
  const [currentUser, setCurrentUser] = React.useState<IUser | undefined>()
  const [newUser, setNewUser] = React.useState<IUser | undefined>()
  const [clicked, setClicked] = React.useState(false)
  const [value, setValue] = React.useState<number[]>(numbers)
  const [disabled, setDisabled] = React.useState<number[]>([])
  const buttons = ["X", "X", "X", "X", "X", "X", "X", "X", "X"]

  // React.useEffect(() => {
  //   rawUsers$.subscribe(setUsers)
  // }, [])
  const classes = useStyles()
  const set = (arr: Array<number>, index: number, val: number, pos: number) => {
    if (index < arr.length) {
      return [...arr.slice(0, pos), val, ...arr.slice(pos + 1)]
    } else {
      return [...arr, ...Array(index - arr.length), val]
    }
  }
  const countOccurrences = (arr: Array<number>, n: number, x: number) => {
    let res = 0
    for (let i = 0; i < n; i++) {
      if (x === arr[i]) res++
    }
    return res
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCurrentUser(newUser)
  }
  const gameHasEnded = countOccurrences(value, 9, 0) < 7
  console.log(users.length)
  return (
    <div className={classes.root}>
      <div className={classes.total}>
        {gameHasEnded
          ? `Your score is ${value.reduce((a: number, b: number) => a + b, 0)}`
          : `You get 3 clicks to score`}
      </div>
      {currentUser && "_id" in currentUser ? (
        <div
          className={classes.welcome}
        >{`Hi ${currentUser.username}! Lets Play`}</div>
      ) : (
        <div className={classes.input}>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="dense"
              placeholder="New Name"
              variant="outlined"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewUser({
                  _id: Math.floor(Math.random() * 150 + 10).toString(),
                  username: e.target.value,
                })
              }
            />
            <Button
              variant="contained"
              className={classes.button2}
              type="submit"
            >
              ENTER YOUR NAME
            </Button>
          </form>
        </div>
      )}
      {buttons.map((button, index) => (
        <Button
          key={index}
          disabled={
            disabled.includes(index) ||
            gameHasEnded ||
            !(currentUser && "_id" in currentUser)
              ? true
              : false
          }
          variant="contained"
          className={classes.button}
          onClick={() => {
            setClicked(true)
            setValue(
              set(value, index, Math.floor(Math.random() * 90 + 10), index)
            )
            setDisabled([...disabled, index])
          }}
        >
          {clicked ? value[index] : button}
        </Button>
      ))}
    </div>
  )
}
