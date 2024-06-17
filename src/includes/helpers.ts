export function useReadableFileSize(file) {
  const DEFAULT_SIZE = 0
  const fileSize = file ?? DEFAULT_SIZE

  if (!fileSize) {
    return
  }

  const sizeInKb = fileSize / 1024

  if (sizeInKb > 1024) {
    return `${(sizeInKb / 1024).toFixed(2)} mb`
  } else {
    return `${sizeInKb.toFixed(2)} kb`
  }
}

function preview(
  url: string,
  width: number,
  height: number,
  fit: string = 'outside'
) {
  const configImage = { bucket: import.meta.env.VITE_S3_BUCKET, key: 'images/' + url }
  if (width || height) {
    configImage.edits = {}
    width ? (configImage.edits.width= width) : ''
    height ? (configImage.edits.height = height) : ''
    fit ? (configImage.edits.fit = fit) : ''
  }
  const imageRequest = JSON.stringify(configImage)
  return import.meta.env.VITE_S3_ENDPOINT + '/' + btoa(imageRequest)
} 

export const thumbnail200 = (url: string) => {
  return preview(url, 200, 200)
}

export const thumbnail_50 = (url: string) => {
  return preview(url, 50, 50)
}

export const largeImage = (url: string) => {
  return preview(url, 800, 800)
}
