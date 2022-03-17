let delAtIdx = (s, i) => s.slice(0, i) + s.slice(i + 1)

// generate otp with no duplicate chars from accepted chars
export const generateOTPNoDuplicateChars = (len, acceptedChars) => {
  let acceptedCharsLen;
  let otp = '';
  
  for(let i = 0; i < len; i++) {
    acceptedCharsLen = acceptedChars.length;
    const randomIndex = Math.floor(Math.random() * acceptedCharsLen);
    otp += acceptedChars[randomIndex];
    acceptedChars = delAtIdx(acceptedChars, randomIndex);
  }

  return otp;
}

// generate otp with duplicate chars from accepted chars
export const generateOTP = (len, acceptedChars) => {
  let acceptedCharsLen;
  let otp = '';
  
  for(let i = 0; i < len; i++) {
    acceptedCharsLen = acceptedChars.length;
    const randomIndex = Math.floor(Math.random() * acceptedCharsLen);
    otp += acceptedChars[randomIndex];
  }

  return otp;
}

export const generateRandomUserId = maxIdLimit => {
  return Math.floor(Math.random() * maxIdLimit);
}

export const getNowDateTime = () => {
  const now = new Date();
  const month = (now.getMonth() + 1).toString();
  const minutes = (now.getMinutes()).toString();
  const formatedMonth = month.length < 2 ? month.padStart(2, '0') : month;
  const formatedMinutes = minutes.length < 2 ? minutes.padStart(2, '0') : minutes;

  const date = `${now.getFullYear()}-${formatedMonth}-${now.getDate()}`;
  const time = `${now.getHours()}:${formatedMinutes}`;

  return `${date}T${time}`;
}