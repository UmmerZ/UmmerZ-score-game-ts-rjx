interface IUser {
  _id: string
  username: string
  score?: number
}
interface UserProps {
  user: IUser
}
