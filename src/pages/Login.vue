<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../auth';
import type { User } from '../auth';

const username = ref<string>('')
const password = ref<string>('')
const error = ref('')
const router = useRouter();

const handleLogin = (e:Event) =>{
  e.preventDefault();

  if (!username.value || !password.value) {
    error.value = "Complete all your inputs"
    return
  }

  const users:User[] = JSON.parse(localStorage.getItem('users') || '[]')
  const user = users.find((u) => u.username === username.value && u.password === password.value )

  if (!user) {
    error.value = 'Invalid username or password'
    return
  }
  
  login(user)
  alert("Login success")
  router.push('/blog')
}
</script>

<template>
    <div class="flex flex-col items-center">
        <div class="w-[400px] bg-white shadow-xl p-10 mt-5 rounded-xl border border-slate-300">
          <h3 class="text-2xl font-semibold ">Login</h3>
          <hr class="my-4 text-gray-200" />
          <form @submit="handleLogin">

            <div v-if="error" class="bg-red-600 w-fit text-white text-sm py-1 px-3 mt-2 rounded-md">
              {{error}}
            </div>
            
            <input
              type="text"
              v-model="username"
              class="w-full bg-gray-200 py-2 px-3 rounded text-lg my-2"
              placeholder="Enter your username"
            />
            <input
              type="password"
              v-model="password"
              class="w-full bg-gray-200 py-2 px-3 rounded text-lg my-2"
              placeholder="Enter your password"
            />
            <button
              type="submit"
              class="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-3 my-3 rounded-lg text-lg font-medium shadow-md hover:shadow-lg transition-all"
            >
              Sign In
            </button>
            <hr class="my-4 text-gray-200" />
            <p class="text-center">
                Don’t have an account?
              <router-link class="text-blue-600 hover:underline font-medium" to="/register">
                Register
              </router-link>
            </p>
          </form>
        </div>
    </div>
</template>