import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskAlreadyExists = tasks.find(task => task.title === newTaskTitle);

    if (taskAlreadyExists) {
      return Alert.alert(
        'Tarefa já cadastrada', 
        'Você não pode cadastrar uma tarefa com o mesmo nome'
      );
    }

    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }

    setTasks(oldState => [...oldState, data]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }));

    const foundTask = updatedTasks.find(task => task.id === id);

    if (!foundTask){
      return;
    }

    foundTask.done = !foundTask.done;
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    return Alert.alert(
      'Remover tarefa', 
      'Tem certeza que você deseja remover essa tarefa?',
      [
        {
          style: 'cancel',
          text: 'Não',
        },
        {
          style: 'destructive',
          text: 'Sim',
          onPress: () => setTasks(oldState => oldState.filter(task => task.id !== id)),
        }
      ]
    );
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const updatedTasks = tasks.map(task => ({ ...task }));

    const foundTask = updatedTasks.find(task => task.id === taskId);

    if (!foundTask){
      return;
    }

    foundTask.title = taskNewTitle;
    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})