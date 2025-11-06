import { ref } from 'vue'

export interface User {
  username: string
  password: string
}

export const isLoggedIn = ref(!!localStorage.getItem('loginUser'))

export const login = (user:User) => {
  localStorage.setItem('loginUser', JSON.stringify(user))
  isLoggedIn.value = true
}

export const logout = () => {
  localStorage.removeItem('loginUser')
  isLoggedIn.value = false
}