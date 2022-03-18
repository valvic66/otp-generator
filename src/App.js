import './App.css';
import Form from './components/Form';

  const OTP_LENGTH = 6;
  const ACCEPTED_CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function App() {
  return (
    <div className="App">
      <Form
        otpLength={OTP_LENGTH}
        acceptedChars={ACCEPTED_CHARS}
      />
    </div>
  );
}

export default App;
