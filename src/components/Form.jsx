import React, { useState, useEffect } from 'react';
import {
  generateOTP,
  generateRandomUserId,
  getNowDateTime,
} from '../utils/index';
import { OTP_EXPIRY_TIME } from '../constants/index';

let otpTimer;
let remainingTimeTimer;

const initialUserData = {
  userid: '',
  time: getNowDateTime(),
};

const Form = ({ otpData }) => {
  const [userData, setUserData] = useState(initialUserData);
  const [otp, setOtp] = useState('');
  const [generateBtnStatus, setGenerateBtnStatus] = useState(false);
  const [timeRemaining, setRemainingTime] = useState(OTP_EXPIRY_TIME / 1000);
  const [startTimer, setTimerStart] = useState(false);

  useEffect(() => {
    if (startTimer) {
      remainingTimeTimer = setInterval(() => {
        setRemainingTime(timeRemaining - 1);
        setUserData({ ...userData, time: getNowDateTime() });
      }, 1000);
    }

    return () => clearInterval(remainingTimeTimer);
  }, [userData, timeRemaining, startTimer]);

  const handleGenerateOTP = () => {
    setOtp(generateOTP(...otpData));
    if (!userData.userid) {
      setUserData({ ...userData, userid: generateRandomUserId(1000) });
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

    setOtp('');
    setGenerateBtnStatus(false);
    setTimerStart(false);
    console.log(userData)
    setUserData({ ...userData, userid: '', time: getNowDateTime() });
    setRemainingTime(OTP_EXPIRY_TIME / 1000);
  };

  const handleUserDataChange = (event) => {
    const { name, value } = event.target;

    setUserData({
      ...userData,
      [name]: value,
    });
  };

  return (
    <form className="form">
      <div className="userid-container">
        <label htmlFor="id">User id</label>
        <input
          type="number"
          value={userData.userid}
          name="userid"
          required
          onChange={(event) => handleUserDataChange(event)}
        />
      </div>
      <div className="datetime-container">
        <label htmlFor="datetime">Time</label>
        <input
          value={userData.time}
          type="datetime-local"
          name="datetime"
          required
          onChange={(event) => handleUserDataChange(event)}
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
          OTP: {otp} was generated for user id {userData.userid} at{' '}
          {userData.time}
        </p>
      )}
      {userData.userid && (
        <p>Password will expire in: {timeRemaining} seconds!!!</p>
      )}
    </form>
  );
};

export default Form;
