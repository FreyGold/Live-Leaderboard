import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

const prisma = new PrismaClient().$extends(withAccelerate()).$extends({
  query: {
    user: {
      async $allOperations({ model, operation, args, query }) {
        if (
          (operation === 'create' ||
            (operation === 'update' && args.data.password)) &&
          typeof args.data.password === 'string'
        ) {
          const salt = await bcrypt.genSalt(10);
          args.data.password = await bcrypt.hash(args.data.password, salt);
        }
        return query(args);
      },
    },
  },
});

export default prisma;
