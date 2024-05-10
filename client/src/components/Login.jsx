import { useState } from "react"; // Importing useState hook from React
import { Container, Form, Button, Card } from "react-bootstrap"; // Importing Container, Form, Button, and Card components from react-bootstrap
import toast from "react-hot-toast"; // Importing toast notification library
import axios from "axios"; // Importing axios for making HTTP requests
import { Link, Navigate } from "react-router-dom"; // Importing Link and Navigate components from react-router-dom
import logo from "../logo/logo.png"; // Importing logo image

function Login({ isAuthenticated, setIsAuthenticated }) {
  // Functional component for the login page

  // State variables for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault(); // Preventing default form submission behavior
    try {
      // Sending a POST request to login endpoint
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password }, // Request body with email and password
        {
          withCredentials: true, // Sending credentials with the request
          headers: { "Content-Type": "application/json" }, // Setting request headers
        }
      );
      // Resetting email and password fields
      setEmail("");
      setPassword("");
      // Setting isAuthenticated state to true
      setIsAuthenticated(true);
      // Showing success message using toast notification
      toast.success(response.data.message);
    } catch (error) {
      // Handling error response
      // Logging error to the console
      console.log(error);
      // Showing error message using toast notification
      toast.error(error.response.data.message);
    }
  };

  // Redirecting to home page if already authenticated
  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <Container className="d-flex justify-content-center align-items-center overflow-y-hidden" style={{ minHeight: "700px" }}>
      {/* Container for login form */}
      <div className="position-absolute top-0 start-50 translate-middle-x">
        {/* Logo image */}
        <img src={logo} alt="Logo" style={{ width: "170px", height: "70px", marginTop: "70px" }} />
      </div>
      {/* Card for login form */}
      <Card className="p-4 shadow-lg rounded-3" style={{ zIndex: 1 }}>
        <Form onSubmit={handleLogin}> {/* Login form */}
          <h3 className="text-center mb-4">LOGIN</h3> {/* Login title */}
          <Form.Group className="mb-3" controlId="formBasicEmail"> {/* Email form group */}
            <Form.Label>Email address</Form.Label> {/* Email label */}
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Handling email input change
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else. {/* Email helper text */}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword"> {/* Password form group */}
            <Form.Label>Password</Form.Label> {/* Password label */}
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Handling password input change
            />
          </Form.Group>
          <Form.Group className="text-center mb-3"> {/* Registration link */}
            <Form.Label>
              Not Registered?{" "}
              <Link to={"/register"} className="text-decoration-none ">
                REGISTER NOW
              </Link>
            </Form.Label>
          </Form.Group>
          {/* Submit button */}
          <Button variant="success" type="submit" className="w-100 text-light fw-bold fs-5">
            Submit
          </Button>
        </Form>
      </Card>
    </Container>
  );
}

export default Login;
