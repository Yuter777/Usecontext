import { useContext, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import TodoList from "./TodoList";
import Loader from "./Loader";
import Error from "./Error";
import AddTodo from "./AddTodo";
export const TodosContext = useContext;

function Todos({ children }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [todos, setTodos] = useState([]);

  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [filteredTodos, setFilteredTodos] = useState([]);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/students");
      const data = await res.data;
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createTodo = async (todo) => {
    setLoading(true);
    try {
      await axios.post("http://localhost:3000/students", todo);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:3000/students/${id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const searchTodos = (e) => {
    const text = e.target.value;
    const newTodos = todos.filter(
      (todo) =>
        todo.firstName.toLowerCase().includes(text.toLowerCase()) ||
        todo.lastName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredTodos(newTodos);
  };

  const updateTodo = async (todo) => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:3000x/students/${todo.id}`, todo);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);

  return (
    <div>
      <h1 className="text-center">Students {todos.length}</h1>
      <div className="d-flex justify-content-between align-content-center pb-5 container">
        <input
          type="text"
          className="form-control"
          placeholder="Ism va Familiya orqali qidiring!!!"
          onChange={searchTodos}
          style={{ width: "360px" }}
        />

        <button
          onClick={() => setAddModal(true)}
          className="btn btn-dark d-flex gap-2 align-items-center"
        >
          <FaPlus />
          <span>Add</span>
        </button>
      </div>

      {addModal && (
        <AddTodo
          addModal={addModal}
          handleClose={() => setAddModal(false)}
          createTodo={createTodo}
          todos={todos}
        />
      )}

      {error && <Error error={error} />}

      {loading && <Loader />}

      {filteredTodos.length > 0 && (
        <TodoList
          todos={filteredTodos}
          setAddModal={setAddModal}
          editModal={editModal}
          setEditModal={setEditModal}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      )}
    </div>
  );
}

export default Todos;
