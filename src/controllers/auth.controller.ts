import { UserDto, UserSignupDto } from 'dtos/user.dto.ts';
import { Request, Response } from 'express';
import { generateToken } from 'util/auth.ts';
import { catchAsync } from 'util/catchAsync.ts';
import bcrypt from 'bcryptjs';
import prisma from 'util/prismaClient.ts';

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const data: UserSignupDto = req.body;
  if (!data) {
    return res
      .status(400)
      .json({ message: 'The required data for signup is missing' });
  }

  const userExists = await prisma.user.findUnique({
    where: { email: data.email },
    select: {
      id: true,
      email: true,
      password: true,
    },
  });

  if (userExists) {
    return res.status(400).json({ message: 'The user already exists' });
  }

  const user = await prisma.user.create({ data });

  generateToken(res, user.id);

  res.status(201).json({
    message: 'Success',
    id: user.id,
    name: user.name,
    email: user.email,
  });
});
const authenticateUser = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
    },
  });

  if (!user) {
    return res
      .status(400)
      .json({ status: 'fail', message: "This User doesn't exist" });
  }

  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) {
    return res
      .status(400)
      .json({ status: 'fail', message: 'Wrong email or password' });
  }

  generateToken(res, user.id);
  res.status(201).json({
    id: user.id,
    name: user.name,
    email: user.email,
  });
});

const logoutUser = catchAsync(async (req: Request, res: Response) => {});

export { registerUser, authenticateUser, logoutUser };
