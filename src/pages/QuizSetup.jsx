import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchCategories } from '../utils/quizApi'
import { PlayCircle, Settings } from 'lucide-react'

function QuizSetup() {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  
  const [amount, setAmount] = useState(10)
  const [category, setCategory] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [duration, setDuration] = useState(600)

  useEffect(() => {
    fetchCategories()
      .then(data => {
        setCategories(data)
        setLoading(false)
      })
      .catch(error => {
        console.error(error)
        setLoading(false)
      })
  }, [])

  function handleStart() {
    const config = {
      amount: Number(amount),
      category,
      difficulty,
      duration: Number(duration)
    }
    navigate('/quiz', { state: config })
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="quiz-setup-container">
      <div className="quiz-setup-card">
        <div className="setup-header">
          <Settings size={40} />
          <h1>Setup Quiz</h1>
          <p>Pilih pengaturan quiz Anda</p>
        </div>

        <div className="setup-form">
          <div className="form-group">
            <label>Jumlah Soal</label>
            <input
              type="number"
              min="5"
              max="50"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Kategori</label>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Any Category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Tingkat Kesulitan</label>
            <select 
              value={difficulty} 
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="">Any Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="form-group">
            <label>Durasi (detik)</label>
            <input
              type="number"
              min="60"
              max="3600"
              step="60"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
            <small>{Math.floor(duration / 60)} menit</small>
          </div>

          <button onClick={handleStart} className="btn-primary btn-large">
            <PlayCircle size={20} />
            Mulai Quiz
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuizSetup
