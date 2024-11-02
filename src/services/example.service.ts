import { pool } from 'db.ts';
import { NextFunction, Request, Response } from 'express';

const exampleFunction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({
    message: 'good',
  });
};

const pgDbExample = async (req: Request, res: Response, next: NextFunction) => {
  const user = await pool.query(
    'Select email, password from users where id = 13'
  );
  const { email, password } = user.rows[0];
  res.status(200).json({
    message: 'doable',
    email: email,
    password: password,
  });
};

export { exampleFunction, pgDbExample };
