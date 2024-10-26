import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./ViewTodo.module.css";
import Row from "react-bootstrap/Row";
import CardView from "../../Components/CardView/CardView";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router";
const ViewTodo = () => {
  const navigate = useNavigate();
  const todos = useSelector((state) => state.todo.todos);
  const [filterTodo, setFilterTodo] = useState(todos);
  const [state, setState] = useState();
  const [priorty, setPriorty] = useState();
  useEffect(() => {
    setFilterTodo(todos);
  }, [todos]);
  console.log(todos);
  const searchText = (event) => {
    setState("all");
    if (event.target.value === "") {
      setFilterTodo(todos);
      return;
    }
    const filter = todos.filter((task) => task.title === event.target.value);
    setFilterTodo(filter);
  };
  const onSelectState = (event) => {
    setState(event.target.value);
    if (event.target.value === "all") {
      setFilterTodo(todos);
      return;
    }
    const filter = todos.filter((task) => task.state === event.target.value);
    setFilterTodo(filter);
  };
  const onSelectPriorty = (event) => {
    setPriorty(event.target.value);
    if (event.target.value === "all") {
      setFilterTodo(todos);
      return;
    }
    const filter = todos.filter((task) => task.priority === event.target.value);
    setFilterTodo(filter);
  };
  if (todos.length < 1) {
    return (
      <div className="center">
        <button
          className="btn btn-primary btn-lg"
          onClick={() => navigate("/addtodo")}
        >
          Add Todo
        </button>
      </div>
    );
  }
  return (
    <Container>
      <div className={classes.filter}>
        <select onChange={onSelectState} class="form-select mx-1" value={state}>
          <option value="all">all</option>
          <option value="todo">todo</option>
          <option value="doing">doing</option>
          <option value="done">done</option>
        </select>
        <select
          onChange={onSelectPriorty}
          class="form-select mx-1"
          value={priorty}
        >
          <option value="all">all</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          type="text"
          onChange={searchText}
          class="form-control mx-1"
          placeholder="Search By Name"
        />
        <button
          onClick={() => {
            navigate("/addtodo");
          }}
          className="btn btn-primary mx-1"
        >
          Add Todo
        </button>
      </div>
      <Row xs={1} md={3} className="g-4 gx-4">
        {filterTodo.map((todo) => (
          <CardView
            id={todo.id}
            Image={todo.Image}
            title={todo.title}
            description={todo.description}
            priority={todo.priority}
            state={todo.state}
          />
        ))}
      </Row>
    </Container>
  );
};

export default ViewTodo;
