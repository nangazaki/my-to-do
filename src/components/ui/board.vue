<script lang="ts" setup>
  import { computed } from 'vue'
  import draggable from 'vuedraggable'
  import { Plus } from 'lucide-vue-next'
  import { appModals } from '@/stores/app.modals'
  import { appTasks } from '@/stores/app.tasks'

  import Task from './task.vue'

  const tasks = computed(() => appTasks().tasks)

  const onTaskMoved = (evt: any) => {
    const task = evt.item.__draggable_context.element
    const columnId = evt.to.getAttribute('data-column-id')

    if (columnId === 'completed') {
      appTasks().updateTaskStatus(columnId, task.id, true)
    } else {
      appTasks().updateTaskStatus(columnId, task.id, false)
    }
  }

  const onShowModal = () => {
    appModals().setModalTask(true)
  }
</script>

<template>
  <section class="flex-1 grid grid-cols-12 gap-4 h-full">
    <div
      class="col-span-4 h-full flex-1 overflow-hidden flex flex-col select-none border rounded-md border-zinc-800 bg-zinc-800/20"
      v-for="column in tasks"
      :key="column.id"
    >
      <div class="p-3 bg-zinc-700/60 shrink-0 h-11 flex justify-between items-center">
        <span class="text-zinc-100 font-medium"> {{ column.name }} </span>
        <button
          class="bg-pink-600 hover:bg-pink-700 flex items-center rounded-md transition text-pink-100 py-1 px-2"
          v-if="column.id === 'newTasks'"
          @click="onShowModal"
        >
          <Plus :size="18" />
          Adicionar Tarefa
        </button>
      </div>

      <draggable
        class="tasks-group h-full flex-1 overflow-hidden overflow-y-auto p-3 space-y-3"
        :data-column-id="column.id"
        :list="column.list"
        @end="onTaskMoved"
        itemKey="id"
        group="tasks"
      >
        <template #item="{ element }">
          <task :task="element" />
        </template>
      </draggable>
    </div>
  </section>
</template>
