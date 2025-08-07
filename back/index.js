import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 3000;
const SECRET = 'supersecretkey';

app.use(cors());
app.use(bodyParser.json());

const FAKE_USER = {
  id: 1,
  username: 'username',
  password: 'password', // ne jamais stocker en clair en prod !
  email: 'username@example.com',
  role: 'user'
};

// Simule une base de sessions
const activeTokens = new Set();

// Login
app.post('/sessions/login', (req, res) => {
  const { username, password } = req.body;

  if (username === FAKE_USER.username && password === FAKE_USER.password) {
    const token = jwt.sign({ id: FAKE_USER.id }, SECRET, { expiresIn: '1h' });
    activeTokens.add(token);
    res.json({
      token,
      user: FAKE_USER
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Middleware d'auth
function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];

  if (!token || !activeTokens.has(token)) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// GET /sessions/me
app.get('/sessions/me', authenticate, (req, res) => {
  res.json(FAKE_USER);
});

// GET /sessions/logout
app.get('/sessions/logout', authenticate, (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader.split(' ')[1];
  activeTokens.delete(token);
  res.json({ message: 'Logged out' });
});

app.listen(PORT, () => {
  console.log(`Auth backend listening on http://localhost:${PORT}`);
});