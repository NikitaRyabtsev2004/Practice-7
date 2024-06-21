import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, toggleTodo, deleteTodo, setFilter, Filters } from "./store";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  ListGroup,
  Badge,
} from "react-bootstrap";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import { Provider } from "react-redux";

const TodoApp = () => {
  const [task, setTask] = useState("");
  const todos = useSelector((state) => state.todosState.todos);
  const filter = useSelector((state) => state.todosState.filter);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (task.trim().length === 0) {
      alert("Нельзя чтобы строка оставалась пустой");
      return;
    }
    if (task.length <= 150) {
      dispatch(addTodo(task));
      setTask("");
    } else {
      alert("Не больше 150 символов");
    }
  };

  const handleFilterChange = (newFilter) => {
    dispatch(setFilter(newFilter));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === Filters.ALL) return true;
    if (filter === Filters.COMPLETED) return todo.completed;
    if (filter === Filters.CURRENT) return !todo.completed;
    return true;
  });

  const completedCount = todos.filter((todo) => todo.completed).length;
  const currentCount = todos.filter((todo) => !todo.completed).length;

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h1>Todo List</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Badge style={{marginRight:"20px"}}bg="success">Completed: {completedCount}</Badge>
          <Badge>Current: {currentCount}</Badge>
        </Col>
      </Row>
      <Row className="my-3">
        <Col>
          <Button
            variant="secondary"
            onClick={() => handleFilterChange(Filters.ALL)}
          >
            All
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleFilterChange(Filters.COMPLETED)}
          >
            Completed
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleFilterChange(Filters.CURRENT)}
          >
            Current
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form className="input-btn">
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Add a new task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="input"
              />
            </Form.Group>
            <Button
              className="button"
              variant="primary"
              onClick={handleAddTodo}
            >
              Add Task
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <ListGroup>
            {filteredTodos.map((todo) => (
              <ListGroup.Item className="item" key={todo.id}>
                <span
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    cursor: "pointer",
                  }}
                  onClick={() => dispatch(toggleTodo(todo.id))}
                >
                  {todo.content}
                </span>
                <div className="btns">
                  <Button
                    className="item-btn"
                    size="sm"
                    onClick={() => dispatch(toggleTodo(todo.id))}
                  >
                    Done
                  </Button>
                  <Button
                    className="item-btn"
                    variant="danger"
                    size="sm"
                    onClick={() => dispatch(deleteTodo(todo.id))}
                  >
                    Delete
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <TodoApp />
    </PersistGate>
  </Provider>
);

export default App;
