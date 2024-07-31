import React, {useContext} from "react";
import Context from "../context";
import Task from "../components/Task";


function Completed() {
    const {completedTasks} = useContext(Context);

    return completedTasks.map((task) => <Task  key={task.id}  path={'completed'} completed={true}  description={task.description} id={task.id}/>)
    
    
};
 

export default Completed;