import { PrismaClient } from "../generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const databaseUrl = process.env.DATABASE_URL!;

const url = new URL(databaseUrl);

const adapter = new PrismaMariaDb({
  host:     url.hostname,
  port:     Number(url.port),
  user:     decodeURIComponent(url.username),
  password: decodeURIComponent(url.password),
  database: url.pathname.slice(1),

  // Connection pool tuning.
  // Keep the ceiling high enough for concurrent Next.js API routes (admin
  // dashboard fires ~3 parallel queries per page load) while staying well
  // within the MariaDB server's max_connections budget.
  connectionLimit: 20,

  // Fail fast if the pool is exhausted rather than queuing indefinitely.
  // The mariadb driver calls this "acquireTimeout" (ms).
  acquireTimeout: 15_000,

  // Release idle connections after 60 s to avoid accumulating stale handles.
  idleTimeout: 60_000,

  // Validate the connection before returning it from the pool; recovers from
  // network blips without a server restart.
  pingTimeout: 5_000,
});

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

// Reuse the single client across hot-reloads in development to avoid
// spawning a new pool on every file change.
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;