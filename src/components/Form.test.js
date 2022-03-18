import { getByText, render, screen, fireEvent } from '@testing-library/react';
import { generateOTP } from '../utils';
import Form from './Form';

const formProps = {
  otpLength: 6,
  acceptedChars: '0aA',
};

describe('Form component', () => {
  test('renders user id and time labels if proper props are provided', () => {
    render(<Form {...formProps} />);
    const userIdLabel = screen.getByText(/user id/i);
    const timeDateLabel = screen.getByText(/time/i);

    expect(userIdLabel).toBeInTheDocument();
    expect(timeDateLabel).toBeInTheDocument();
  });

  test('renders buttons if proper props are provided', () => {
    render(<Form {...formProps} />);
    const generateOTPBtn = screen.getByText(/Generate OTP/i);
    const resetOTPBtn = screen.getByText(/Reset OTP/i);

    expect(generateOTPBtn).toBeInTheDocument();
    expect(generateOTPBtn).toBeEnabled();
    expect(resetOTPBtn).toBeInTheDocument();
    expect(resetOTPBtn).toBeDisabled();
  });

  test('otp generate button becomes disabled and the reset otp button enabled if otp generate button is clicked', () => {
    render(<Form {...formProps} />);
    const generateOtpBtn = screen.getByText(/Generate OTP/i);
    const resetOTPBtn = screen.getByText(/Reset OTP/i);
    fireEvent.click(generateOtpBtn);

    expect(generateOtpBtn).toBeDisabled();
    expect(resetOTPBtn).toBeEnabled();
  });
});
