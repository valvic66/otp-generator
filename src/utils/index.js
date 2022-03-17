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