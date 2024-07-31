
import './App.css';
import React, { useEffect } from 'react';
import Header from './components/Header';
import Active from './pages/Active';
import Completed from './pages/Completed';
import Context from './context';
import { Routes, Route } from "react-router-dom";

function App() {

  const [activeTasks, setActiveTasks] = React.useState([]);
  const [completedTasks, setCompletedTasks] = React.useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const requests = [
          fetch('http://localhost:3002/active'),
          fetch('http://localhost:3002/completed')
        ];

        const [activeResponse, completedResponse] = await Promise.all(requests);

        if (!activeResponse.ok || !completedResponse.ok) {
          throw new Error('Сеть ответила с ошибкой');
        }

        const activeData = await activeResponse.json();
        const completedData = await completedResponse.json();

        setActiveTasks(activeData);
        setCompletedTasks(completedData);
      } catch (error) {
        console.error('Ошибка при загрузке задач:', error);
      }
    };

    fetchTasks();
  }, []);

  const addNewTask = async (description) => {
    try {
      const response = await fetch("http://localhost:3002/active", {
        method: "POST",
        headers: {
          'Content-Type': 'application.json'
        },
        body: JSON.stringify({ description })
      });

      if (!response.ok) {
        throw new Error('Ошибка при добавлении задачи');
      };

      const newTask = await response.json();
      setActiveTasks(prev => [...prev, newTask]);

    } catch (error) {
      console.error("Произошла ошибка при отправке данных на сервер: ", error);
    };
  };

  const removeTask = async (id, path) => {
    try {
      //отправляем запрос на удаление элемента на сервере по id
      const response = await fetch(`http://localhost:3002/${path}/${id}`, { method: 'DELETE', });
      if (!response.ok) {
        console.log('Ошибка при удалении задачи');
      };

      //Фильтруем activeTasks игнорируя элемент по удаленному id. Обновляем setActiveTasks. 
      if (path === "active") {
        const newArray = activeTasks.filter(task => task.id !== id);
        setActiveTasks(newArray);
      } else if (path === "completed") {
        const newArray = completedTasks.filter(task => task.id !== id);
        setCompletedTasks(newArray);
      }
    } catch (error) {
      console.error('Ошибка при удалении задачи из сервера:', error)
    }

  }

  const addToCompleted = async (id) => {
    try {
      const activeResponse  = await fetch(`http://localhost:3002/active/${id}`);
      if (!activeResponse.ok) {
        throw new Error('Ошибка при получении задачи');
      };
      const taskData = await activeResponse.json();

       removeTask(id, 'active');

      const doneResponse = await fetch('http://localhost:3002/completed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData),
      });
      if (!doneResponse.ok) {
        throw new Error('Не удалось добавить задачу в выполненные');
      }

      
      setCompletedTasks(prev => [...prev, taskData]);
      console.log("taskData: ", taskData);


      

    } catch (error) {
      console.error('Произошла ошибка при переносе задачи:', error);
    }
  };

  const value = {
    activeTasks,
    setActiveTasks,
    addNewTask,
    removeTask,
    addToCompleted,
    completedTasks
  };

  return (
    <div className="App">
      <Context.Provider value={value}>
        <Header />
        <Routes>
          <Route path="/" element={<Active /> } />
          <Route path="/completed" element={<Completed />} />
        </Routes>
      </Context.Provider>
    </div>
  );
};

export default App;
