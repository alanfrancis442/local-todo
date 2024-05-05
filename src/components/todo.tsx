import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { motion } from "framer-motion";
type Todo = {
  id: number;
  text: string;
  isdone: boolean;
};

const Todo: React.FC = () => {
  const history = useHistory();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState<string>('');

  const getUserData = () => {
    const currentUser = localStorage.getItem('logedUser');
    let data = JSON.parse(localStorage.getItem(currentUser));
    return data;
  }

  useEffect(() => {
    if(localStorage.getItem('logedUser') === null){
      history.push('/login');
    }
    let data = getUserData();
    console.log(data.tasks);
    setTodos(data.tasks);
  },[])

  useEffect(() => {
    setTask('');
  },[todos])
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (task) {
      // setTodos([...todos, { id: Date.now(), text: task }]);
      // setTask('');
      let data = getUserData();
      data.tasks.push({ id: Date.now(), text: task, isdone: false });
      console.log(data);
      const currentUser = localStorage.getItem('logedUser');
      localStorage.setItem(currentUser, JSON.stringify(data));
      //setTask('');
      setTodos(data.tasks);
    }
  };

  const handleDelete = (id: number) => {
    let temp = (todos.filter(todo => todo.id !== id));
    let data = getUserData();
    data.tasks = temp
    const currentUser = localStorage.getItem('logedUser');
    localStorage.setItem(currentUser, JSON.stringify(data));
    setTodos(temp);
  };

  const handleDone = (id: number) => {
    let temp = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, isdone: !todo.isdone };
      }
      return todo;
    });
    console.log(temp);
    let data = getUserData();
    data.tasks = temp
    const currentUser = localStorage.getItem('logedUser');
    localStorage.setItem(currentUser, JSON.stringify(data));
    setTodos(temp);
  };

  // let todos = [
  //   {
  //     id: 1,
  //     text: 'task 1',
  //   },
  //   {
  //     id: 2,
  //     text: 'task 2',
  //   },
  //   {
  //     id: 3,
  //     text: 'task 3',
  //   },
  // ]

  return (
    <div className="p-8 flex flex-col gap-8 min-h-screen bg-gray-50 dark:bg-gray-900 realative overflow-hidden">
      <p className='absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] tracking-tight leading-tight lg:text-[24rem] sm:text-[12rem] text-center font-bold text-gray-500  w-full'> My Todo</p>
        <div className='text-2xl mb-4 text-white w-full flex justify-between '>
            <p>
            Welcome {}
            </p>
            <button onClick={() => {
              localStorage.setItem('isLoggedIn', 'false');
              history.push('/login');
            }} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                logout
              </button>
        </div>
      <div className="w-full max-full flex flex-col items-center bg-red- realative z-20">
        <form onSubmit={handleAdd} className="mb-4">
          <div className="flex items-center">
            <input
              type="text"
              className="w-full p-2 mr-4 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Add new task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              Add
            </button>
          </div>
        </form>
      </div>
        <div className='grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-5 gap-4 realative z-20'>
          {todos.map(todo => (
            <motion.div
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            key={todo.id} className={`flex flex-col min-h-64 items-center justify-between ${todo.isdone ? `bg-green-300`:'bg-white'} p-2 my-2 rounded-2xl shadow`}>
              <div className='flex justify-center items-center w-full h-full font-bold text-lg'>
                <span>{todo.text}</span>
              </div>
              <div className='flex gap-2'>  
                <button onClick={() => handleDone(todo.id)} className='py-1 px-2 rounded-md bg-green-600 hover:bg-green-500 text-white'>Done</button>
                <button onClick={() => handleDelete(todo.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
    </div>
  );
};

export default Todo;
