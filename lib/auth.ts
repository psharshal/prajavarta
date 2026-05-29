import bcrypt from 'bcryptjs'
import { SignJWT, jwtVerify } from 'jose'


const secret = new TextEncoder().encode(process.env.JWT_SECRET!)

export const AUTH_COOKIE_NAME = '_pv_at'
export const ADMIN_AUTH_COOKIE_NAME = '_pv_admin_at'
export const AUTHOR_AUTH_COOKIE_NAME = '_pv_author_at'

export interface JwtPayload {
  userId: number;
  email: string;
  role: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export async function generateToken(userId: number, email: string, role: string) {
  return await new SignJWT({userId, email, role})
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyToken(token: string):Promise<JwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret)
    return {
      userId: payload.userId as number,
      email: payload.email as string,
      role: payload.role as string,
    };
  } catch {
    return null
  }
}
