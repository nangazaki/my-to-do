import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { ITask } from './app.tasks'

interface IModalTask {
  show: boolean
  task: ITask
}

export const appModals = defineStore('app-modals', () => {
  const modalAddTask = ref(false)
  const setModalTask = (value: boolean) => (modalAddTask.value = value)

  const modalViewTask = ref<IModalTask | undefined>(undefined)
  const setModalViewTask = (value: IModalTask | undefined) => (modalViewTask.value = value)

  return { modalAddTask, setModalTask, modalViewTask, setModalViewTask }
})
