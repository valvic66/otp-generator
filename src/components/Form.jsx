import React, {useState} from 'react';
import { generateOTP } from '../utils/index';

const otpData = [6, '12345abcde'];

const Form = ({}) => {
  const [id, setId] = useState(null);
  const [time, setTime] = useState(null);
  const [otp, setOtp] = useState(null);

  const handleClick = event => {
    event.preventDefault();

    if (id && time?.length > 0) {
      console.log("clicked", id, time, typeof id, typeof time, time.length);
    }

    const otp = generateOTP(...otpData);
    setOtp(otp);
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
      {id && <p>User id: {id}</p>}
      {time?.length > 0 && <p>Date.Time: {time}</p>}
      {otp?.length > 0 && <p>otp: {otp}</p>}
    </form>
  );
};

export default Form;
