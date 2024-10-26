import React from "react";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { todoAction } from "../../store/feat";
import { useNavigate } from "react-router";
const shema = yup.object({
  Image: yup.string().url().required("Image is Required "),
  title: yup.string().required("Title is Required "),
  description: yup.string().required("description is Required "),
  state: yup.string().required("State is Required "),
  priority: yup.string().required("State is Required "),
});
const AddTodo = () => {
  const dispatch = useDispatch();
  const Form = useForm({
    defaultValues: {
      Image: "",
      title: "",
      description: "",
      state: "",
      priority: "",
    },
    resolver: yupResolver(shema),
  });
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = Form;
  const { errors } = formState;
  const SumbitForm = (data) => {
    console.log(data);
    dispatch(todoAction.addTodo({ id: Math.random(), ...data }));
    navigate("/");
  };
  return (
    <Container>
      <Card>
        <Card.Header>Add Todo</Card.Header>
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
              <p className="error">{errors.title?.message}</p>
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
              <p className="error">{errors.description?.message}</p>
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
              <p className="error">{errors.priority?.message}</p>
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
              <p className="error">{errors.state?.message}</p>
            </div>
            <button type="submit" className="btn btn-primary">
              Add Todo
            </button>
          </form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddTodo;
