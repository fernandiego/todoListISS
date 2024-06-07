<template>
  <v-container style="max-width: 800px">
    <v-row>
      <v-col cols="12">
        <v-text-field v-model="newTaskName" label="New Task" outlined></v-text-field>
        <v-btn @click="addTask" color="primary">Add Task</v-btn>
        <v-btn class="ml-15" @click="toggleDeleteMode" color="error" v-if="selectedTasks.length === 0">Delete Mode
        </v-btn>
        <v-btn class="ml-15" @click="deleteSelectedTasks" color="error" v-if="selectedTasks.length>0">Delete Selected
        </v-btn>
        <v-btn class="ml-15" @click="toggleSortTasks" color="info">Sort Tasks</v-btn>

      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-list v-if="!sorted">
          <v-list-item v-for="task in store.tasks" :key="task.id">
            <v-row align="center">
              <v-col cols="auto" v-if="deleteMode">
                <v-checkbox color="red" v-model="selectedTasks" :value="task.id"></v-checkbox>
              </v-col>
              <v-col @click="openTaskModal(task)" style="cursor: pointer;">
                <v-list-item-title class="mb-5">{{ task.name }}</v-list-item-title>
              </v-col>
              <v-col cols="auto">
                <v-btn @click.stop="toggleTaskCompletion(task.id)">
                  <v-icon :color="task.completed ? 'green' : 'grey'">
                    {{ task.completed ? 'mdi-check' : 'mdi-circle-outline' }}
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-list-item>
        </v-list>
        <v-list v-else>
          <v-list-subheader>Not Completed Tasks</v-list-subheader>
          <v-list-item v-for="task in store.notCompletedTasks" :key="task.id">
            <v-row align="center">
              <v-col cols="auto" v-if="deleteMode">
                <v-checkbox color="red" v-model="selectedTasks" :value="task.id"></v-checkbox>
              </v-col>
              <v-col @click="openTaskModal(task)" style="cursor: pointer;">
                <v-list-item-title class="mb-5">{{ task.name }}</v-list-item-title>
              </v-col>
              <v-col cols="auto">
                <v-btn @click.stop="toggleTaskCompletion(task.id)">
                  <v-icon :color="task.completed ? 'green' : 'grey'">
                    {{ task.completed ? 'mdi-check' : 'mdi-circle-outline' }}
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-list-item>
          <v-list-subheader>Completed Tasks</v-list-subheader>
          <v-list-item v-for="task in store.completedTasks" :key="task.id">
            <v-row align="center">
              <v-col cols="auto" v-if="deleteMode">
                <v-checkbox color="red" v-model="selectedTasks" :value="task.id"></v-checkbox>
              </v-col>
              <v-col @click="openTaskModal(task)" style="cursor: pointer;">
                <v-list-item-title class="mb-5">{{ task.name }}</v-list-item-title>
              </v-col>
              <v-col cols="auto">
                <v-btn @click.stop="toggleTaskCompletion(task.id)">
                  <v-icon :color="task.completed ? 'green' : 'grey'">
                    {{ task.completed ? 'mdi-check' : 'mdi-circle-outline' }}
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>

    <v-dialog v-model="task.showModal" max-width="600px" v-for="task in store.tasks" :key="task.id">
      <v-card>
        <v-card-title>Detailed Task</v-card-title>
        <v-card-text>
          <v-text-field v-model="task.name" label="Name" outlined></v-text-field>
          <v-text-field v-model="task.description" label="Description" outlined></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="saveTask(task)" color="primary">Save</v-btn>
          <v-btn @click="deleteTask(task.id)" color="error">Delete</v-btn>
          <v-btn @click="task.showModal = false" color="secondary">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {Task, useTaskStore} from '../stores/taskStore'


export default defineComponent({
  name: 'TodoList',
  setup() {
    const store = useTaskStore()
    store.loadTasks()
    const deleteMode = ref(false);
    const newTaskName = ref<string>('');
    const selectedTasks = ref<number[]>([]);
    const completed = ref(false);
    const showModal = ref(false);
    const sorted = ref(false);


    const toggleTaskCompletion = (id: number) => {
      store.toggleTaskCompletion(id);
    };

    const toggleDeleteMode = () => {
      deleteMode.value = !deleteMode.value;
    };

    const addTask = () => {
      if (newTaskName.value.trim() !== '') {
        store.addTask(newTaskName.value);
        newTaskName.value = '';
      }
    };

    const openTaskModal = (task: Task) => {
      task.showModal = true;
    };

    const saveTask = (task: Task) => {
      task.showModal = false;
    };

    const deleteTask = (id: number) => {
      store.deleteTask(id)
    };
    const deleteSelectedTasks = () => {
      selectedTasks.value.forEach(id => store.deleteTask(id));
      selectedTasks.value = [];
    };

    const toggleSortTasks = () => {
      sorted.value = !sorted.value;
    };

    return {
      store,
      newTaskName,
      addTask,
      openTaskModal,
      saveTask,
      completed,
      deleteTask,
      selectedTasks,
      deleteSelectedTasks,
      toggleDeleteMode,
      deleteMode,
      showModal,
      toggleTaskCompletion,
      sorted,
      toggleSortTasks,
    };
  },
});
</script>

<style>
/* Add your custom styles here */
</style>
