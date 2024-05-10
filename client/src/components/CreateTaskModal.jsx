import axios from "axios"; // Importing axios for making HTTP requests
import React, { useState } from "react"; // Importing React and useState hook
import { Button, Modal, Stack } from "react-bootstrap"; // Importing Button, Modal, and Stack components from react-bootstrap
import toast from "react-hot-toast"; // Importing toast notification library

const CreateTaskModal = ({ showCreateModal, handleCreateModalClose, setTasks }) => {
  // Functional component for creating a new task modal

  // State variables for task details
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(""); 
  const [priority, setPriority] = useState("medium");

  // Function to handle task creation
  const handleCreateTask = async () => {
    // Sending a POST request to create a new task
    await axios
      .post(
        "http://localhost:4000/api/v1/task/post", // API endpoint for creating a task
        { title, description, dueDate, priority }, // Task details
        {
          withCredentials: true, // Including credentials in the request
          headers: { "Content-Type": "application/json" }, // Setting request headers
        }
      )
      .then((res) => {
        // Handling success response
        toast.success(res.data.message); // Showing success message using toast notification
        setTasks((prevTasks) => [...prevTasks, res.data.task]); // Updating tasks state with the new task
        // Resetting state variables
        setTitle("");
        setDescription("");
        setDueDate("");
        setPriority("medium");
        handleCreateModalClose(); // Closing the modal
      })
      .catch((error) => {
        // Handling error response
        toast.error(error.response.data.message); // Showing error message using toast notification
      });
  };

  return (
    <>
      {/* Modal component for creating a task */}
      <Modal show={showCreateModal} onHide={handleCreateModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="section">
            {/* Section for task details */}
            <h5 className="section-title">Task Details</h5>
            {/* Form fields for entering task details */}
            <Stack gap={3}>
              <label>Title</label>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Stack>
            <br />
            <Stack gap={3}>
              <label>Description</label>
              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Stack>
            <br/>
            <Stack gap={3}>
              <label>Due Date</label>
              <input 
                type="date" 
                value={dueDate} 
                onChange={(e) => setDueDate(e.target.value)} 
              />
            </Stack>
            <br/>
            <Stack gap={3}>
              <label>Priority</label>
              <select 
                value={priority} 
                onChange={(e) => setPriority(e.target.value)}
              >
                {/* Dropdown for selecting task priority */}
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </Stack>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* Modal footer with Close and Create buttons */}
          <Button variant="secondary" onClick={handleCreateModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateTask}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateTaskModal;
