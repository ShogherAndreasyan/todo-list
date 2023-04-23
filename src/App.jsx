import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Todo from './components/todo/ToDo';
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return(
    <main>
      <Todo/>
    </main>
  )
}

export default App;
