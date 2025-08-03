import { useState } from "react";
import { nanoid } from "nanoid";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);

  const taskList = tasks?.map((task) => (
    <Todo
      name={task.name}
      id={task.id}
      completed={task.completed}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      key={task.id}
      /* Should always pass a unique key to anything you render with iteration.
         Nothing obvious will change in your browser, but if you do not use unique keys, 
         React will log warnings to your console and your app may behave strangely! */
    />
  ));

  function addTask(name) {
    console.log(tasks[0]);
    const newTask = { name, id: `todo-${nanoid()}`, completed: false };
    setTasks([...tasks, newTask]);
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const updatedTasks = tasks.filter((task) => id !== task.id);
    setTasks(updatedTasks);
  }

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        <FilterButton name="All" />
        <FilterButton name="Active" />
        <FilterButton name="Completed" />
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
