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
  <div class="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
    <!-- Blurred blobs for depth -->
    <div class="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
    <div class="absolute bottom-1/4 left-1/4 w-96 h-96 bg-violet-400/15 rounded-full blur-3xl" />
    
    <div class="w-full max-w-md relative z-10">
      <div class="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/30 border border-white/15 overflow-hidden">
        <div class="bg-gradient-to-r from-white/15 to-white/5 p-6 text-white border-b border-white/10">
          <h1 class="text-2xl font-bold tracking-tight">Create Account</h1>
          <p class="text-white/70 mt-1">Join us and start your journey</p>
        </div>
        
        <div class="p-6">
          <form @submit="handleRegister" class="space-y-4">
            <div v-if="error" class="flex items-center gap-2 bg-red-500/10 text-red-200 px-4 py-3 rounded-lg text-sm border border-red-400/20 backdrop-blur-sm">
              <AlertCircle class="w-4 h-4 flex-shrink-0" />
              <span>{{ error }}</span>
            </div>

            <div v-else-if="success" class="flex items-center gap-2 bg-emerald-500/10 text-emerald-200 px-4 py-3 rounded-lg text-sm border border-emerald-400/20 backdrop-blur-sm">
              <CheckCircle class="w-4 h-4 flex-shrink-0" />
              <span>{{ success }}</span>
            </div>

            <div class="space-y-1">
              <label class="text-sm font-medium text-white/80">Username</label>
              <div class="relative group">
                <UserIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 group-focus-within:text-violet-300 transition-colors" />
                <input
                  v-model="username"
                  type="text"
                  class="w-full pl-10 pr-4 py-3 bg-white/10 ring-1 ring-white/15 hover:ring-white/25 text-white placeholder:text-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400/40 focus:border-transparent transition-all"
                  placeholder="Choose a username"
                />
              </div>
            </div>

            <div class="space-y-1">
              <label class="text-sm font-medium text-white/80">Password</label>
              <div class="relative group">
                <Lock class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 group-focus-within:text-violet-300 transition-colors" />
                <input
                  v-model="password"
                  type="password"
                  class="w-full pl-10 pr-4 py-3 bg-white/10 ring-1 ring-white/15 hover:ring-white/25 text-white placeholder:text-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400/40 focus:border-transparent transition-all"
                  placeholder="Create a password"
                />
              </div>
            </div>

            <div class="space-y-1">
              <label class="text-sm font-medium text-white/80">Confirm Password</label>
              <div class="relative group">
                <KeyRound class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 group-focus-within:text-violet-300 transition-colors" />
                <input
                  v-model="confirmPassword"
                  type="password"
                  class="w-full pl-10 pr-4 py-3 bg-white/10 ring-1 ring-white/15 hover:ring-white/25 text-white placeholder:text-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400/40 focus:border-transparent transition-all"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              class="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-400/80 to-indigo-400/80 hover:from-violet-400 hover:to-indigo-400 disabled:opacity-50 text-white py-3 px-4 rounded-lg font-medium shadow-lg shadow-black/20 ring-1 ring-white/20 transition-all disabled:cursor-not-allowed active:scale-[0.99]"
            >
              <UserPlus v-if="!isLoading" class="w-5 h-5" />
              <span v-if="isLoading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              <span>{{ isLoading ? 'Creating account...' : 'Sign Up' }}</span>
            </button>
          </form>

          <div class="mt-6 pt-6 border-t border-white/10">
            <p class="text-center text-white/60 text-sm">
              Already have an account?
              <router-link class="text-violet-300 hover:text-violet-200 font-medium ml-1 transition-colors" to="/login">
                Sign in
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>