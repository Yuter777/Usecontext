import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const AddTodo = ({ addModal, handleClose, createTodo, todos }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [group, setGroup] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    createTodo({
      id: String(todos.length + 1),
      firstName,
      lastName,
      group,
    });
    handleClose();
    location.reload();
  };

  return (
    <Modal show={addModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create a new todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="Firstname"
              className="form-control mb-2"
              value={firstName}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              id="lastName"
              placeholder="Lastname"
              className="form-control mb-2"
              value={lastName}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              id="group"
              placeholder="Group"
              className="form-control mb-2"
              value={group}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="dark" onClick={handleSubmit} type="submit">
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddTodo;
