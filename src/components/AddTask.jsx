import React, {useContext} from "react";
import Context from "../context";

function AddTask() {
    const {addNewTask} = useContext(Context);
    const [taskText, setTaskText] = React.useState('');

    const handleChange = (evt) => {
        setTaskText(evt.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Предотвращаем перезагрузку страницы
        if (taskText.trim()) { // Проверяем, что текст не пустой
            addNewTask(taskText);// Добавляем новую задачу на сервер
            setTaskText(''); // Очищаем поле ввода
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Напишите задачу" 
                    value={taskText}
                    onChange={handleChange}
                />
                <input
                    type="submit"
                    value="Добавить" 
                />
            </form>
        </div>
    )
}

export default AddTask;