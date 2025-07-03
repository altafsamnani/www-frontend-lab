export default interface FileItem {
  id: number
  fileCollectionId: number
  type: string
  name: string
  icon: string
  url: string
  publishedAt: string | null
  deletedAt: string | null
  platformType: string | null
  notificationType: number
  notificationText: string
  version: string
  versionUpdate: string
  extension: string
  size: number
  changelog: string
}
