<script lang="ts" setup>
  import { ref, watch } from 'vue'
  import { useLocalStorage } from '@vueuse/core'

  import Board from '@/components/ui/board.vue'
  import ModalAddTask from '@/components/ui/modal-add-task.vue'

  const tasks = useLocalStorage('tasks', [])

  const newTaskValue = ref({})

  watch(newTaskValue, nValue => {
    const table = tasks.value.find(t => t.id === 'pendentes')
    if (table) {
      table.tasks.push(nValue)
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
        <a class="hover:text-zinc-500 transition underline" href="#">GitHub</a>
      </p>
    </footer>

    <modal-add-task @submit="e => (newTaskValue = e)" />
  </div>
</template>
