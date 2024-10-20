import { ref } from 'vue'

export function useModalAddTask() {
  const show = ref(false)

  const onShowModal = () => (show.value = true)

  const onHiddenModal = () => (show.value = false)

  return {
    show,
    onShowModal,
    onHiddenModal,
  }
}
