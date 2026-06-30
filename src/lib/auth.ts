import { supabase } from './supabase'

export interface User {
  id: string
  email: string
  full_name?: string
  user_type?: 'traveler' | 'chaliah'
  created_at: string
}

export interface AuthError {
  message: string
}

export async function signUp(email: string, password: string, fullName: string, userType: 'traveler' | 'chaliah') {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          user_type: userType
        }
      }
    })

    if (error) {
      return { error: { message: error.message } }
    }

    return { data }
  } catch (error) {
    return { error: { message: 'Une erreur inattendue s\'est produite' } }
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      return { error: { message: error.message } }
    }

    return { data }
  } catch (error) {
    return { error: { message: 'Une erreur inattendue s\'est produite' } }
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      return { error: { message: error.message } }
    }

    return { success: true }
  } catch (error) {
    return { error: { message: 'Une erreur inattendue s\'est produite' } }
  }
}

export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error) {
      return { error: { message: error.message } }
    }

    return { user }
  } catch (error) {
    return { error: { message: 'Une erreur inattendue s\'est produite' } }
  }
}

export async function resetPassword(email: string) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    
    if (error) {
      return { error: { message: error.message } }
    }

    return { success: true }
  } catch (error) {
    return { error: { message: 'Une erreur inattendue s\'est produite' } }
  }
}
