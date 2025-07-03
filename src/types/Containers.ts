import type FileItem from './FileItem'

export default interface Containers {
  document?: FileItem[]
  downloads?: FileItem[]
  manual?: FileItem[]
  software?: FileItem[]
  firmware?: FileItem[]
}
