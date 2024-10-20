<script lang="ts" setup>
  import { ref } from 'vue'
  import draggable from 'vuedraggable'
  import { Plus } from 'lucide-vue-next'
  import { useLocalStorage } from '@vueuse/core'
  import { appModals } from '@/stores/app.modals'

  import { type IDraggable } from '../../interfaces/intex'

  const tasks = useLocalStorage<IDraggable[]>('tasks', [
    {
      id: 'pendentes',
      title: 'New Tasks',
      tasks: [{ id: 'draggable', title: 'adsdsdsd', close: false }],
    },
    {
      id: 'afazer',
      title: 'A fazer...',
      tasks: [{ id: 'draggable', title: 'adsdsdsd', close: false }],
    },
    {
      id: 'concluidas',
      title: 'Concluídas',
      tasks: [{ id: 'draggable', title: 'adsdsdsd', close: true }],
    },
  ])

  const addNewTask = (columnId: string) => {
    const column = tasks.value.find(table => table.id === columnId)
    if (column) {
      column.tasks.push({
        id: String(Math.random() * 1000),
        name: `Nova Tarefa ${column.tasks.length + 1}`,
        closed: false,
      })
    }
  }

  const updateTaskStatus = (task: HTMLElement, columnId: string) => {
    if (columnId === 'concluidas') {
      const id = task.getAttribute('data-task-id')

      const column = tasks.value.find(table => table.id === columnId)
      if (column) {
        column.tasks = column.tasks.map(task => {
          if (task.id === id) {
            task.closed = true
          }
          return task
        })
      }
    } else {
      const id = task.getAttribute('data-task-id')

      const column = tasks.value.find(table => table.id === columnId)
      if (column) {
        column.tasks = column.tasks.map(task => {
          if (task.id === id) {
            task.closed = false
          }
          return task
        })
      }
    }
  }
  const onTaskMoved = (evt: any) => {
    const movedTask = evt.item
    const newColumnId = evt.to.getAttribute('data-column-id')

    updateTaskStatus(movedTask, newColumnId)
  }

  const log = (evt: any) => {
    console.log(evt)
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
        <span class="text-zinc-100 font-medium"> {{ column.title }} </span>
        <button
          class="bg-pink-600 hover:bg-pink-700 flex items-center rounded-md transition text-pink-100 py-1 px-2"
          v-if="column.id === 'pendentes'"
          @click="onShowModal"
        >
          <Plus size="18" />
          Adicionar Tarefa
        </button>
      </div>

      <draggable
        class="tasks-group h-full flex-1 overflow-hidden overflow-y-auto p-3 space-y-3"
        :data-column-id="column.id"
        :tasks="column.tasks"
        @end="onTaskMoved"
        itemKey="id"
        group="tasks"
      >
        <template #item="{ element }">
          <div
            class="bg-zinc-800/50 border border-zinc-800 p-2 space-y-2 rounded-md hover:cursor-pointer"
            :class="{ 'line-through text-zinc-500': element.closed }"
            :data-task-id="element.id"
          >
            <div
              class="w-full h-40 bg-gradient-to-r from-pink-700 to-pink-500 rounded-md overflow-hidden"
            >
              <img
                class="w-full h-full object-cover"
                src="https://github.com/nangazaki.png"
                :alt="element.id"
              />
            </div>

            <h3>
              {{ element.name }}
            </h3>
          </div>
        </template>
      </draggable>
    </div>
  </section>
</template>
