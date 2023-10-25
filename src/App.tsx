"use client";

import Image from "next/image";
import styles from "./styles/todo-app.module.css";
import { useEffect, useRef, useState } from "react";
import TodoItem from "./_components/todo-app/TodoItem/TodoItem";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import Cookies from "js-cookie";

interface TodoDictionary {
  id: number;
  text: string;
  state: "active" | "completed";
}

const App = () => {
  const inputTextRef = useRef<HTMLInputElement | null>(null);
  const [inputText, setInputText] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [todos, setTodos] = useState<TodoDictionary[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    inputTextRef.current?.focus();
  }, []);

  useEffect(() => {
    const darkModeCookie = Cookies.get("darkMode");
    if (darkModeCookie !== undefined && darkModeCookie !== "") {
      setDarkMode(JSON.parse(darkModeCookie));
    }

    const todosCookie = Cookies.get("todos");
    if (todosCookie !== undefined && todosCookie !== "") {
      setTodos(JSON.parse(todosCookie));
    }
  }, []);

  useEffect(() => {
    const htmlElement = document.documentElement;
    htmlElement.setAttribute("TodoApp-darkMode", String(darkMode));
    Cookies.set("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    Cookies.set("todos", JSON.stringify(todos));
  }, [todos]);

  const handleModeClick = () => {
    setDarkMode(!darkMode);
  };

  const handleAddTodoItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTodos([
      ...todos,
      {
        id: todos.length,
        text: inputText,
        state: "active",
      },
    ]);
    setInputText("");
  };

  const handleCheckTodo = (target: number) => {
    const itemIndex = todos.findIndex((todo) => todo.id === target);
    if (itemIndex !== -1) {
      const updatedTodos = [...todos];
      updatedTodos[itemIndex] = {
        ...updatedTodos[itemIndex],
        state:
          updatedTodos[itemIndex].state === "active" ? "completed" : "active",
      };
      setTodos(updatedTodos);
    }
  };

  const handleRemoveTodo = (target: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== target));
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const reorderedItems = [...todos];
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);

    setTodos(reorderedItems);
  };

  const handleAllClick = () => {
    setFilter("all");
  };

  const handleActiveClick = () => {
    setFilter("active");
  };

  const handleCompletedClick = () => {
    setFilter("completed");
  };

  const handleClearCompletedClick = () => {
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => todo.state !== "completed")
    );
  };

  return (
    <main className={styles.main}>
      <Image
        src={
          darkMode
            ? "/todo-app/assets/images/bg-desktop-dark.jpg"
            : "/todo-app/assets/images/bg-desktop-light.jpg"
        }
        alt="background"
        width={1440}
        height={300}
        className={styles.desktopBg}
        priority={true}
      />
      <section className={styles.section}>
        <div className={styles.topDiv}>
          <h1 className={styles.h1}>Todo</h1>
          <button onClick={handleModeClick} className={styles.modeButton}>
            <Image
              src={
                darkMode
                  ? "/todo-app/assets/images/icon-sun.svg"
                  : "/todo-app/assets/images/icon-moon.svg"
              }
              alt="mode"
              width={26}
              height={26}
            />
          </button>
        </div>
        <div className={styles.inputDiv}>
          <button className={styles.inputCheck}></button>
          <form onSubmit={handleAddTodoItem} className={styles.form}>
            <input
              type="text"
              placeholder="Create a new todo..."
              id="text"
              ref={inputTextRef}
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
              }}
              className={styles.input}
              autoComplete="off"
              maxLength={100}
            />
          </form>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list">
            {(provided) => (
              <ul
                className={styles.ul}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {todos
                  .filter(
                    filter === "active"
                      ? (todo) => todo.state === "active"
                      : filter === "completed"
                      ? (todo) => todo.state === "completed"
                      : (todo) => todo
                  )
                  .map((todo, index) => (
                    <Draggable
                      key={todo.id}
                      draggableId={String(todo.id)}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TodoItem
                            id={todo.id}
                            text={todo.text}
                            state={todo.state}
                            checkFunction={handleCheckTodo}
                            removeFunction={handleRemoveTodo}
                          />
                          <hr className={styles.hr} />
                        </li>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
                <li className={styles.bottomItem}>
                  <p>
                    {todos.filter((todo) => todo.state !== "completed").length}{" "}
                    item
                    {todos.filter((todo) => todo.state !== "completed")
                      .length === 1
                      ? ""
                      : "s"}{" "}
                    left
                  </p>
                  <div className={styles.filterDiv}>
                    <button
                      onClick={handleAllClick}
                      className={
                        filter === "all"
                          ? `${styles.actionButton} ${styles.bold} ${styles.active}`
                          : `${styles.actionButton} ${styles.bold}`
                      }
                    >
                      All
                    </button>
                    <button
                      onClick={handleActiveClick}
                      className={
                        filter === "active"
                          ? `${styles.actionButton} ${styles.bold} ${styles.active}`
                          : `${styles.actionButton} ${styles.bold}`
                      }
                    >
                      Active
                    </button>
                    <button
                      onClick={handleCompletedClick}
                      className={
                        filter === "completed"
                          ? `${styles.actionButton} ${styles.bold} ${styles.active}`
                          : `${styles.actionButton} ${styles.bold}`
                      }
                    >
                      Completed
                    </button>
                  </div>
                  <button
                    onClick={handleClearCompletedClick}
                    className={styles.actionButton}
                  >
                    Clear Completed
                  </button>
                </li>
              </ul>
            )}
          </Droppable>
        </DragDropContext>
        <p className={styles.bottomText}>Drag and drop to reorder list</p>
      </section>
    </main>
  );
};

export default App;
