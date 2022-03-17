import React, {useState} from 'react';

const Form = ({}) => {
  const [id, setId] = useState(null);
  const [time, setTime] = useState(null);

  const handleClick = event => {
    event.preventDefault();

    console.log("clicked", id, time, typeof time, time.length);
  }

  const handleIdChange = event => {
    const id = event.target.value;
    
    event.preventDefault();
    setId(id);
  }

  const handleTimeChange = event => {
    const time = event.target.value;
    
    event.preventDefault();
    setTime(time);
  }

  return (
    <form className="form">
      <div className="userid-container">
        <label htmlFor="id">User id</label>
        <input
          type="number"
          name="id"
          required
          onChange={(event) => handleIdChange(event)}
        />
      </div>
      <div className="datetime-container">
        <label htmlFor="datetime">Time</label>
        <input
          type="datetime-local"
          name="datetime"
          required
          onChange={(event) => handleTimeChange(event)}
        />
      </div>
      <button
        type="submit"
        className="button"
        onClick={(event) => handleClick(event)}
      >Generate OTP</button>
    </form>
  );
};

export default Form;
