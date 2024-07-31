import React, {useContext} from "react";
import Context from "../context";
import Task from "../components/Task";
import AddTask from '../components/AddTask';


function Active() {
const {activeTasks} = useContext(Context);

    return (
        <>
        {activeTasks.map((task) => <Task key={task.id} path={'active'} description={task.description} id={task.id} task={task}/>)}
        <AddTask />
        </>
        
    )
};
 

export default Active;