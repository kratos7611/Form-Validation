import {
  Stack,
  Paper,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";

function Form() {
  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [response, setResponse] = useState("");

  const handleChange = (event) => {
    const {
      target: { name, value },
    } = event;
    return setformData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(validate(formData));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formError).length === 0 && isSubmit) {
      setResponse("Succesful");
    }
  }, [formError]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.firstName) {
      errors.firstName = "First name is required";
    }
    if (!values.lastName) {
      errors.lastName = "Last name is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email id";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password cannot be lesst than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Passowrd length cannot exceed 10 characters";
    }
    return errors;
  };

  return (
    <Stack
      alignItems="center"
      sx={{ width: "500px", ml: "auto", mr: "auto", mt: "100px" }}
    >
      {/* <pre>{JSON.stringify(formData, undefined, 2)}</pre> */}
      <Paper
        elevation={20}
        component="form"
        align="center"
        sx={{ height: "auto", width: "500px", p: "10px" }}
        onSubmit={handleSubmit}
      >
        <Box sx={{ p: "10px", mb: "20px" }}>
          <Typography variant="h4" color="#6908a1" fontWeight="bold">
            Form Validation Practice
          </Typography>
        </Box>
        <Grid container justifyContent="space-between" spacing={2}>
          <Grid item>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              variant="outlined"
              onChange={handleChange}
            />
            <Typography
              variant="subtitle2"
              sx={{ color: "error.main", mt: "10px" }}
            >
              {formError.firstName}
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              variant="outlined"
              onChange={handleChange}
            />
            <Typography
              variant="subtitle2"
              sx={{ color: "error.main", mt: "10px" }}
            >
              {formError.lastName}
            </Typography>
          </Grid>
        </Grid>
        <TextField
          label="E-mail"
          type="email"
          sx={{ width: "100%", mt: "20px" }}
          name="email"
          value={formData.email}
          variant="outlined"
          onChange={handleChange}
        />
        <Typography
          variant="subtitle2"
          sx={{ color: "error.main", mt: "10px" }}
        >
          {formError.email}
        </Typography>

        <TextField
          label="Password"
          type="password"
          id="outlined-password-input"
          sx={{ width: "100%", mt: "20px" }}
          name="password"
          value={formData.password}
          variant="outlined"
          onChange={handleChange}
        />
        <Typography
          variant="subtitle2"
          sx={{ color: "error.main", mt: "10px" }}
        >
          {formError.password}
        </Typography>

        <Button
          variant="contained"
          size="large"
          sx={{ mt: "30px" }}
          type="submit"
        >
          Submit
        </Button>
        <Typography
          variant="h6"
          sx={{ mt: "30px", color: "green", fontWeight: "bold" }}
        >
          {response}
        </Typography>
      </Paper>
    </Stack>
  );
}

export default Form;
