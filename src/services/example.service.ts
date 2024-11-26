import { NextFunction, Request, Response } from 'express';
import { catchAsync } from 'util/catchAsync.ts';
import prisma from 'util/prismaClient.ts';
import bcrypt from 'bcryptjs';

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        password: req.body.password,
        name: req.body.password,
      },
    });
    res.status(200).json({
      message: 'good',
      user,
    });
  }
);

const getUser = catchAsync(async () => {
  const enteredPassword = 'a'; // Replace with the actual plain password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(enteredPassword, salt);
  console.log(hashedPassword);

  const isMatch = await bcrypt.compare(enteredPassword, hashedPassword);
  console.log('Password Match:', isMatch); // Should print 'true' if enteredPassword is correct
});
export { createUser, getUser };
