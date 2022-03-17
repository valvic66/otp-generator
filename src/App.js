import './App.css';
import Form from './components/Form';
import {getNowDateTime} from './utils/index';

console.log(getNowDateTime());
const otpData = [6, '12345abcde'];

function App() {
  return (
    <div className="App">
      <Form otpData={otpData} />
    </div>
  );
}

export default App;
