import React, { useState,useEffect } from "react";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "./MButton";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {v4 as uuid} from "uuid";

const ToDoList = () => {
  const [show,setShow] = useState(false);
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState(null);
  const [edit, setEdit] = useState(null);
  const [target, setTarget] = useState(null);
  const columns = [
    { id: 1, item: "No" },
    { id: 2, item: "<ToDo/> Item" },
    { id: 3, item: "Action" },
  ];
  useEffect(()=>{
    const mytodos = JSON.parse(localStorage.getItem("mytodos"));
    if (mytodos) setTodos(mytodos);
    console.log('here are ',mytodos);
  },[])
  useEffect(()=>{
    console.log("change detected");
    console.log("todo change",todos);
    if(todos?.length){

      localStorage.setItem("mytodos",JSON.stringify(todos));
    }
    
  },[todos])
  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const handleEditClick = (e) => {
    setShow(true);
    const targetId = e.currentTarget.value;
    setTarget(targetId);
    let value = null;
    todos.map((todo)=>{
      if (todo["todo_id"]===targetId){
         value = todo["todo_item"];
      }
    })
    setEdit(value);
  }
  const handleUpdate = (e)=>{
    if (edit===null || edit===""){
      alert("Kindly Enter What To Do?");
      return;
    }
    let i=0;
    let store = -1;
    todos.map((todo)=>{
      
      if (todo["todo_id"]===target){
        store = i;
        console.log(i);
      }
      i++;
    })
    var array = [...todos];
    array[store]["todo_item"] = edit;
    setTodos(array);
    setShow(false);
  }
  const handleDeleteClick = (e) => {
    const targetId = e.currentTarget.value;
    console.log(targetId);
    let i=0;
    let store = -1;
    todos.map((todo)=>{
      if (todo["todo_id"]===targetId){
        store = i;
        console.log(i);
      }
      i++;
    })
    var array = [...todos];
    array.splice(store, 1);
    setTodos(array);
    
}
  const handleClick = (e) => {
    if (todo===null || todo.length===0){
      alert("Kindly Enter What To Do?");
      return;
    }
    const todo_obj = {todo_id: uuid().slice(0,8), todo_item: todo };
    console.log("todo obj is ", todo_obj);
    console.log("obj is ", [...todos, todo_obj]);
    setTodos([...todos, todo_obj]);
  };

  let objKeys = ["todo_item"];
  let count = 1;
  return (
    <>
      <AppBar position="static">
        <Typography
          variant="h4"
          component="div"
          align="center"
          style={{ backgroundColor: "#006E7F" }}
        >
          &lt; San To Do App /&gt;
        </Typography>
      </AppBar>
      <Container>
        {
          (show===true) ? (
          <Box mt={5}>
          <Paper
            variant="outlined"
            elevation={0}
            padding={60}
            style={{ backgroundColor: "#FEFBE7" }}
          >
            <Box p={5}>
              <Grid container spacing={3} justify="center">
                <Grid item xs={8}>
                  <TextField
                    variant="outlined"
                    label="Edit Plz ? "
                    value={edit}
                    name="edit"
                    InputLabelProps={{shrink: true}}
                    fullWidth
                    onChange={(e)=>{
                      setEdit(e.currentTarget.value);
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Box m={1}>
                    <Button buttonName="Update" onClick={handleUpdate} />
                  </Box>
                </Grid>
              </Grid>
            </Box>
        </Paper>
        </Box>): null
        }
      
        <Box mt={10}>
          <Paper
            variant="outlined"
            elevation={0}
            padding={60}
            style={{ backgroundColor: "#FEFBE7" }}
          >
            <Box p={5}>
              <Grid container spacing={3} justify="center">
                <Grid item xs={8}>
                  <TextField
                    variant="outlined"
                    label="Write What to Do ? "
                    value={todo}
                    name="todo"
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Box m={1}>
                    <Button buttonName="Add" onClick={handleClick} />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Box>
        <Box mt={5}>
          <Paper
            variant="outlined"
            elevation={0}
            padding={60}
            style={{ backgroundColor: "#FEFBE7" }}
          >
            <Box p={5}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" style={{backgroundColor: "#B2B1B9"}}>
                  <TableHead>
                    <TableRow>
                      {columns.map((col) => {
                        let { item } = col;
                        return (
                          <TableCell style={{fontSize: "20px", fontWeight: "bold" }}>
                            {item}{" "}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {todos.map((row) => (
                      <TableRow
                        key={count}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>{count++}</TableCell>
                        {objKeys.map((t) => {
                          console.log("row of t ", row[t]);
                          return (
                            <TableCell style={{ fontSize: "17px", fontWeight: "bold" }}>
                              {row[t]}
                            </TableCell>
                          );
                        })}
                        <TableCell>
                          <Grid container spacing={1}>
                            <Grid item>
                              <Button
                                value={row["todo_id"]}
                                onClick={handleEditClick}
                                buttonName="Edit"
                                fullWidth={false}
                              />
                            </Grid>
                            <Grid item>
                              <Button
                                value={row["todo_id"]}
                                onClick={handleDeleteClick}
                                buttonName="Delete"
                                fullWidth={false}
                              />
                            </Grid>
                          </Grid>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default ToDoList;
