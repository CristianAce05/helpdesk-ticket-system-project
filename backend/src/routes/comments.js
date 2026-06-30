const express = require('express');
const supabase = require('../config/supabase');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router.use(authenticateToken);

// GET /tickets/:ticketId/comments
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('comments')
    .select('*, users(name)')
    .eq('ticket_id', req.params.ticketId)
    .order('created_at', { ascending: true });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json({ comments: data });
});

// POST /tickets/:ticketId/comments
router.post('/', async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: 'content is required' });
  }

  const { data, error } = await supabase
    .from('comments')
    .insert([{ content, ticket_id: req.params.ticketId, user_id: req.user.userId }])
    .select('*, users(name)')
    .single();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(201).json({ comment: data });
});

module.exports = router;
