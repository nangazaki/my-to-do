<script lang="ts" setup>
  import { X, Loader } from 'lucide-vue-next'
  import { computed } from 'vue'
  import { appModals } from '@/stores/app.modals'
  import * as yup from 'yup'
  import { useForm } from 'vee-validate'
  import { createId } from '@paralleldrive/cuid2'

  const emit = defineEmits(['submit'])

  const schema = yup.object({
    title: yup.string().required('Title is required'),
    startDate: yup.date().required('Start date is required'),
    dueDate: yup
      .date()
      .required('Due date is required')
      .test('due-date', 'Due date must be after start date', function (value) {
        return this.parent.startDate <= value
      }),
    description: yup.string().required('Description is required'),
  })

  const { errors, handleSubmit, isSubmitting, defineField } = useForm({
    validationSchema: schema,
  })

  const [title, titleAttrs] = defineField('title')
  const [startDate, startDateAttrs] = defineField('startDate')
  const [dueDate, dueDateAttrs] = defineField('dueDate')
  const [description, descriptionAttrs] = defineField('description')

  const onSubmit = handleSubmit(values => {
    emit('submit', {
      id: createId(),
      title: values.title,
      startDate: values.startDate,
      dueDate: values.dueDate,
      description: values.description,
      completed: false,
    })
    onHiddenModal()
  })

  const show = computed(() => appModals().modalAddTask)
  const onHiddenModal = () => appModals().setModalTask(false)
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
          class="max-w-md w-full p-5 space-y-4 bg-zinc-800 border border-zinc-700 shadow rounded-md"
          v-show="show"
        >
          <div class="flex items-center justify-between">
            <h1 class="text-zinc-100 font-semibold text-lg flex-1 truncate">New Task</h1>

            <button
              class="shrink-0 border border-zinc-700 p-1 leading-none text-zinc-500 transition hover:bg-zinc-700 hover:text-zinc-300 rounded-md"
              @click="onHiddenModal"
            >
              <X :size="20" />
            </button>
          </div>

          <form class="space-y-6" @submit.prevent="onSubmit">
            <div class="space-y-2">
              <label class="text-zinc-300 font-medium text-sm" for="title">Title</label>
              <input
                v-model="title"
                v-bind="titleAttrs"
                type="text"
                placeholder="An example of task"
              />

              <span class="text-sm text-red-500" v-if="errors.title">{{ errors.title }}</span>
            </div>

            <div class="flex gap-5">
              <div class="flex-1 space-y-2">
                <label class="text-zinc-300 font-medium text-sm" for="start">Start date</label>
                <input
                  class="[color-scheme:dark]"
                  v-model="startDate"
                  v-bind="startDateAttrs"
                  type="date"
                />

                <span class="text-sm text-red-500" v-if="errors.startDate">{{
                  errors.startDate
                }}</span>
              </div>

              <div class="flex-1 space-y-2">
                <label class="text-zinc-300 font-medium text-sm" for="end">Due date</label>
                <input
                  class="[color-scheme:dark]"
                  v-model="dueDate"
                  v-bind="dueDateAttrs"
                  type="date"
                />

                <span class="text-sm text-red-500" v-if="errors.dueDate">{{ errors.dueDate }}</span>
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-zinc-300 font-medium text-sm" for="title">Description</label>
              <textarea
                class="w-full bg-transparent border px-2 py-1.5 border-zinc-600 rounded-md text-sm focus:outline-none text-zinc-300 resize-none"
                v-model="description"
                v-bind="descriptionAttrs"
                rows="5"
                placeholder="Description of task"
              />

              <span class="text-sm text-red-500" v-if="errors.description">
                {{ errors.description }}
              </span>
            </div>

            <div>
              <button
                class="w-full bg-pink-600 p-2 font-medium rounded-md flex items-center justify-center gap-2 text-sm text-pink-100 transition hover:bg-pink-700 disabled:opacity-50 disabled:pointer-events-none"
                :disabled="isSubmitting"
                type="submit"
              >
                <Loader class="animate-spin" v-show="isSubmitting" :size="20" />
                Registrar Tarefa
              </button>
            </div>
          </form>
        </div>
      </transition>
    </div>
  </transition>
</template>
