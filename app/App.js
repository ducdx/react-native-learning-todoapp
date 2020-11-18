import React, {Component} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import Heading from './Heading';
import Input from './Input';
import Button from './Button';
import TodoList from './TodoList';
import TabBar from './TabBar';

let todoIndex = 0;

class App extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      todos: [],
      type: 'All',
    };
    this.submitTodo = this.submitTodo.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.setType = this.setType.bind(this);
  }

  inputChange(inputValue) {
    this.setState({inputValue});
  }

  submitTodo() {
    if (this.state.inputValue.match(/^\s*$/)) {
      return;
    }
    let todo = {
      title: this.state.inputValue,
      todoIndex: todoIndex,
      complete: false,
    };
    todoIndex++;
    //const todos = [...this.state.todos, todo];
    this.state.todos.push(todo);
    this.setState({todos: this.state.todos, inputValue: ''}, () => {
      console.log('State: ', this.state);
    });
  }

  deleteTodo(todoIndex) {
    let {todos} = this.state;
    todos = this.state.todos.filter((todo) => {
      return todo.todoIndex !== todoIndex;
    });
    this.setState({todos});
  }

  toggleComplete(todoIndex) {
    let {todos} = this.state;
    todos.forEach((todo) => {
      if (todo.todoIndex === todoIndex) {
        todo.complete = !todo.complete;
      }
    });
    this.setState({todos});
  }

  setType(type) {
    console.log('Type: ', type);
    this.setState({type});
  }

  render() {
    const {inputValue, todos, type} = this.state;
    return (
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps="always" style={styles.content}>
          <Heading />
          <Input
            inputValue={inputValue}
            inputChange={(text) => this.inputChange(text)}
          />
          <TodoList
            toggleComplete={this.toggleComplete}
            deleteTodo={this.deleteTodo}
            todos={todos}
            type={type}
          />
          <Button submitTodo={this.submitTodo} />
        </ScrollView>
        <TabBar type={type} setType={this.setType} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    paddingTop: 60,
  },
});

export default App;
