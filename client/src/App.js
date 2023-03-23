import './App.css';
import io from 'socket.io-client'
import Login from './components/Login'

const socket = io.connect("http://localhost:4000");

function App() {
  /* 
    1. wasnt able to implement a full login and account functionality
    2. wasnt able to implement a call history
  */

  return (
    <div>
      <Login socket={socket}/>
    </div>
  );
}

export default App;
