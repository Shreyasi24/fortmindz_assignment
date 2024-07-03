import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  FormControl,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { employeeDetail, updateDetail } from "../redux/action";

const UpdateEmployee = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const employeeDtl = useSelector((state) => state.employee.employeeDetail);

  const [editData, setEditData] = useState("");
  useEffect(() => {
    if (id == employeeDtl.id) {
      setEditData(employeeDtl);
    } else {
      window.alert("too many attempts");
      navigate("/");
    }
  }, [employeeDtl]);

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setEditData({ ...editData, profile_image: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateDetail(editData));
  };

  useEffect(() => {
    dispatch(employeeDetail(id));
  }, []);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Avatar src={editData.profile_image} alt="image" />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, marginLeft: 2 }}
          >
            {editData.employee_name}
          </Typography>
        </Toolbar>
      </AppBar>
      <FormControl style={{ margin: "1%" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              name="employee_name"
              value={editData.employee_name}
              onChange={(e) => handleChange(e)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Salary"
              name="employee_salary"
              value={editData.employee_salary}
              onChange={(e) => handleChange(e)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Age"
              name="employee_age"
              value={editData.employee_age}
              onChange={(e) => handleChange(e)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <input
              accept="image/*"
              id="profile-image-input"
              type="file"
              onChange={handleImageChange}
              label="Image"
              name="profile_image"
              //value={editData.profile_image}
              // onChange={(e) => handleChange(e)}
              fullWidth
            />
            <label htmlFor="profile-image-input">
              <Button variant="contained" component="span">
                Upload Image
              </Button>
            </label>
          </Grid>

          <Grid item xs={12} style={{ display: "flex", gap: "10px" }}>
            <Button variant="contained" onClick={handleSubmit}>
              Update Data
            </Button>
            <Button variant="contained">
              <Link
                to="/"
                variant="contained"
                style={{ color: "white", textDecoration: "none" }}
              >
                Back to Home
              </Link>
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </>
  );
};

export default UpdateEmployee;
