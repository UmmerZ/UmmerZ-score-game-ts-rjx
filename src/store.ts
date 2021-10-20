import { BehaviorSubject, map } from "rxjs"

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

export const rawUsers$ = new BehaviorSubject<IUser[]>([])

fetch("./samplefile.json")
  .then(res => res.json())
  .then((data: Array<IUser>) => rawUsers$.next(data))

// export const rawUserValid$ = rawUsers$.pipe(
//   map(user =>
//     user.map(x => ({
//       ...x,
//       valid: x.email.match(emailRegex) ? true : false,
//     }))
//   )
// )

// const fetchUsers = (): void => {
//   getUsers()
//     .then((data: IUser[] | any) => rawUsers$.next(data))
//     .catch((err: Error) => console.log(err))
// }
// fetchUsers()
