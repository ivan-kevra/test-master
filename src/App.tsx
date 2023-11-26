import {useState} from 'react';
import {v1} from 'uuid'
import style from './App.module.css';
import { Button } from './components/button/Button'
import { TaskCategory } from './components/taskCategory/TaskCategory'
import { Tasks } from './components/tasks/Tasks';
import { CardType, CategoryType, FilterValuesType, TaskType, allTasks, taskCategory, taskType } from './state/state';
import { AddCard } from './components/addCard/AddCard';

export const App = () =>{

  const [tasks, setTasks] = useState<Array<CardType>>(allTasks)

  let filteredTasks: Array<CardType> = []
    
  const [filter, setFilter] = useState<FilterValuesType>("All")

  switch(filter){
    case "To Do":
      filteredTasks = tasks.filter(t => t.status === "To Do");
      break;
    case "Ongoing":
      filteredTasks = tasks.filter(t => t.status === "Ongoing");
      break;
    case "Done":
      filteredTasks = tasks.filter(t => t.status === "Done");
      break;
    default:
      filteredTasks = tasks;
  }
  


  const [isModalVisible, setModalVisiblity] = useState(false)

  function changeModalState(){
    setModalVisiblity(!isModalVisible)
  }

  function addCard(title: string){
    const newCard: CardType = {
      id: v1(),
      name: title,
      description: "Dashboard UI design is a visually engaging and intuitively structured interface tailored to streamline project management",
      importance: "high",
      status: "Ongoing",
      type: "today",
      deadline: "11th - 15th Aug, 2023",
      file: 2,
      message: 3
    }
    const newTasks = [newCard, ...allTasks]
    setTasks(newTasks);
  }

  return (
    <div className={style.app}>
      <AddCard isModalVisible={isModalVisible} onClose={changeModalState} addCard={addCard}/>
      <div className={style.header}>
        <Button onOpen={changeModalState}/>
        <div className={style.taskCategory}>
      <TaskCategory  setFilter={setFilter} filter={filter} />
        </div>
      </div>
      <div className={style.tasks}>
        {
          taskType.map((tt: TaskType, index) => {
            const tasks = filteredTasks.filter(t => t.type === tt.filterParameter)
            return (
              <Tasks key={index}
              type={tt.type}
              checked={tt.checked}
              tasks={tasks}
            />
            )})}
      </div>
    </div>
  );
}


