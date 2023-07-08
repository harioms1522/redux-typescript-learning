import axios from "axios";
import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Dispatch } from "redux";

export const searchRepositories = (term: string)=>{
    return async (dispatch: Dispatch<Action>)=>{
        dispatch({
            type: ActionType.SEARCH_REPOSITORIES
        })
        try{
            let {data} = await axios.get(`https://registry.npmjs.org/-/v1/search`, {
                params: {
                    text: term
                }
            })
            data = data.objects.map((pack: any) => pack.package.name)
            console.log(data)

            dispatch({
                type:ActionType.SEARCH_REPOSITORIES_SUCCESS,
                payload: data
            })
        }catch(error: any){
            dispatch({
                type: ActionType.SEARCH_REPOSITORIES_ERROR,
                payload: error.message
            })
        }
    }
}