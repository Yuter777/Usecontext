import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

const EditTodo = ({ editModal, handleClose, updateTodo, todoEditing }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [group, setGroup] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTodo({
      id: todoEditing.id,
      firstName,
      lastName,
      group,
    });
    handleClose();
    location.reload();
  };

  useEffect(() => {
    setFirstName(todoEditing.firstName);
    setLastName(todoEditing.lastName);
    setGroup(todoEditing.group);
  }, [todoEditing]);

  return (
    <Modal show={editModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit the todo</Modal.Title>
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
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditTodo;
