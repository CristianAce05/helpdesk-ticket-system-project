require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const ticketRoutes = require('./routes/tickets');
const commentRoutes = require('./routes/comments');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/tickets/:ticketId/comments', commentRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Help Desk Ticket System API running' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
