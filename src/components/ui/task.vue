<script lang="ts" setup>
  import { appModals } from '@/stores/app.modals'
  import { formatDate } from '../../utils/format'
  import type { ITask } from '@/stores/app.tasks'

  const { task } = defineProps<{
    task: ITask
  }>()

  const onShowTask = () => {
    appModals().setModalViewTask({
      show: true,
      task: task,
    })
  }
</script>

<template>
  <div class="bg-zinc-800/50 border border-zinc-800 p-2 space-y-2 rounded-md hover:cursor-pointer">
    <div
      class="w-full h-40 bg-gradient-to-r from-pink-700 to-pink-500 rounded-md overflow-hidden"
      v-if="task?.cover"
    >
      <img
        class="w-full h-full object-cover"
        src="https://github.com/nangazaki.png"
        :alt="task.id"
      />
    </div>

    <h3
      @click="onShowTask"
      :class="[{ 'line-through': task.completed }, 'font-medium text-zinc-200']"
    >
      {{ task.title }}
    </h3>

    <div class="flex flex-col items-start gap-1">
      <span class="text-sm">
        <span class="font-medium text-zinc-300">Due date:</span>
        {{ formatDate(task.dueDate) }}
      </span>

      <button
        class="bg-red-600 text-red-100 px-2 py-0.5 text-sm flex items-center gap-1 rounded-md transition hover:bg-red-700"
      >
        <Trash2 size="16" /> Eliminar
      </button>
    </div>
  </div>
</template>
