import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { useDispatch } from "react-redux";
import { todoAction } from "../../store/feat";
import { useNavigate } from "react-router";
const CardView = ({ id, Image, title, description, priority, state }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deleteTodo = (title) => {
    dispatch(todoAction.deleteTodo(title));
  };
  const editTodo = (id) => {
    navigate(`/edittodo/${id}`);
  };
  const changeHandler = (event) => {
    let payload = {
      id: id,
      state: event.target.value,
    };
    dispatch(todoAction.updateState(payload));
  };
  return (
    <Col>
      <Card className="mx-0">
        <img src={Image} alt="imageCard" height={200} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text> {description}</Card.Text>
          <p>Priorty: {priority} </p>
          <p>state: {state} </p>
          <button
            className="btn btn-danger py-2"
            onClick={() => deleteTodo(title)}
          >
            Delete
          </button>
          <button
            className="btn btn-warning mx-2 py-2"
            onClick={() => editTodo(id)}
          >
            edit
          </button>
          <select onChange={changeHandler} class="form-select my-2">
            <option value="todo">todo</option>
            <option value="doing">doing</option>
            <option value="done">done</option>
          </select>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CardView;
