import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login as loginApi } from '../api/auth'
import { useAuth } from '../context/AuthContext'

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #4c51bf, #6b46c1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'sans-serif',
  },
  card: {
    background: '#fff',
    borderRadius: 16,
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
    padding: '40px',
    width: '100%',
    maxWidth: 420,
  },
  title: {
    margin: '0 0 8px',
    fontSize: 28,
    fontWeight: 700,
    color: '#1a202c',
  },
  subtitle: {
    margin: '0 0 32px',
    fontSize: 15,
    color: '#718096',
  },
  label: {
    display: 'block',
    marginBottom: 6,
    fontSize: 14,
    fontWeight: 600,
    color: '#4a5568',
  },
  input: {
    width: '100%',
    padding: '14px',
    borderRadius: 8,
    border: '1px solid #e2e8f0',
    fontSize: 15,
    outline: 'none',
    boxSizing: 'border-box',
    marginBottom: 20,
    color: '#1a202c',
  },
  button: {
    width: '100%',
    padding: '14px',
    borderRadius: 8,
    border: 'none',
    background: 'linear-gradient(135deg, #4c51bf, #6b46c1)',
    color: '#fff',
    fontSize: 16,
    fontWeight: 700,
    cursor: 'pointer',
    marginTop: 4,
  },
  error: {
    background: '#fff5f5',
    border: '1px solid #feb2b2',
    color: '#c53030',
    borderRadius: 8,
    padding: '12px 16px',
    marginBottom: 20,
    fontSize: 14,
  },
  footer: {
    marginTop: 24,
    textAlign: 'center',
    fontSize: 14,
    color: '#718096',
  },
  link: {
    color: '#6b46c1',
    fontWeight: 600,
    textDecoration: 'none',
  },
}

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data } = await loginApi(email, password)
      login(data.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Help Desk Login</h1>
        <p style={styles.subtitle}>Sign in to manage tickets</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <label style={styles.label} htmlFor="email">Email</label>
          <input
            id="email"
            style={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />

          <label style={styles.label} htmlFor="password">Password</label>
          <input
            id="password"
            style={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          <button style={styles.button} type="submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <div style={styles.footer}>
          Don&apos;t have an account?{' '}
          <Link to="/register" style={styles.link}>Register</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
