import { React, useState } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import dateFnsFormat from "date-fns/format";
import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";
import addDays from "date-fns/addDays";
import isToday from "date-fns/isToday";

const FORMAT = "dd/MM/yyyy";
function formatDate(date, format, locale) {
  return dateFnsFormat(date, format, { locale });
}

const TaskItems = ({ selectedTab, tasks }) => {
  let taskToRender = [...tasks];
  if (selectedTab === "NEXT_7") {
    taskToRender = taskToRender.filter(
      (taskItem) =>
        isAfter(taskItem.date, new Date()) &&
        isBefore(taskItem.date, addDays(new Date(), 7))
    );
  }
  if (selectedTab === "TODAY") {
    taskToRender = taskToRender.filter((taskItem) => isToday(taskItem.date));
  }

  return (
    <div className="task-items-container">
      {taskToRender.map(({ task, date }) => (
        <div className="task-item">
          <p>{task}</p>
          <p>{dateFnsFormat(new Date(date), FORMAT)}</p>
        </div>
      ))}
    </div>
  );
};
const AddTask = ({ onCancel, onAddTask }) => {
  const [task, setTask] = useState("");
  const [date, setDate] = useState(null);
  return (
    <div className="add-task-dialog">
      <input
        value={task}
        onChange={({ target: { value } }) => setTask(value)}
      />
      <div className="add-task-actions-container">
        <div className="btns-container">
          <button
            className="add-btn"
            onClick={() => {
              onAddTask(task, date);
              setTask("");
              onCancel();
            }}
            disabled={task === "" ? true : false}
          >
            ADD Task
          </button>
          <button
            className="cancel-btn"
            onClick={() => {
              onCancel();
              setTask("");
            }}
          >
            Cancel
          </button>
        </div>
        <div className="icon-container">
          <DayPickerInput
            onDayChange={(day) => setDate(day)}
            formatDate={formatDate}
            format={FORMAT}
            dayPickerProps={{
              modifiers: {
                disabled: [{ before: new Date() }],
              },
            }}
            placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
          />
        </div>
      </div>
    </div>
  );
};
const TASKS_HEADER_MAPPING = {
  INBOX: "Inbox",
  TODAY: "Today",
  NEXT_7: "Next 7 days",
};
const Task = ({ selectedTab }) => {
  const [showAddTask, setShowADDTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const addNewTask = (task, date) => {
    const newTaskItem = { task, date: date || new Date() };
    setTasks([...tasks, newTaskItem]);
  };
  return (
    <div className="tasks">
      <h1>{TASKS_HEADER_MAPPING[selectedTab]}</h1>
      {selectedTab === "INBOX" ? (
        <div
          className="add-task-btn"
          onClick={() => setShowADDTask(!showAddTask)}
        >
          <span className="plus">+</span>
          <span className="add-task-text">Add task</span>
        </div>
      ) : null}
      {showAddTask && (
        <AddTask
          onAddTask={addNewTask}
          onCancel={() => setShowADDTask(false)}
        />
      )}
      {tasks.length > 0 ? (
        <TaskItems tasks={tasks} selectedTab={selectedTab} />
      ) : (
        <p>No Tasks Yet</p>
      )}
    </div>
  );
};

export default Task;
