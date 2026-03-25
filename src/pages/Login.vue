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
  <div class="flex justify-center p-4">
    <div class="w-full max-w-md">
      <div class="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <div class="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white">
          <h1 class="text-2xl font-bold">Welcome Back</h1>
          <p class="text-emerald-50 mt-1">Sign in to your account</p>
        </div>
        
        <div class="p-6">
          <form @submit="handleLogin" class="space-y-4">
            <div v-if="error" class="flex items-center gap-2 bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm border border-red-200">
              <AlertCircle class="w-4 h-4 flex-shrink-0" />
              <span>{{ error }}</span>
            </div>
            
            <div class="space-y-1">
              <label class="text-sm font-medium text-slate-700">Username</label>
              <div class="relative">
                <UserIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  v-model="username"
                  type="text"
                  class="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  placeholder="Enter your username"
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
                  class="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              class="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white py-3 px-4 rounded-lg font-medium shadow-md hover:shadow-lg transition-all disabled:cursor-not-allowed"
            >
              <LogIn v-if="!isLoading" class="w-5 h-5" />
              <span v-if="isLoading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              <span>{{ isLoading ? 'Signing in...' : 'Sign In' }}</span>
            </button>
          </form>

          <div class="mt-6 pt-6 border-t border-slate-100">
            <p class="text-center text-slate-600 text-sm">
              Don't have an account?
              <router-link class="text-emerald-600 hover:text-emerald-700 font-medium ml-1 transition-colors" to="/register">
                Register
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>