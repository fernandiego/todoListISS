<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-text-field v-model="newTaskName" label="New Task" outlined></v-text-field>
        <v-btn @click="addTask" color="primary">Add Task</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" v-for="task in tasks" :key="task.id">
        <v-card @click="openTaskModal(task)">
          <v-card-text>{{ task.name }}</v-card-text>
          <v-dialog v-model="taskModal" max-width="600px">
            <template #activator="{ on }">
              <v-card-actions>
                <v-btn color="primary" v-on="on">View Details</v-btn>
              </v-card-actions>
            </template>
            <v-card>
              <v-card-title>Detailed Task</v-card-title>
              <v-card-text>
                <v-text-field v-model="task.name" label="Name" outlined></v-text-field>
                <v-text-field v-model="task.description" label="Description" outlined></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-btn @click="saveTask(task)" color="primary">Save</v-btn>
                <v-btn @click="deleteTask(task.id)" color="error">Delete</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

interface Task {
  id: number;
  name: string;
  description: string;
  completed: boolean;
}

export default defineComponent({
  name: 'TodoList',
  setup() {
    const tasks = ref<Task[]>([
      { id: 1, name: 'Task 1', description: 'Description 1', completed: false },
      { id: 2, name: 'Task 2', description: 'Description 2', completed: true },
    ]);
    const newTaskName = ref<string>('');
    const taskModal = ref<boolean>(false);
    const currentTask = ref<Task | null>(null);

    const addTask = () => {
      if (newTaskName.value.trim() !== '') {
        const newId = tasks.value.length + 1;
        tasks.value.push({ id: newId, name: newTaskName.value, description: '', completed: false });
        newTaskName.value = '';
      }
    };

    const openTaskModal = (task: Task) => {
      currentTask.value = task;
      taskModal.value = true;
    };

    const saveTask = (task: Task) => {
      taskModal.value = false;
      // Save task logic
    };

    const deleteTask = (id: number) => {
      tasks.value = tasks.value.filter(task => task.id !== id);
    };

    return {
      tasks,
      newTaskName,
      taskModal,
      currentTask,
      addTask,
      openTaskModal,
      saveTask,
      deleteTask,
    };
  },
});
</script>

<style>
/* Add your custom styles here */
</style>
