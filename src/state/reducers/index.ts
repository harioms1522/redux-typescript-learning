import RepositoriesReducer from "./repositoriesReducer"
import { combineReducers } from "redux"

const reducers = combineReducers({
    repositories: RepositoriesReducer
})

export default reducers
export type RootState = ReturnType<typeof reducers>
