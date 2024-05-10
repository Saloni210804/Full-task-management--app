import React, { useEffect, useState } from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import axios from "axios"; // Import axios for making HTTP requests
import toast from "react-hot-toast"; // Import toast for displaying notifications

const UpdateTaskModal = ({ showUpdateModal, handleUpdateModalClose, id, setTasks }) => {
  // State variables for task data
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("incomplete");
  const [archived, setArchived] = useState(false);
  const [priority, setPriority] = useState(""); // Add priority state
  const [dueDate, setDueDate] = useState("");

  // Effect to fetch the task data when the modal is opened
  useEffect(() => {
    const getSingleTask = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/task/single/${id}`, { withCredentials: true });
        const { title, description, status, archived, priority, dueDate } = response.data.task;
        setTitle(title);
        setDescription(description);
        setStatus(status);
        setArchived(archived);
        setPriority(priority || ""); // Set priority from API response
        setDueDate(dueDate);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };
    if (id) {
      getSingleTask();
    }
  }, [id]);

  // Function to handle updating the task
  const handleUpdateTask = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/v1/task/update/${id}`,
        { title, description, status, archived, priority, dueDate },
        { withCredentials: true }
      );

      // Update tasks in the state with the updated task data
      setTasks(prevTasks => prevTasks.map(task => task._id === id ? { ...task, title, description, status, archived, priority, dueDate } : task));

      // Display success message
      toast.success(response.data.message);

      // Close the modal
      handleUpdateModalClose();
    } catch (error) {
      // Display error message if update fails
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Modal show={showUpdateModal} onHide={handleUpdateModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack gap={2}>
            <label>Title</label>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Stack>
          <br />
          <Stack gap={2}>
            <label>Description</label>
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Stack>
          <br />
          <Stack gap={2}>
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="completed">COMPLETED</option>
              <option value="incomplete">INCOMPLETE</option>
            </select>
          </Stack>
          <br />
          <Stack gap={2}>
            <label>Archived</label>
            <select
              value={archived}
              onChange={(e) => setArchived(e.target.value)}
            >
              <option value={true}>YES</option>
              <option value={false}>NO</option>
            </select>
          </Stack>
          <br />
          <Stack gap={2}>
            <label>Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="">Select Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </Stack>
          <br />
          <Stack gap={2}>
            <label>Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </Stack>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleUpdateModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateTask}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateTaskModal;
