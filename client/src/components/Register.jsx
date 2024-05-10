import React, { useState } from "react"; // Import React and useState hook
import axios from "axios"; // Import axios for making HTTP requests
import toast from "react-hot-toast"; // Import toast for displaying notifications
import Button from "react-bootstrap/Button"; // Import Button component from react-bootstrap
import Form from "react-bootstrap/Form"; // Import Form component from react-bootstrap
import { Container, Card } from "react-bootstrap"; // Import Container and Card components from react-bootstrap
import { Link, Navigate } from "react-router-dom"; // Import Link and Navigate components from react-router-dom
import logo from "../logo/logo.png"; // Import logo image

function Register({ isAuthenticated, setIsAuthenticated }) {
  // Functional component for user registration

  // State variables for user registration data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");

  // Function to handle avatar selection
  const avatarHandler = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  // Function to handle registration form submission
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Create FormData object to send form data as multipart/form-data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("avatar", avatar);

    try {
      // Send POST request to register user
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // Reset form fields and set isAuthenticated to true
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setAvatar("");
      setIsAuthenticated(true);

      // Display success message
      toast.success(response.data.message);
    } catch (error) {
      // Display error message if registration fails
      toast.error(error.response.data.message);
    }
  };

  // Redirect to home page if user is already authenticated
  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "800px" }}
    >
      <div className="position-absolute top-0 start-50 translate-middle-x">
        <img src={logo} alt="Logo" style={{ width: "150px", height: "70px", marginTop:"10px" }} />
      </div>
      <Card className="p-4 shadow-lg rounded-3" style={{ zIndex: 1 }}>
        <Form onSubmit={handleRegister}>
          <h3 className="text-center mb-4">REGISTER</h3>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="number"
              placeholder="Your Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicAvatar">
            <Form.Label>Avatar</Form.Label>
            <Form.Control type="file" onChange={avatarHandler} />
          </Form.Group>
          <Form.Group className="text-center">
            <Form.Label>
              Already Registered?{" "}
              <Link to={"/login"} className="text-decoration-none">
                LOGIN
              </Link>
            </Form.Label>
          </Form.Group>
          <Button
            variant="warning"
            type="submit"
            className="w-100 text-light fw-bold fs-5"
          >
            Submit
          </Button>
        </Form>
      </Card>
    </Container>
  );
}

export default Register;
