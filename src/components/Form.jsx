import React, { useState, useEffect } from 'react';
import {
  generateOTP,
  generateRandomUserId,
  getNowDateTime,
} from '../utils/index';
import { OTP_EXPIRY_TIME } from '../constants/index';

let otpTimer;
let remainingTimeTimer;

const Form = ({ otpData }) => {
  const [id, setId] = useState('');
  const [time, setTime] = useState(getNowDateTime());
  const [otp, setOtp] = useState('');
  const [generateBtnStatus, setGenerateBtnStatus] = useState(false);
  const [timeRemaining, setRemainingTime] = useState(OTP_EXPIRY_TIME / 1000);
  const [startTimer, setTimerStart] = useState(false);

  useEffect(() => {
    if (startTimer) {
      remainingTimeTimer = setInterval(() => {
        setRemainingTime(timeRemaining - 1);
        setTime(getNowDateTime());
      }, 1000);
    }

    return () => clearInterval(remainingTimeTimer);
  }, [timeRemaining, startTimer]);

  const handleGenerateOTP = () => {
    setOtp(generateOTP(...otpData));
    if(!id) {
      setId(generateRandomUserId(1000));
    }
    setTimerStart(true);
    otpTimer = setInterval(() => {
      setOtp(generateOTP(...otpData));
      setRemainingTime(OTP_EXPIRY_TIME / 1000);
    }, OTP_EXPIRY_TIME);
    setGenerateBtnStatus(true);
  };

  const handleResetOTPGeneration = () => {
    clearInterval(otpTimer);
    clearInterval(remainingTimeTimer);
    setId('');
    setOtp('');
    setGenerateBtnStatus(false);
    setTimerStart(false);
    setTime(getNowDateTime());
    setRemainingTime(OTP_EXPIRY_TIME / 1000);
  };

  const handleIdChange = (event) => {
    event.preventDefault();
    setId(event.target.value);
  };

  const handleTimeChange = (event) => {
    event.preventDefault();
    setTime(event.target.value);
  };

  return (
    <form className="form">
      <div className="userid-container">
        <label htmlFor="id">User id</label>
        <input
          type="number"
          value={id}
          name="id"
          required
          onChange={(event) => handleIdChange(event)}
        />
      </div>
      <div className="datetime-container">
        <label htmlFor="datetime">Time</label>
        <input
          value={time}
          type="datetime-local"
          name="datetime"
          required
          onChange={(event) => handleTimeChange(event)}
          disabled
        />
      </div>
      <button
        type="button"
        className="button"
        onClick={(event) => handleGenerateOTP(event)}
        disabled={generateBtnStatus}
      >
        Generate OTP
      </button>
      <button
        type="button"
        className="button"
        onClick={() => handleResetOTPGeneration()}
        disabled={!generateBtnStatus}
      >
        Stop OTP generation
      </button>
      {otp?.length > 0 && (
        <p>
          OTP: {otp} was generated for user id {id} at {time}
        </p>
      )}
      {id && <p>Password will expire in: {timeRemaining} seconds!!!</p>}
    </form>
  );
};

export default Form;
