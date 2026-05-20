'use client'

import { createContext, useContext } from 'react'

export type AdminUser = { id: number; name: string | null; email: string; role: string }
export type AdminContextType = { user: AdminUser | null; logout: () => void }

export const AdminContext = createContext<AdminContextType>({ user: null, logout: () => {} })
export const useAdmin = () => useContext(AdminContext)
