import './App.css';
import { LiveVideo } from "./svg"
function App() {
  const get = async () => {
    const res = await fetch('http://localhost:8000/books')
    console.log(res)
  }
  get()
  return (
    <div>
      Welcome to frontend
      <LiveVideo color='red' />
    </div>
  );
}

export default App;
