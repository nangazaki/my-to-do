export interface IDraggable {
  id: string
  title: string
  tasks: Array<{ id: string; name: string; closed: boolean }>
}
