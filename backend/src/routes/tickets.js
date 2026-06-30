const express = require('express');
const supabase = require('../config/supabase');
const { authenticateToken, requireRole } = require('../middleware/auth');

const router = express.Router();

router.use(authenticateToken);

// GET /tickets
router.get('/', async (req, res) => {
  let query = supabase.from('tickets').select('*');

  if (req.user.role === 'user') {
    query = query.eq('created_by', req.user.userId);
  }

  const { data, error } = await query;

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json({ tickets: data });
});

// POST /tickets
router.post('/', async (req, res) => {
  const { title, description, priority = 'medium' } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'title and description are required' });
  }

  const { data, error } = await supabase
    .from('tickets')
    .insert([{ title, description, priority, created_by: req.user.userId, status: 'open' }])
    .select()
    .single();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(201).json({ ticket: data });
});

// PUT /tickets/:id
router.put('/:id', requireRole('employee', 'admin'), async (req, res) => {
  const { status, priority, assigned_to } = req.body;

  const updates = { updated_at: new Date().toISOString() };
  if (status !== undefined) updates.status = status;
  if (priority !== undefined) updates.priority = priority;
  if (assigned_to !== undefined) updates.assigned_to = assigned_to;

  const { data, error } = await supabase
    .from('tickets')
    .update(updates)
    .eq('id', req.params.id)
    .select()
    .single();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json({ ticket: data });
});

// DELETE /tickets/:id
router.delete('/:id', requireRole('admin'), async (req, res) => {
  const { error } = await supabase
    .from('tickets')
    .delete()
    .eq('id', req.params.id);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(204).send();
});

module.exports = router;
