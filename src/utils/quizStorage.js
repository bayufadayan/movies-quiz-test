const QUIZ_STORAGE_KEY = 'quiz_session'

export function saveQuizSession(data) {
  localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(data))
}

export function getQuizSession() {
  const data = localStorage.getItem(QUIZ_STORAGE_KEY)
  return data ? JSON.parse(data) : null
}

export function clearQuizSession() {
  localStorage.removeItem(QUIZ_STORAGE_KEY)
}

export function hasActiveQuiz() {
  return getQuizSession() !== null
}
