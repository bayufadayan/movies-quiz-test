import { useLocation, useNavigate } from 'react-router-dom'
import { CheckCircle, XCircle, FileText, RotateCcw, Home } from 'lucide-react'

function QuizResult() {
    const location = useLocation()
    const navigate = useNavigate()

    const result = location.state

    if (!result) {
        navigate('/')
        return null
    }

    const { total, correct, wrong, answered } = result
    const score = Math.round((correct / total) * 100)
    const unanswered = total - answered

    return (
        <div className="result-container">
            <div className="result-card">
                <h1>Quiz Selesai!</h1>

                <div className="score-display">
                    <div className="score-circle">
                        <span className="score-number">{score}%</span>
                        <span className="score-label">Skor</span>
                    </div>
                </div>

                <div className="result-stats">
                    <div className="stat-item stat-total">
                        <FileText size={24} />
                        <div>
                            <span className="stat-number">{total}</span>
                            <span className="stat-label">Total Soal</span>
                        </div>
                    </div>

                    <div className="stat-item stat-correct">
                        <CheckCircle size={24} />
                        <div>
                            <span className="stat-number">{correct}</span>
                            <span className="stat-label">Benar</span>
                        </div>
                    </div>

                    <div className="stat-item stat-wrong">
                        <XCircle size={24} />
                        <div>
                            <span className="stat-number">{wrong}</span>
                            <span className="stat-label">Salah</span>
                        </div>
                    </div>

                    {unanswered > 0 && (
                        <div className="stat-item stat-unanswered">
                            <FileText size={24} />
                            <div>
                                <span className="stat-number">{unanswered}</span>
                                <span className="stat-label">Tidak Dijawab</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="result-actions">
                    <button
                        onClick={() => navigate('/quiz-setup')}
                        className="btn-primary"
                    >
                        <RotateCcw size={18} />
                        Quiz Baru
                    </button>

                    <button
                        onClick={() => navigate('/')}
                        className="btn-secondary"
                    >
                        <Home size={18} />
                        Beranda
                    </button>
                </div>
            </div>
        </div>
    )
}

export default QuizResult
