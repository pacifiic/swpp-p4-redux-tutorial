
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Todo from "../../components/Todo/Todo";
import {
  fetchTodos,
  selectTodo,
  toggleDone,
  deleteTodo,
} from "../../store/slices/todo";
import "./TodoList.css";
import { AppDispatch } from "../../store";

interface IProps {
  title: string;
}
type TodoType = { id: number; title: string; content: string; done: boolean };
export default function TodoList(props: IProps) {
  const { title } = props;
  const todoState = useSelector(selectTodo);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()

  const clickTodoHandler = (td: TodoType) => {
    navigate('/todos/' + td.id)
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <div className="TodoList">
      <div className="title">{title}</div>
      <div className="todos">
        {todoState.todos.map((td) => {
          return (
            <Todo
              key={`${td.id}_todo`}
              title={td.title}
              done={td.done}
              clickDetail={() => clickTodoHandler(td)}
              clickDone={() => dispatch(toggleDone(td.id))}
              clickDelete={() => dispatch(deleteTodo(td.id))}
            />
          );
        })}
        <NavLink to="/new-todo" >New Todo</NavLink>
      </div>
    </div>
  );
}
