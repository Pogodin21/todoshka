import React, { useContext } from "react";
import Context from "../../context";


function Task({
    description,
    id,
    path,
    completed = false,
}) {

    const { removeTask, addToCompleted } = useContext(Context);


    return (

        <div className="item">
            {description}
            <div className="more">
                {
                    completed ? <div className="trash" onClick={() => removeTask(id, path)}>
                        <img width={20} height={15} src="/img/trash.svg" alt="trash" />
                    </div> : <><div className="trash" onClick={() => removeTask(id, path)}>
                        <img width={20} height={15} src="/img/trash.svg" alt="trash" />
                    </div>
                        <div className="done" onClick={() => addToCompleted(id)}>
                            <img width={20} height={15} src="/img/done.svg" alt="trash" />
                        </div> </>

                }
                
            </div>
        </div>
    )
}

export default Task;
