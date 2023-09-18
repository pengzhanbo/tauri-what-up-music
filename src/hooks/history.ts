export const history: string[] = []

let currentHistoryIndex = 0

export const pushHistory = (path: string, replace = false) => {
  if (currentHistoryIndex < history.length - 1) {
    history.splice(
      currentHistoryIndex + 1,
      history.length - currentHistoryIndex,
    )
  }
  if (replace) {
    history[currentHistoryIndex] = path
  } else {
    history.push(path)
  }
  currentHistoryIndex = history.length - 1
}

export const forwardHistory = () => {
  currentHistoryIndex++
  if (currentHistoryIndex > history.length - 1) {
    currentHistoryIndex = history.length - 1
  }
  return history[currentHistoryIndex]
}

export const backHistory = () => {
  currentHistoryIndex--
  if (currentHistoryIndex < 0) {
    currentHistoryIndex = 0
  }
  return history[currentHistoryIndex]
}

export const isLatestHistory = () => {
  return history.length === 0 || currentHistoryIndex === history.length - 1
}

export const isFirstHistory = () => {
  return currentHistoryIndex === 0 || history.length === 0
}

export const useNavigateHistory = () => {
  return {
    history,
    currentHistoryIndex,
    pushHistory,
    forwardHistory,
    backHistory,
    isLatestHistory,
    isFirstHistory,
  }
}
