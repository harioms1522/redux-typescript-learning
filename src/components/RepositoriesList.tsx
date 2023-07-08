import React, {  FormEvent, useEffect, useRef, useState } from 'react'
import { useActions } from '../hooks/actionCreators'
import { useTypedSelector } from '../hooks/useTypedSelector'

const RepositoriesList: React.FC = ()=> {
    const ref= useRef<HTMLInputElement | null>(null)
    const [term, setTerm] = useState("")
    const actions = useActions()
    const {data, error, loading} = useTypedSelector((state:  any) => state.repositories)
    useEffect(()=>{
        if(ref.current){
            ref.current.focus()
        }
    }, [])

    const onSubmit = (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        actions.searchRepositories(term)
    }

    const renderResults = ()=>{
        if(error){
            return <p>{error}</p>
        }

        if(!loading){
            if(data && data.length>0){
                return data.map((pkg: any)=><div>{pkg}</div>)
            }else{
                return <p>Please Search!</p>
            }
        }else{
            return <p>Loading</p>
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" ref={ref} value={term} onChange={ e=>setTerm(e.target.value) }/>
                <button>Search</button>
            </form>
            <div>
                {renderResults()}
            </div>
        </div>
    )
}

export default RepositoriesList
