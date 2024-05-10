import axios from "axios"; // Importing axios for making HTTP requests
import React, { useState } from "react"; // Importing React and useState hook
import { Button, Card, Container, Stack } from "react-bootstrap"; // Importing Button, Card, Container, and Stack components from react-bootstrap
import toast from "react-hot-toast"; // Importing toast notification library
import CreateTaskModal from "./CreateTaskModal"; // Importing CreateTaskModal component
import UpdateTaskModal from "./UpdateTaskModal"; // Importing UpdateTaskModal component
import ViewTaskModal from "./ViewTaskModal"; // Importing ViewTaskModal component
import { FaEye } from "react-icons/fa"; // Importing FaEye icon from react-icons/fa
import { MdEdit, MdDelete } from "react-icons/md"; // Importing MdEdit and MdDelete icons from react-icons/md
import { Navigate } from "react-router-dom"; // Importing Navigate component from react-router-dom

const Home = ({ isAuthenticated, tasks, setTasks, taskTitle }) => {
  // Functional component for the home page displaying tasks

  // State variables for modal visibility and task ids
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewTaskId, setViewTaskId] = useState(null);
  const [updatedTaskId, setUpdateTaskId] = useState(null);

  // Function to delete a task
  const deleteTask = async (id) => {
    try {
      // Sending a DELETE request to delete a task by id
      const response = await axios.delete(`http://localhost:4000/api/v1/task/delete/${id}`, { withCredentials: true });
      // Showing success message using toast notification
      toast.success(response.data.message);
      // Updating tasks state by filtering out the deleted task
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      // Handling error response
      // Showing error message using toast notification
      toast.error(error.response.data.message);
    }
  };

  // Functions to handle modal visibility
  const handleCreateModalClose = () => setShowCreateModal(false);
  const handleUpdateModalClose = () => setShowUpdateModal(false);
  const handleViewModalClose = () => setShowViewModal(false);

  const handleCreateModalShow = () => setShowCreateModal(true); // Function to show create task modal

  const handleUpdateModalShow = (id) => {
    // Function to show update task modal with the specified id
    setUpdateTaskId(id);
    setShowUpdateModal(true);
  };

  const handleViewModalShow = (id) => {
    // Function to show view task modal with the specified id
    setViewTaskId(id);
    setShowViewModal(true);
  };

  if (!isAuthenticated) {
    // Redirecting to login page if not authenticated
    return <Navigate to={"/login"} />;
  }

  // Function to determine card border color based on task status
  const getCardBorderColor = (task) => {
    return task.status === "completed" ? "border-success" : "border-danger";
  };

  // Function to get priority emoji and color
  const getPriorityEmojiAndColor = (priority) => {
    switch (priority) {
      case "high":
        return { color: "text-danger", emoji: "⚠️" }; // High priority emoji and color
      case "medium":
        return { color: "text-warning" }; // Medium priority color
      case "low":
        return { color: "text-primary" }; // Low priority color
      default:
        return { emoji: "", color: "" }; // Default emoji and color
    }
  };

  return (
    <Container className="my-4"> {/* Container for the home page content */}
      <div className="row mb-3">
        {/* Row for task title and create task button */}
        <div className="col">
          <h1>{taskTitle}</h1> {/* Task title */}
        </div>
        <div className="col text-end">
          <Button variant="success" onClick={handleCreateModalShow}>Create Task</Button> {/* Create task button */}
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
        {/* Row for displaying tasks in cards */}
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task._id} className="col">
              {/* Card for displaying task details */}
              <Card className={`mb-3 ${getCardBorderColor(task)}`} style={{ height: "100%" }}>
                <Card.Body className="d-flex flex-column justify-content-between">
                  {/* Stack for organizing task details */}
                  <Stack gap={2}>
                    {/* Task title */}
                    <Card.Title className="mb-2" style={{ height: "50px" }}>
                      {task.title && task.title.length <= 40
                        ? task.title
                        : task.title.slice(0, 40) + "..."} {/* Truncating task title if too long */}
                    </Card.Title>
                    {/* Task description */}
                    <Card.Text>
                      {task.description && task.description.length <= 300
                        ? task.description
                        : task.description.slice(0, 300) + "..."} {/* Truncating task description if too long */}
                    </Card.Text>
                    {/* Task due date */}
                    <Card.Text>
                      <strong>Due Date:</strong>{" "}
                      {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"} {/* Formatting due date */}
                    </Card.Text>
                    {/* Task priority */}
                    <Card.Text>
                      <strong>Priority:</strong>{" "}
                      <span className={getPriorityEmojiAndColor(task.priority).color}>
                        {getPriorityEmojiAndColor(task.priority).emoji} {task.priority || "N/A"} {/* Displaying priority emoji and text */}
                      </span>
                    </Card.Text>
                    
                  </Stack>
                  {/* Stack for organizing action icons */}
                  <Stack direction="horizontal" className="justify-content-end" gap={2}>
                    {/* Edit task icon */}
                    <MdEdit onClick={() => handleUpdateModalShow(task._id)} className="fs-3" />
                    {/* Delete task icon */}
                    <MdDelete onClick={() => deleteTask(task._id)} className="fs-3" />
                    {/* View task icon */}
                    <FaEye onClick={() => handleViewModalShow(task._id)} className="fs-3" />
                  </Stack>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <h1>YOU DON'T HAVE ANY {taskTitle}</h1> 
        )}
      </div>

      {/* Modal components for creating, updating, and viewing tasks */}
      <CreateTaskModal handleCreateModalClose={handleCreateModalClose} showCreateModal={showCreateModal} setTasks={setTasks} />
      <UpdateTaskModal handleUpdateModalClose={handleUpdateModalClose} showUpdateModal={showUpdateModal} id={updatedTaskId} setTasks={setTasks} />
      <ViewTaskModal handleViewModalClose={handleViewModalClose} showViewModal={showViewModal} id={viewTaskId} />
    </Container>
  );
};

export default Home;
