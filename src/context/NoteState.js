import NoteContext from "./noteContext";
import { useState } from "react";
//use the context here

const NoteState =(props)=>{
    //take an object
    const s1 = {
        "name":"Mahin",
        "class": "A1"
    }
    //save the val in the state
    const[state, setState] = useState(s1);

    //a func to change the obj after 1 sec
    const  update = ()=>{
        setTimeout(()=>{
            setState({
                "name":"Raz",
                "class":"10b"
            })
        },1000);
    }

    return(
        //NoteContext is the name we used while importing the context file
        <NoteContext.Provider value={{state,update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;