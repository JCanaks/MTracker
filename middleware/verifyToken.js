import jwt from 'jsonwebtoken';

export default function (req, res, next) {
  try {
    const jwtDecoded = jwt.verify(req.body.token, process.env.JWT_SECRET_KEY);
    req.userData = jwtDecoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Authentication Failed',
    });
  }
}

