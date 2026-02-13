import { useState } from 'react'
import useAuth from '../hooks/useAuth'
import { LogOut, PlayCircle, RotateCcw } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { hasActiveQuiz, clearQuizSession } from '../utils/quizStorage'

function Home() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [hasResume, setHasResume] = useState(() => hasActiveQuiz())

  async function handleLogout() {
    await signOut()
    navigate('/login')
  }

  function handleStartQuiz() {
    navigate('/quiz')
  }

  function handleResumeQuiz() {
    navigate('/quiz')
  }

  function handleNewQuiz() {
    clearQuizSession()
    setHasResume(false)
    navigate('/quiz')
  }

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Movies Quiz</h1>
        <button onClick={handleLogout} className="btn-logout">
          <LogOut size={18} />
          Logout
        </button>
      </div>
      
      <div className="home-content">
        <div className="welcome-section">
          <h2>Selamat datang, {user?.email}</h2>
          <p>Uji pengetahuan Anda dengan quiz interaktif!</p>
        </div>

        {hasResume ? (
          <div className="quiz-actions">
            <div className="resume-notice">
              <p>Anda memiliki quiz yang belum selesai</p>
            </div>
            <button onClick={handleResumeQuiz} className="btn-primary btn-large">
              <PlayCircle size={20} />
              Lanjutkan Quiz
            </button>
            <button onClick={handleNewQuiz} className="btn-secondary">
              <RotateCcw size={18} />
              Mulai Quiz Baru
            </button>
          </div>
        ) : (
          <div className="quiz-actions">
            <button onClick={handleStartQuiz} className="btn-primary btn-large">
              <PlayCircle size={20} />
              Mulai Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
