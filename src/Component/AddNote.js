import React,{useState,useContext} from 'react'
import noteContext from '../context/noteContext';
import Notes from './Notes';
function AddNote() {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note,setNote] = useState({title:"",description:"",tag:""})
    const handleClick= (e)=>{
        //it will not reload the page
        e.preventDefault();
        addNote(note);
    }
    const onChange=(e)=>{
        //...note means whatever was in the note it'll remain but whatever is coming next(after the comma) add or override them.
        //e.target.name is the iput box name and value is the value of the input box
        setNote({...note,[e.target.name]: e.target.value})
    }
  return (
    <div>
      <div className="container my-3">
            <h2>Add a Note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onClick={onChange}/>
                    <div id="emailHelp" className="form-text"></div>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onClick={onChange}/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
            </div>
    </div>
  )
}

export default AddNote
