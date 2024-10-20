import { defineStore } from 'pinia'
import { ref } from 'vue'

export const appModals = defineStore('app-modals', () => {
  const modalAddTask = ref(false)
  const setModalTask = (value: boolean) => (modalAddTask.value = value)

  return { modalAddTask, setModalTask }
})
