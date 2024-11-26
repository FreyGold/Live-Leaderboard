import prisma from 'util/prismaClient.ts';
import bcrypt from 'bcryptjs';

async function comparePassword(userEmail: string, enteredPassword: string) {
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const isMatch = await bcrypt.compare(enteredPassword, user.password);
  return isMatch;
}
