import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { HiX,HiPlus, HiOutlineTrash } from "react-icons/hi";
import Form from "../components/TaskForm"; 
import HabitForm from "../components/HabitForm";
import Calendar from 'react-calendar';


function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showHabitForm, setShowHabitForm] = useState(false);
  const [date, setDate] = useState(new Date());

  // When tasks change, derive events
  useEffect(() => {
    setEvents(
      tasks.map(task => ({
        id: task._id,
        title: task.task,
        start: `${task.taskdate}T${task.taskStarttime}`,
        end: `${task.taskdate}T${task.taskEndtime}`,
      }))
    );
  }, [tasks]);

  // Handle form submit for tasks
  const handleTaskFormSubmit = async(data) => {
    const newTask = { ...data, completed: false, completedOn: null };
    try{
      const res = await fetch("http://localhost:5000/api/tasks",{
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      if (!res.ok) throw new Error("Failed to add task");
      const savedTask = await res.json();
      setTasks(prev => [...prev, savedTask]);
      setShowTaskForm(false);
    }
    catch(error){
      console.error("Error adding task:", error.message);
    }
  };

  // Handle Habitform submit for habits
  const handleHabitForm = (data)=>{
    const newhabit = { ...data };
    sethabits((prev) => [...prev, newhabit]);
    setShowHabitForm(false);
  }

  // Delete  Habit
  const handleHabits = (index) => {
    sethabits((prev) => prev.filter((_, i) => i !== index));
  };


  // Toggle task completion
  const toggleTask = async (index) => {
    const task = tasks[index];
    const updatedTask = {
      ...task,
      completed: !task.completed,
      completedOn: !task.completed ? new Date().toISOString() : null,
    };

    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });

      if (!res.ok) throw new Error("Failed to update task");

      const savedTask = await res.json();

      setTasks((prev) =>
        prev.map((t) => (t._id === savedTask._id ? savedTask : t))
      );
    } catch (error) {
      console.error("Error updating task:", error.message);
    }
  };


  // Handle drag event move
  const handleEventDrop = (info) => {
    updateTaskDateTime(info.event);
  };

  // Handle resize event duration
  const handleEventResize = (info) => {
    updateTaskDateTime(info.event);
  };

  // Updating tasks after changing in the calendar 
  const updateTaskDateTime = async (event) => {
    const updatedTask = {
      taskdate: new Date(event.start).toISOString().split('T')[0],
      taskStarttime: new Date(event.start).toTimeString().slice(0,5),
      taskEndtime: new Date(event.end).toTimeString().slice(0,5),
    };

    // Update in frontend state
    setTasks((prev) =>
      prev.map((t) =>
        t._id === event.id ? { ...t, ...updatedTask } : t
      )
    );

    // Send update to backend
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${event.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });
      if (!res.ok) throw new Error("Failed to update task time");
    } catch (error) {
      console.error("Error updating task time:", error.message);
    }
  };



  // Load from Backend
  useEffect(()=>{
    const fetchTasks = async () => {
      try{
        const res = await fetch("http://localhost:5000/api/tasks")
        if(!res.ok) throw new Error("Failed to fetch tasks");
        const data = await res.json()
        setTasks(data);
      }
      catch (error) {
        console.error("Error fetching tasks:", error.message);
      }
    }
    fetchTasks()
  },[])
  useEffect(() => {
    const cleanupTasks = async () => {
      try {
        await fetch("http://localhost:5000/api/tasks/cleanup", { 
          method: "DELETE" 
        });
        // Refresh tasks after cleanup
        const res = await fetch("http://localhost:5000/api/tasks");
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error("Cleanup error:", err.message);
      }
    };

    // Run cleanup on mount
    cleanupTasks();
  }, []);
  const [habits, sethabits] = useState(() => {
    return JSON.parse(localStorage.getItem("habits")) || [];
  });

  
  

  return (
    <div className="main flex flex-col gap-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 ml-2 mr-2">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h1 className="text-3xl font-semibold">👋 Welcome,<br/>Back</h1>
          <p className="text-gray-800">Organise your day With Habique </p>
          
          <div className="bg-white rounded-lg shadow-md p-4">
            <h1 className="text-2xl font-semibold">Habit Streaks 🔥</h1>
            <h1></h1>
          </div>
        </div>
        <div className="flex flex-col bg-white rounded-lg shadow-md p-4 gap-4">
          <div className="flex flex-row justify-between">
            <h1 className="text-2xl font-semibold">Habits</h1>
            <button
            className="w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white flex justify-center items-center rounded-lg shadow"
            onClick={() => setShowHabitForm(true)}
            >
              <HiPlus size={20}/>
            </button>
            {showHabitForm && (
              <div className="fixed inset-0 flex items-center justify-center flex-col backdrop-blur-sm bg-black/30 z-50">
              <button
                className="absolute top-6 right-6"
                onClick={() => {
                  setShowHabitForm(false);
                }}
              >
                <HiX size={30} />
              </button>
              <HabitForm onSubmit={handleHabitForm} />
            </div>
            )}
          </div>
          <div className="flex flex-col gap-4">
  
              {habits.length === 0 ? (
                <p>No Habits added yet</p>
              ) : (
                habits.map((h, index) => (
                  <div
                  key={index} 
                  className="flex items-center bg-white rounded-lg shadow-md p-4 w-full md:relative group">
                  <div className="w-5 h-5 bg-blue-400 rounded-full m-2"></div>{h.Habit}
                    <button 
                    className="absolute right-6 md:opacity-0 group-hover:opacity-100 transition"
                    onClick={() => 
                      handleHabits(index)
                    }>
                      <HiOutlineTrash size={20}/>
                    </button>
                  </div>
                ))
              )}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex flex-col justify-center items-center gap-2">
          <p className="text-lg font-bold">Selected Date: {date.toDateString()}</p>
          <Calendar
          mode = 'single'
          onChange={setDate} // Update state when date changes
          value={date}  
          className="rounded-lg border shadow-md text-lg"
          />
        </div>
      </div>
      <h1 className="text-2xl font-semibold text-center">Daily Task Tracker</h1>
      <div className="grid grid-cols-1 md:grid-cols-10 gap-10 w-full bg-white rounded-lg shadow p-4">
        <div className="flex flex-col gap-4 items-center md:col-span-3">
          <button
            className="w-[80%] h-15 bg-blue-500 hover:bg-blue-600 text-white text-cente p-4 rounded-lg shadow"
            onClick={() => setShowTaskForm(true)}
          >
            <p className="text-xl">+ Add Task</p>
          </button>

          {showTaskForm && (
            <div className="fixed inset-0 flex items-center justify-center flex-col backdrop-blur-sm bg-black/30 z-50">
              <button
                className="absolute top-6 right-6"
                onClick={() => {
                  setShowTaskForm(false);
                }}
              >
                <HiX size={30} />
              </button>
              <Form onSubmit={handleTaskFormSubmit} />
            </div>
          )}

          <div className="bg-white rounded-lg shadow p-4 w-[80%]">
            {tasks.length === 0 ? (
              <p>No Tasks added yet</p>
            ) : (
              tasks.map((t, index) => (
                <div
                  key={index}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <input
                    type="checkbox"
                    checked={t.completed}
                    onChange={() => toggleTask(index)}
                  />
                  <span
                    style={{
                      marginLeft: "8px",
                    }}
                  >
                    {t.task} — {t.taskdate}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4 md:col-span-7">
          {/*
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridDay"
            editable={true}
            droppable={true}
            events={events}
            eventDrop={handleEventDrop}
            eventResize={handleEventResize}
            headerToolbar={{
              left: "prev", 
              center: "title",
              right: "next"
            }}
            /> */}
            {/*New calendar*/}
            <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            editable={true}
            droppable={true}
            events={events}
            eventDrop={handleEventDrop}
            eventResize={handleEventResize}
            headerToolbar={{
              left: "prev", 
              center: "title",
              right: "next"
            }}
            height="90vh"
          />
          </div>
        </div>
    </div>
  );
}

export default Dashboard;
