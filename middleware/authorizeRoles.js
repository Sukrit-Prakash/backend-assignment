function authorizeRoles(...allowed) {
    return (req, res, next) => {
      if (!allowed.includes(req.user.role)) return res.status(403).json({ error: 'Access denied' });
      next();
    };
  }
  module.exports = authorizeRoles;
  