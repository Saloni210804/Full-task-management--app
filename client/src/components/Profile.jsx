import React, { useState } from "react"; // Importing React and useState hook
import { Container, Stack, Button, Form, Card } from "react-bootstrap"; // Importing components from react-bootstrap
import { Navigate } from "react-router-dom"; // Importing Navigate component from react-router-dom

const Profile = ({ user, isAuthenticated }) => {
  // Functional component for user profile

  // State variable for new image
  const [newImage, setNewImage] = useState(null);

  // Function to handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
  };

  // Function to handle form submission
  const handleSubmit = () => {
    // Here you can handle the submission of the new image
    console.log("New image submitted:", newImage);
  };

  // Redirect to login page if user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <Container className="my-4">
      {/* Container for profile */}
      <h1 className="mb-5" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        Your Profile
      </h1>
      {/* Card for user profile */}
      <Card style={{ maxWidth: "500px", margin: "0 auto" }}>
        <Card.Body>
          {/* Stack for profile details */}
          <Stack gap={0.2} className="text-start">
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              {/* User avatar */}
              <img
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: "7px",
                }}
                src={user.avatar && user.avatar.url}
                alt="avatar"
                onClick={() => document.getElementById("fileInput").click()}
              />
              {/* Form for uploading image */}
              <Form>
                <Form.Group controlId="formFile" className="mb-3" style={{ display: "none" }}>
                  <Form.Control type="file" onChange={handleImageChange} id="fileInput" />
                </Form.Group>
                {/* Button to trigger file input */}
                <Button variant="primary" onClick={handleSubmit} style={{ display: "none" }} id="submitButton">
                  Save Changes
                </Button>
              </Form>
            </div>
            <hr />
            {/* Display user name */}
            <Stack direction="horizontal" gap={3} alignItems="center">
              <p className="fw-bold">NAME:</p>
              <p>{user.name}</p>
            </Stack>
            <hr />
            {/* Display user email */}
            <Stack direction="horizontal" gap={3} alignItems="center">
              <p className="fw-bold">EMAIL:</p>
              <p>{user.email}</p>
            </Stack>
            <hr />
            {/* Display user phone */}
            <Stack direction="horizontal" gap={3} alignItems="center">
              <p className="fw-bold">PHONE:</p>
              <p>{user.phone}</p>
            </Stack>
            <hr />
            {/* Button to change profile picture */}
            <Button variant="primary" onClick={() => document.getElementById("fileInput").click()}>
              Change Profile Picture
            </Button>
          </Stack>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;
