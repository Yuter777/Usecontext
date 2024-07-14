import "./App.css";
import TodoList from "./components/TodoList";
// import { StudentsProvider } from "./FirstContext";
import Todos from "./components/Todos";

const App = () => {
  return (
    <>
      {/* <StudentsProvider>
        <div>
          <Navbar />
        </div>
      </StudentsProvider> */}
      <Todos>
        <TodoList />
      </Todos>
    </>
  );
};

export default App;
