<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../auth';
import type { User } from '../auth';
import { User as UserIcon, Lock, LogIn, AlertCircle } from 'lucide-vue-next'

const username = ref<string>('')
const password = ref<string>('')
const error = ref('')
const isLoading = ref(false)
const router = useRouter();

const handleLogin = async (e:Event) =>{
  e.preventDefault();
  error.value = ''

  if (!username.value || !password.value) {
    error.value = "Please complete all fields"
    return
  }

  isLoading.value = true
  
  await new Promise(resolve => setTimeout(resolve, 500))

  const users:User[] = JSON.parse(localStorage.getItem('users') || '[]')
  const user = users.find((u) => u.username === username.value && u.password === password.value )

  if (!user) {
    error.value = 'Invalid username or password'
    isLoading.value = false
    return
  }
  
  login(user)
  router.push('/blog')
}
</script>

<template>
  <div class="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
    <!-- Blurred blobs for depth -->
    <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
    <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-400/15 rounded-full blur-3xl" />
    
    <div class="w-full max-w-md relative z-10">
      <div class="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/30 border border-white/15 overflow-hidden">
        <div class="bg-gradient-to-r from-white/15 to-white/5 p-6 text-white border-b border-white/10">
          <h1 class="text-2xl font-bold tracking-tight">Welcome Back</h1>
          <p class="text-white/70 mt-1">Sign in to your account</p>
        </div>
        
        <div class="p-6">
          <form @submit="handleLogin" class="space-y-4">
            <div v-if="error" class="flex items-center gap-2 bg-red-500/10 text-red-200 px-4 py-3 rounded-lg text-sm border border-red-400/20 backdrop-blur-sm">
              <AlertCircle class="w-4 h-4 flex-shrink-0" />
              <span>{{ error }}</span>
            </div>
            
            <div class="space-y-1">
              <label class="text-sm font-medium text-white/80">Username</label>
              <div class="relative group">
                <UserIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 group-focus-within:text-sky-300 transition-colors" />
                <input
                  v-model="username"
                  type="text"
                  class="w-full pl-10 pr-4 py-3 bg-white/10 ring-1 ring-white/15 hover:ring-white/25 text-white placeholder:text-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400/40 focus:border-transparent transition-all"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div class="space-y-1">
              <label class="text-sm font-medium text-white/80">Password</label>
              <div class="relative group">
                <Lock class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 group-focus-within:text-sky-300 transition-colors" />
                <input
                  v-model="password"
                  type="password"
                  class="w-full pl-10 pr-4 py-3 bg-white/10 ring-1 ring-white/15 hover:ring-white/25 text-white placeholder:text-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400/40 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              class="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-sky-400/80 to-indigo-400/80 hover:from-sky-400 hover:to-indigo-400 disabled:opacity-50 text-white py-3 px-4 rounded-lg font-medium shadow-lg shadow-black/20 ring-1 ring-white/20 transition-all disabled:cursor-not-allowed active:scale-[0.99]"
            >
              <LogIn v-if="!isLoading" class="w-5 h-5" />
              <span v-if="isLoading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              <span>{{ isLoading ? 'Signing in...' : 'Sign In' }}</span>
            </button>
          </form>

          <div class="mt-6 pt-6 border-t border-white/10">
            <p class="text-center text-white/60 text-sm">
              Don't have an account?
              <router-link class="text-sky-300 hover:text-sky-200 font-medium ml-1 transition-colors" to="/register">
                Register
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>