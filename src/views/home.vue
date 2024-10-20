<script lang="ts" setup>
  import { ref, watch } from 'vue'
  import { appTasks, type ITask } from '@/stores/app.tasks'

  import Board from '@/components/ui/board.vue'
  import ModalAddTask from '@/components/ui/modal-add-task.vue'
  import ModalTask from '../components/ui/modal-task.vue'

  const newTaskValue = ref<ITask>({
    id: '',
    title: '',
    startDate: null,
    dueDate: null,
    description: '',
    completed: false,
  })

  const addNewTask = (payload: ITask) => {
    newTaskValue.value = payload
  }

  watch(newTaskValue, (nValue: ITask) => {
    if (nValue.id !== '') {
      appTasks().addTask('newTasks', nValue)

      newTaskValue.value = {
        id: '',
        title: '',
        startDate: null,
        dueDate: null,
        description: '',
        completed: false,
      }
    }
  })
</script>

<template>
  <div class="h-screen flex flex-col overflow-hidden">
    <header class="shrink-0 h-16 py-4 border-b border-zinc-800">
      <div class="mx-auto max-w-md flex items-center justify-center h-full">
        <h1 class="text-zinc-100 font-semibold text-xl">My ToDo</h1>
      </div>
    </header>

    <main class="max-w-screen-xl w-full flex-1 overflow-hidden mx-auto px-2 py-6 text-zinc-400">
      <board />
    </main>

    <footer class="shrink-0 h-16 py-4 text-center border-t border-zinc-800">
      <p class="text-zinc-400 text-sm">
        {{ new Date().getFullYear() }} &copy;
        <a
          class="hover:text-zinc-500 transition underline"
          href="https://github.com/nangazaki"
          target="_blank"
        >
          nangazaki </a
        >. The source code is available in
        <a
          class="hover:text-zinc-500 transition underline"
          href="https://github.com/nangazaki/my-to-do"
          target="_blank"
          >GitHub</a
        >
      </p>
    </footer>

    <modal-add-task @submit="addNewTask" />
    <modal-task />
  </div>
</template>
