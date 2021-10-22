import { TextField, Button } from "@material-ui/core"
import { useStyles } from "./style"
import React from "react"
import { BehaviorSubject, map } from "rxjs"

export const Board = () => {
  const defaultUsers: IUser[] = [
    {
      _id: "2584566",
      username: "Loki",
      score: 170,
    },
    {
      _id: "58658",
      username: "Thor",
      score: 155,
    },
  ]
  let numbers = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  const [users, setUsers] = React.useState<IUser[]>(defaultUsers)
  const [currentUser, setCurrentUser] = React.useState<IUser | undefined>()
  const [newUser, setNewUser] = React.useState<IUser | undefined>()
  const [clicked, setClicked] = React.useState(false)
  const [value, setValue] = React.useState<number[]>(numbers)
  const [winner, setWinner] = React.useState<IUser[] | undefined>()
  const [disabled, setDisabled] = React.useState<number[]>([])
  const buttons = ["X", "X", "X", "X", "X", "X", "X", "X", "X"]

  const gameUsers$ = new BehaviorSubject<IUser[]>([])

  gameUsers$.next(users)

  React.useEffect(() => {
    userWithHighestScore$.subscribe(setWinner)
  }, [users])
  const userWithHighestScore$ = gameUsers$.pipe(
    map(user => user?.filter(x => x.score === highestScore()).map(x => x))
  )

  const highestScore = () => {
    const win = users.map(x => x.score)
    return Math.max(...win)
  }
  const countOccurrences = (arr: Array<number>, n: number, x: number) => {
    let res = 0
    for (let i = 0; i < n; i++) {
      if (x === arr[i]) res++
    }
    return res
  }
  const gameHasEnded = countOccurrences(value, 9, 0) < 7

  React.useEffect(() => {
    const data = localStorage.getItem("game-users")
    if (data) {
      setUsers(JSON.parse(data))
    }
  }, [])
  React.useEffect(() => {
    localStorage.setItem("game-users", JSON.stringify(users))
  })
  React.useEffect(() => {
    if (currentUser) {
      setUsers([
        ...users,
        {
          _id: currentUser._id
            ? currentUser._id
            : Math.floor(Math.random() * 500000).toString(),
          username: currentUser.username,
          score: value.reduce((a: number, b: number) => a + b, 0),
        },
      ])
    }
  }, [gameHasEnded])
  const transform = (x: string) =>
    " " + x.charAt(0).toUpperCase() + x.slice(1).toLowerCase()
  const classes = useStyles()
  const set = (arr: Array<number>, index: number, val: number, pos: number) => {
    if (index < arr.length) {
      return [...arr.slice(0, pos), val, ...arr.slice(pos + 1)]
    } else {
      return [...arr, ...Array(index - arr.length), val]
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCurrentUser(newUser)
  }
  const prevScore = winner?.map(x => x.score)

  return (
    <div className={classes.root}>
      <div className={classes.total}>
        {gameHasEnded
          ? `Your score is ${value.reduce((a: number, b: number) => a + b, 0)}`
          : `You get 3 clicks to score`}
      </div>
      {currentUser && "_id" in currentUser ? (
        <div className={classes.welcome}>{`Hi ${transform(
          currentUser.username
        )}! Lets Play`}</div>
      ) : (
        <div className={classes.input}>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="dense"
              placeholder="New Name"
              variant="outlined"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewUser({
                  _id: Math.floor(Math.random() * 500000).toString(),
                  username: e.target.value,
                  score: 0,
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
      {gameHasEnded ? (
        <div className={classes.welcome}>
          {prevScore &&
          value.reduce((a: number, b: number) => a + b, 0) > prevScore[0]
            ? `You are the Winner`
            : `Oops! Winner is ${winner?.map(x => x.username)}`}
        </div>
      ) : null}
    </div>
  )
}
