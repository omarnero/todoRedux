import React, { useEffect, useRef } from "react";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { todoAction } from "../../store/feat";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router";
const shema = yup.object({
  Image: yup.string().url(),
});
const EditTodo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const todos = useSelector((state) =>
    state.todo.todos.filter((item) => item.id === +params.id)
  );

  console.log(params);
  const Form = useForm({
    defaultValues: {
      Image: todos[0]?.Image,
      title: todos[0]?.title,
      description: todos[0]?.description,
      state: todos[0]?.state,
      priority: todos[0]?.priority,
    },
    resolver: yupResolver(shema),
  });

  const { register, handleSubmit, formState } = Form;
  const { errors } = formState;
  const SumbitForm = (data) => {
    const sendData = { id: +params.id, ...data };
    dispatch(todoAction.updateTodo(sendData));
    navigate("/");
  };
  return (
    <Container>
      <Card>
        <Card.Header>Edit Todo</Card.Header>
        <Card.Body>
          <form onSubmit={handleSubmit(SumbitForm)}>
            <div className="mb-3">
              <label htmlFor="Image" className="form-label">
                Image
              </label>
              <input
                type="text"
                className="form-control"
                id="Image"
                {...register("Image")}
              />
              <p className="error">{errors.Image?.message}</p>
            </div>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                {...register("title")}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Example textarea
              </label>
              <textarea
                style={{ resize: "none" }}
                className="form-control"
                id="description"
                rows="3"
                {...register("description")}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Priority
              </label>
              <select
                id="priority"
                className="form-select"
                aria-label="Default select example"
                {...register("priority")}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="state" className="form-label">
                State
              </label>
              <select
                id="state"
                className="form-select"
                aria-label="Default select example"
                {...register("state")}
              >
                <option value="todo">todo</option>
                <option value="doing">doing</option>
                <option value="done">done</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Edit Todo
            </button>
          </form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditTodo;
