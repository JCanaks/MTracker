import jwt from 'jsonwebtoken';

export default function (req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const jwtDecoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userData = jwtDecoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Authentication Failed. Cannot Perform this action',
    });
  }
}

