import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

const prisma = new PrismaClient({
  omit: {
    user: {
      password: true,
    },
  },
}).$extends(withAccelerate());

prisma.$extends({
  name: 'pre hook for encrypting user passwords',
  query: {
    user: {
      async $allOperations({ operation, args, query }) {
        if (
          operation == 'create' ||
          (operation == 'update' && args.data.password)
        ) {
          if (typeof args.data.password === 'string') {
            const salt = await bcrypt.genSalt(12);
            args.data.password = await bcrypt.hash(args.data.password, salt);
          }
          return query(args);
        }
      },
    },
  },
});
export default prisma;
