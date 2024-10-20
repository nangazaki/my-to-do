import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

export interface IColumn {
  id: string
  name: string
  list: ITask[]
}

export interface ITask {
  id: string
  title: string
  cover?: string
  startDate: string | null
  dueDate: string | null
  description: string
  completed: boolean
}

export const appTasks = defineStore('app-tasks', () => {
  const tasks = useLocalStorage<IColumn[]>('app-tasks', [
    { id: 'newTasks', name: 'New Tasks', list: [] },
    { id: 'todo', name: 'To Do', list: [] },
    { id: 'completed', name: 'Completed', list: [] },
  ])

  const addTask = (columnId: string, task: ITask) => {
    const column = tasks.value.find(c => c.id === columnId)
    if (column) {
      column.list.push(task)
    }
  }

  const updateTaskStatus = (columnId: string, taskId: string, status: boolean) => {
    const column = tasks.value.find(c => c.id === columnId)
    if (column) {
      const task = column.list.find(t => t.id === taskId)
      if (task) {
        task.completed = status
      }
    }
  }

  const updateTask = (columnId: string, taskId: string, updatedTask: ITask) => {
    const column = tasks.value.find(c => c.id === columnId)
    if (column) {
      const task = column.list.find(t => t.id === taskId)
      if (task) {
        task.title = updatedTask.title
        task.dueDate = updatedTask.dueDate
        task.description = updatedTask.description

        if (updatedTask.cover) task.cover = updatedTask.cover
      }
    }
  }

  const deleteTask = (columnId: string, taskId: string) => {
    const column = tasks.value.find(c => c.id === columnId)
    if (column) {
      column.list = column.list.filter(t => t.id !== taskId)
    }
  }

  return { tasks, addTask, deleteTask, updateTaskStatus, updateTask }
})
