import React, { useState } from 'react';
import styled from 'styled-components';
const Form = ({ onSubmit }) => {
  const [task , settask] = useState("")
  const [taskdate,settaskdate] = useState("")
  const [taskStarttime,settaskStarttime] = useState("")
  const [taskEndtime,settaskEndtime] = useState("")
  const handleSubmit = (e)=>{
    e.preventDefault();
    const isoDate = new Date(taskdate).toISOString().split("T")[0];
    const id =  Date.now().toString()
    onSubmit({ id, task, taskdate: isoDate, taskStarttime, taskEndtime});
    settask("");
    settaskdate("");
  }
  return (
    <StyledWrapper>
      <div className="container">
        <div className="heading">Add Task</div>
        <form onSubmit={handleSubmit} className="form">
          <input 
          required 
          className="input" 
          type="text"  
          placeholder="Add Task"
          value={task}
          onChange={(e)=>{settask(e.target.value)}} />
          <input 
          required 
          className="input" 
          type="date"  
          placeholder="Add Date"
          value={taskdate}
          onChange={(e)=>{settaskdate(e.target.value)}} />
          <label class="block text-sm ml-3 mt-2 font-medium text-gray-700">Start Time:</label>
          <input 
          required 
          className="input-time" 
          type="time"  
          value={taskStarttime}
          onChange={(e)=>{settaskStarttime(e.target.value)}} />
          <label class="block text-sm ml-3 mt-2 font-medium text-gray-700">End Time:</label>
          <input 
          required 
          className="input-time" 
          type="time"  
          value={taskEndtime}
          onChange={(e)=>{settaskEndtime(e.target.value)}} />
          <input className="Submitbutton" type="submit" defaultValue="Submit" />
        </form>
    </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .container {
    max-width: 80vw;
    min-height:50vh
    background: #F8F9FD;
    background: linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(244, 247, 251) 100%);
    border-radius: 40px;
    padding: 25px 35px;
    border: 5px solid rgb(255, 255, 255);
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 30px 30px -20px;
    margin: 20px;
  }

  .heading {
    text-align: center;
    font-weight: 900;
    font-size: 30px;
    color: rgb(16, 137, 211);
  }

  .form {
    margin-top: 20px;
  }

  .form .input {
    width: 100%;
    background: white;
    border: none;
    padding: 15px 20px;
    border-radius: 20px;
    margin-top:1.12rem;
    box-shadow: #cff0ff 0px 10px 10px -5px;
    border-inline: 2px solid transparent;
  }

  .form .input::-moz-placeholder {
    color: rgb(170, 170, 170);
  }

  .form .input::placeholder {
    color: rgb(170, 170, 170);
  }

  .form .input:focus {
    outline: none;
    border-inline: 2px solid #12B1D1;
  }
  .form .input-time {
    width: 100%;
    background: white;
    border: none;
    padding: 15px 20px;
    border-radius: 20px;
    margin-top: 0.6rem;
    box-shadow: #cff0ff 0px 10px 10px -5px;
    border-inline: 2px solid transparent;
  }
    .form .input-time::-moz-placeholder {
    color: rgb(170, 170, 170);
  }

  .form .input-time::placeholder {
    color: rgb(170, 170, 170);
  }

  .form .input-time:focus {
    outline: none;
    border-inline: 2px solid #12B1D1;
  }
  .form .Submitbutton {
    display: block;
    width: 100%;
    font-weight: bold;
    background: linear-gradient(45deg, rgb(16, 137, 211) 0%, rgb(18, 177, 209) 100%);
    color: white;
    padding-block: 15px;
    margin: 20px auto;
    border-radius: 20px;
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 20px 10px -15px;
    border: none;
    transition: all 0.2s ease-in-out;
  }

  .form .Submitbutton:hover {
    transform: scale(1.03);
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 23px 10px -20px;
  }

  .form .Submitbutton:active {
    transform: scale(0.95);
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 15px 10px -10px;
  }
`

export default Form;
