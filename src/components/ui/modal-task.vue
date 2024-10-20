<script lang="ts" setup>
  import { computed } from 'vue'
  import { X, Edit, Check, Trash2 } from 'lucide-vue-next'
  import { appModals } from '@/stores/app.modals'
  import { appTasks } from '@/stores/app.tasks'

  import { formatDate } from '@/utils/format'

  const show = computed(() => appModals().modalViewTask?.show)
  const task = computed(() => appModals().modalViewTask?.task)

  const onCompletedTask = () => {
    appTasks().updateTaskStatus('todo', task.value?.id, true)
    onCloseModal()
  }

  const onDeleteTask = () => {
    appTasks().deleteTask('todo', task.value?.id)
    onCloseModal()
  }

  const onCloseModal = () => {
    if (task.value) {
      appModals().setModalViewTask(undefined)
    }
  }
</script>

<template>
  <transition
    enter-active-class="transition ease-out duration-300 transform"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-300 transform"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      class="fixed inset-0 flex items-start justify-center p-6 pt-10 bg-zinc-900/80"
      v-show="show"
    >
      <transition
        appear
        enter-active-class="transition ease-out duration-300 transform"
        enter-from-class="opacity-0 translate-y-10 scale-95"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="ease-in duration-300 transform"
        leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="opacity-0 translate-y-10 scale-95"
      >
        <div
          class="max-w-md w-full p-5 space-y-4 bg-zinc-800 border border-zinc-700 shadow rounded-md text-zinc-300"
          v-show="show"
        >
          <div class="flex justify-between items-center">
            <h3 class="text-xl font-medium text-zinc-100">View Task</h3>

            <button
              class="shrink-0 border border-zinc-700 p-1 leading-none text-zinc-500 transition hover:bg-zinc-700 hover:text-zinc-300 rounded-md"
              @click="onCloseModal"
            >
              <X :size="20" />
            </button>
          </div>
          <div class="border border-zinc-700 h-40 rounded-md bg-zinc-700">
            <button></button>
          </div>

          <div class="space-y-3">
            <h1 class="text-lg text-zinc-100 font-medium">
              {{ task?.title }}
            </h1>

            <div class="flex flex-col gap-1">
              <span class="text-sm text-zinc-100 font-medium">Start date</span>
              <span class="text-sm"> {{ formatDate(task?.startDate) }} </span>
            </div>

            <div class="flex flex-col gap-1">
              <span class="text-sm text-zinc-100 font-medium">Due date</span>
              <span class="text-sm"> {{ formatDate(task?.dueDate) }} </span>
            </div>

            <div class="flex flex-col gap-1">
              <span class="text-sm text-zinc-100 font-medium">Description</span>
              <span class="text-sm">
                {{ task?.description }}
              </span>
            </div>

            <div class="flex gap-2 flex-wrap">
              <button
                class="bg-zinc-600 text-white flex items-center gap-1 text-sm py-1 px-1.5 rounded-md transition hover:bg-pink-600"
              >
                <Edit :size="16" />
                Edit task
              </button>

              <button
                class="bg-zinc-600 text-white flex items-center gap-1 text-sm py-1 px-1.5 rounded-md transition hover:bg-red-600"
                @click="onDeleteTask"
              >
                <Trash2 :size="16" />
                Delete
              </button>

              <button
                class="bg-zinc-600 text-white flex items-center gap-1 text-sm py-1 px-1.5 rounded-md transition hover:bg-emerald-700"
                @click="onCompletedTask"
              >
                <Check :size="16" />
                Mark as completed
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>
