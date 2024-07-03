import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import { deleteEmployee, fetchEmployee } from "../redux/action";
import { useNavigate } from "react-router-dom";

const EmployeeList = () => {
  const employees = useSelector((state) => state.employee.employeelist);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchEmployee());
  }, [dispatch]);

  //delete employee details
  const handleDelete = (id) => {
    dispatch(deleteEmployee(id));
  };
  //edit employee details
  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          textTransform: "capitalize",
          textAlign: "center",
          marginBlock: "10px",
        }}
      >
        All Employees Details
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Salary</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Age</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Image</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees?.length === 0 ? (
              <TableRow>
                <TableCell>No employee data is available</TableCell>
              </TableRow>
            ) : (
              employees?.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.employee_name}</TableCell>
                  <TableCell>{employee.employee_salary}</TableCell>
                  <TableCell>{employee.employee_age}</TableCell>
                  <TableCell style={{ width: "5%" }}>
                    <img src={employee.profile_image} />
                  </TableCell>
                  <TableCell style={{ display: "flex", gap: "10px" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEdit(employee.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(employee.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default EmployeeList;
