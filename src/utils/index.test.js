import { generateRandomUserId, generateOTP } from './index';

describe('Helper methods', () => {
  test('generateRandomUserId method returns an id between 0 and maxIdLimit', () => {
    const MAX_ID_LIMIT = 1000;
    const randomId = generateRandomUserId(MAX_ID_LIMIT);
    const isBetweenLimits = randomId > 0 && randomId < MAX_ID_LIMIT;

    expect(isBetweenLimits).toBeTruthy();
  });

  test('generateOTP method returns an otp password of the correct length and required chars', () => {
    const OTP_LENGTH = 6;
    const ACCEPTED_CHARS = '0aA';
    const otp = generateOTP(OTP_LENGTH, ACCEPTED_CHARS);

    expect(otp).toMatch(/(0|a|A)/i);
    expect(otp).not.toMatch(/(1|b|B)/i);
  });
});
