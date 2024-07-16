import "./App.css";
import { PostProvider } from "./Contexts/MainContext";
import Todos from "./components/Todos";

const App = () => {
  return (
    <PostProvider>
      <Todos />
    </PostProvider>
  );
};

export default App;
