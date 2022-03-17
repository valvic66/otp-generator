import './App.css';
import Form from './components/Form';

const otpData = [
  6,
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
];

function App() {
  return (
    <div className="App">
      <Form otpData={otpData} />
    </div>
  );
}

export default App;
