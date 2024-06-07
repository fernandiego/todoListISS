import {defineStore} from 'pinia';

export interface Task {
  id: number;
  name: string;
  description: string;
  completed: boolean;
  showModal: boolean;
}

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [] as Task[],
    sortedTasks: {
      notCompleted: [] as Task[],
      completed: [] as Task[]
    }
  }),
  actions: {
    loadTasks() {
      const tasks = localStorage.getItem('tasks');
      if (tasks) {
        this.tasks = JSON.parse(tasks);
        this.sortTasks()
      }
    },
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
    addTask(name: string) {
      const newId = Date.now();
      this.tasks.push({id: newId, name, description: '', completed: false, showModal: false});
      this.saveTasks();
      this.sortTasks()
    },
    deleteTask(id: number) {
      this.tasks = this.tasks.filter(task => task.id !== id);
      this.saveTasks();
      this.sortTasks()
    },
    toggleTaskCompletion(id: number) {
      const task = this.tasks.find(task => task.id === id);
      if (task) {
        task.completed = !task.completed;
        this.saveTasks();
        this.sortTasks()
      }
    },
    sortTasks() {
      this.sortedTasks.notCompleted = this.tasks.filter(task => !task.completed);
      this.sortedTasks.completed = this.tasks.filter(task => task.completed);
    }
  },
  getters: {
    completedTasks: (state) => state.tasks.filter(task => task.completed),
    notCompletedTasks: (state) => state.tasks.filter(task => !task.completed),
  }
});
