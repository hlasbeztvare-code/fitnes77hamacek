// Prisma CLI v přítomnosti configu vyžaduje explicitní načtení .env
import 'dotenv/config'; 
import { defineConfig } from '@prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: (process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL) as string,
  },
});
