import React, { useState, useEffect, useRef } from 'react';
import {
  generateOTP,
  generateRandomUserId,
  getCurentTime,
} from '../utils/index';
import { OTP_EXPIRY_TIME, USER_ID_RANDOM_MAX_VALUE } from '../constants/index';

const initialUserData = {
  userid: '',
  time: getCurentTime(),
};

const Form = ({ otpLength, acceptedChars }) => {
  const [userData, setUserData] = useState(initialUserData);
  const [otp, setOtp] = useState('');
  const [isGenerateBtnEnabled, setGenerateBtnStatus] = useState(true);
  const [timeRemaining, setRemainingTime] = useState(OTP_EXPIRY_TIME / 1000);
  const [isTimerStarted, setTimerStart] = useState(false);
  let otpInterval = useRef(null);
  let remainingTimeInterval = useRef(null);

  useEffect(() => {
    if (isTimerStarted) {
      remainingTimeInterval.current = setInterval(() => {
        setRemainingTime(timeRemaining - 1);
        setUserData({ ...userData, time: getCurentTime() });
      }, 1000);
    }

    return () => clearInterval(remainingTimeInterval.current);
  }, [userData, timeRemaining, isTimerStarted]);

  const handleGenerateOTP = () => {
    setOtp(generateOTP(otpLength, acceptedChars));
    if (!userData.userid) {
      setUserData({
        ...userData,
        userid: generateRandomUserId(USER_ID_RANDOM_MAX_VALUE),
      });
    }
    setTimerStart(true);
    otpInterval.current = setInterval(() => {
      setOtp(generateOTP(otpLength, acceptedChars));
      setRemainingTime(OTP_EXPIRY_TIME / 1000);
    }, OTP_EXPIRY_TIME);
    setGenerateBtnStatus(false);
  };

  const handleResetOTPGeneration = () => {
    clearInterval(otpInterval.current);
    clearInterval(remainingTimeInterval.current);

    setOtp('');
    setGenerateBtnStatus(true);
    setTimerStart(false);
    setUserData({ ...userData, userid: '', time: getCurentTime() });
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
        disabled={!isGenerateBtnEnabled}
      >
        Generate OTP
      </button>
      <button
        type="button"
        className="button"
        onClick={() => handleResetOTPGeneration()}
        disabled={isGenerateBtnEnabled}
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
