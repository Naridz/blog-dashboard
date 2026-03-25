<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { User } from '../auth';
import { UserPlus, User as UserIcon, Lock, KeyRound, AlertCircle, CheckCircle } from 'lucide-vue-next'

const username = ref<string>('')
const password = ref<string>('')
const confirmPassword = ref<string>('')
const success = ref('')
const error = ref('')
const isLoading = ref(false)
const router = useRouter();

const handleRegister = async (e:Event) => {
  e.preventDefault();
  success.value = ''
  error.value = ''

  if (!username.value || !password.value || !confirmPassword.value) {
    error.value = "Please complete all fields"
    return
  }

  if (password.value !== confirmPassword.value) {
    error.value = "Passwords do not match"
    return
  }

  isLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 500))

  const users:User[] = JSON.parse(localStorage.getItem('users') || '[]')

  if (users.find(u => u.username === username.value)) {
    error.value = 'Username already exists'
    isLoading.value = false
    return
  }

  users.push({ username: username.value, password: password.value })
  localStorage.setItem('users', JSON.stringify(users))

  success.value = "Account created successfully!"
  error.value = ''
  username.value = ''
  password.value = ''
  confirmPassword.value = ''
  isLoading.value = false

  setTimeout(() => {
    router.push('/login')
  }, 1500)
}
</script>

<template>
  <div class="flex justify-center p-4">
    <div class="w-full max-w-md">
      <div class="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <div class="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
          <h1 class="text-2xl font-bold">Create Account</h1>
          <p class="text-blue-50 mt-1">Join us and start your journey</p>
        </div>
        
        <div class="p-6">
          <form @submit="handleRegister" class="space-y-4">
            <div v-if="error" class="flex items-center gap-2 bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm border border-red-200">
              <AlertCircle class="w-4 h-4 flex-shrink-0" />
              <span>{{ error }}</span>
            </div>

            <div v-else-if="success" class="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-3 rounded-lg text-sm border border-green-200">
              <CheckCircle class="w-4 h-4 flex-shrink-0" />
              <span>{{ success }}</span>
            </div>

            <div class="space-y-1">
              <label class="text-sm font-medium text-slate-700">Username</label>
              <div class="relative">
                <UserIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  v-model="username"
                  type="text"
                  class="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  placeholder="Choose a username"
                />
              </div>
            </div>

            <div class="space-y-1">
              <label class="text-sm font-medium text-slate-700">Password</label>
              <div class="relative">
                <Lock class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  v-model="password"
                  type="password"
                  class="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  placeholder="Create a password"
                />
              </div>
            </div>

            <div class="space-y-1">
              <label class="text-sm font-medium text-slate-700">Confirm Password</label>
              <div class="relative">
                <KeyRound class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  v-model="confirmPassword"
                  type="password"
                  class="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              class="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-4 rounded-lg font-medium shadow-md hover:shadow-lg transition-all disabled:cursor-not-allowed"
            >
              <UserPlus v-if="!isLoading" class="w-5 h-5" />
              <span v-if="isLoading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              <span>{{ isLoading ? 'Creating account...' : 'Sign Up' }}</span>
            </button>
          </form>

          <div class="mt-6 pt-6 border-t border-slate-100">
            <p class="text-center text-slate-600 text-sm">
              Already have an account?
              <router-link class="text-blue-600 hover:text-blue-700 font-medium ml-1 transition-colors" to="/login">
                Sign in
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>