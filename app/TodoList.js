import React from 'react';
import {View} from 'react-native';
import Todo from './Todo';

const TodoList = ({type, todos, deleteTodo, toggleComplete}) => {
  const getVisibleTodos = (todoList, todoType) => {
    switch (todoType) {
      case 'All':
        return todoList;
      case 'Complete':
        return todoList.filter((t) => t.complete);
      case 'Active':
        return todoList.filter((t) => !t.complete);
      default:
        return todoList;
    }
  };
  todos = getVisibleTodos(todos, type);
  todos = todos.map((todo, i) => {
    return (
      <Todo
        deleteTodo={deleteTodo}
        toggleComplete={toggleComplete}
        key={i}
        todo={todo}
      />
    );
  });
  return <View>{todos}</View>;
};

export default TodoList;
