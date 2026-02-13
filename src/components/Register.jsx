import { useState } from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, UserPlus, AlertCircle, CheckCircle } from 'lucide-react'

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const { signUp } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess(false)

        if (password !== confirmPassword) {
            setError('Password tidak cocok')
            return
        }

        if (password.length < 6) {
            setError('Password minimal 6 karakter')
            return
        }

        setLoading(true)

        const { error } = await signUp(email, password)

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            setSuccess(true)
            setLoading(false)
            // Auto login after registration
            setTimeout(() => {
                navigate('/')
            }, 1500)
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <UserPlus size={40} />
                    <h1>Register</h1>
                    <p>Buat akun baru</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    {error && (
                        <div className="error-message">
                            <AlertCircle size={18} />
                            <span>{error}</span>
                        </div>
                    )}

                    {success && (
                        <div className="success-message">
                            <CheckCircle size={18} />
                            <span>Registrasi berhasil! Redirecting...</span>
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="email">
                            <Mail size={18} />
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="nama@email.com"
                            required
                            disabled={loading || success}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">
                            <Lock size={18} />
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Minimal 6 karakter"
                            required
                            disabled={loading || success}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">
                            <Lock size={18} />
                            Konfirmasi Password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Ulangi password"
                            required
                            disabled={loading || success}
                        />
                    </div>

                    <button type="submit" className="btn-primary" disabled={loading || success}>
                        {loading ? 'Loading...' : success ? 'Berhasil!' : 'Daftar'}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        Sudah punya akun? <Link to="/login">Login di sini</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register
