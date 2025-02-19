import { useState, useEffect } from "react"; // Importing useState and useEffect hooks from React
import { Button, Container, Nav, Navbar, NavDropdown, Form } from "react-bootstrap"; // Importing components from react-bootstrap
import toast from "react-hot-toast"; // Importing toast notification library
import axios from "axios"; // Importing axios for making HTTP requests
import { Link } from "react-router-dom"; // Importing Link component from react-router-dom
import logo from "../logo/logo.png"; // Importing logo image

function Header({ setTasks, setIsAuthenticated, isAuthenticated, setTaskTitle }) {
  // Functional component for the header

  // State variables for tasks, filter criteria, and search term
  const [allTasks, setAllTasks] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({
    completed: false,
    incomplete: false,
    archived: false,
    highPriority: false,
    mediumPriority: false,
    lowPriority: false,
    allTasks: false,
  });
  const [searchTerm, setSearchTerm] = useState("");

  // useEffect hook to fetch tasks when isAuthenticated state changes
  useEffect(() => {
    fetchTasks();
  }, [isAuthenticated]);

  // Function to fetch tasks
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/task/mytask", { withCredentials: true }); // Sending GET request to fetch tasks
      setAllTasks(response.data.tasks); // Setting tasks state
      setTasks(response.data.tasks); // Setting tasks in parent component
    } catch (error) {
      console.error("Error fetching tasks:", error); // Logging error if fetching tasks fails
    }
  };

  // Function to handle logout
  const handleLogout = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/v1/user/logout", { withCredentials: true }); // Sending GET request to logout endpoint
      toast.success(data.message); // Showing success message using toast notification
      setIsAuthenticated(false); // Setting isAuthenticated state to false
    } catch (error) {
      toast.error(error.response.data.message); // Showing error message using toast notification if logout fails
    }
  };

  // Function to filter tasks based on filter criteria
  const filterTasks = () => {
    let filteredTasks = allTasks.filter(task => {
      if (filterCriteria.allTasks) return true; // Return true if allTasks filter is checked
      let satisfiesCriteria = true; // Flag to check if task satisfies filter criteria
      if (filterCriteria.completed && task.status !== "completed") satisfiesCriteria = false; // Check if task is completed
      if (filterCriteria.incomplete && task.status !== "incomplete") satisfiesCriteria = false; // Check if task is incomplete
      if (filterCriteria.archived && !task.archived) satisfiesCriteria = false; // Check if task is archived
      if (filterCriteria.highPriority && task.priority !== "high") satisfiesCriteria = false; // Check if task is high priority
      if (filterCriteria.mediumPriority && task.priority !== "medium") satisfiesCriteria = false; // Check if task is medium priority
      if (filterCriteria.lowPriority && task.priority !== "low") satisfiesCriteria = false; // Check if task is low priority
      return satisfiesCriteria; // Return true if task satisfies all filter criteria
    });
    setTasks(filteredTasks); // Setting filtered tasks in parent component
    setTaskTitle("Filtered Tasks"); // Setting task title
  };

  // Function to handle checkbox change event
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilterCriteria(prevState => ({ ...prevState, [name]: checked })); // Updating filter criteria state
  };

  // Function to handle search
  const handleSearch = () => {
    const filteredTasks = allTasks.filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase())); // Filtering tasks based on search term
    setTasks(filteredTasks); // Setting filtered tasks in parent component
    setTaskTitle("Filtered Tasks"); // Setting task title
  };
  return (
    <Navbar expand="lg" className={`bg-body-tertiary ${!isAuthenticated ? "d-none" : ""}`}>
      <Container>
        <Navbar.Brand href="/">
          <img
            src={logo}
            alt="Logo"
            style={{ width: "100px", height: "40px", marginRight: "10px" }}
          />
          TASK MANAGER
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center"> {/* Center the content */}
          <Nav className="me-auto">
            <Button as={Link} to={"/"} className="nav-link me-2" variant="primary" style={{ width: "100px", height: "40px", marginRight: "100px" }}>
              Home
            </Button>
            <Button as={Link} to={"/profile"} className="nav-link me-2" variant="primary" style={{ width: "100px", height: "40px", marginRight: "100px"}}>
              Profile  
            </Button>
            <NavDropdown title="Filter Tasks" id="basic-nav-dropdown" variant="primary" className="mb-2">
            <div className="p-2">
              <Form.Check 
                type="checkbox" 
                label="Completed" 
                name="completed" 
                checked={filterCriteria.completed} 
                onChange={handleCheckboxChange}
                className="mb-2"
              />
              <Form.Check 
                type="checkbox" 
                label="Incomplete" 
                name="incomplete" 
                checked={filterCriteria.incomplete} 
                onChange={handleCheckboxChange}
                className="mb-2"
              />
              <Form.Check 
                type="checkbox" 
                label="Archived" 
                name="archived" 
                checked={filterCriteria.archived} 
                onChange={handleCheckboxChange}
                className="mb-2"
              />
              <Form.Check 
                type="checkbox" 
                label="High Priority" 
                name="highPriority" 
                checked={filterCriteria.highPriority} 
                onChange={handleCheckboxChange}
                className="mb-2"
              />
              <Form.Check 
                type="checkbox" 
                label="Medium Priority" 
                name="mediumPriority" 
                checked={filterCriteria.mediumPriority} 
                onChange={handleCheckboxChange}
                className="mb-2"
              />
              <Form.Check 
                type="checkbox" 
                label="Low Priority" 
                name="lowPriority" 
                checked={filterCriteria.lowPriority} 
                onChange={handleCheckboxChange}
                className="mb-2"
              />
              <Form.Check 
                type="checkbox" 
                label="All Tasks" 
                name="allTasks" 
                checked={filterCriteria.allTasks} 
                onChange={handleCheckboxChange}
                className="mb-3"
              />
              <Button variant="primary" className="me-2" onClick={filterTasks}>Apply Filters</Button>
              </div>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="text"
              placeholder="Search tasks by title"
              className="me-lg-2 mb-3 mb-lg-0 "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-primary" onClick={handleSearch}style={{  height: "38px"}}>Search</Button>
          </Form>
          <Button className="bg-danger border-0 ms-2 " onClick={handleLogout}> {/* Adjust margin */}
           Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
