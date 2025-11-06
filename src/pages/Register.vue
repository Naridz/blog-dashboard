<script setup lang="ts">
import { ref } from 'vue';
import type { User } from '../auth';

const username = ref<string>('')
const password = ref<string>('')
const confirmPassword = ref<string>('')
const success = ref('')
const error = ref('')

const handleRegister = (e:Event) => {
  e.preventDefault();

  if (!username.value || !password.value || !confirmPassword.value) {
    success.value = ""
    error.value = "Complete all your inputs"
    return
  }

  if (password.value !== confirmPassword.value) {
    success.value = ""
    error.value = "Password not match"
    return
  }
  const users:User[] = JSON.parse(localStorage.getItem('users') || '[]')

  if (users.find(u => u.username === username.value)) {
    error.value = 'Username already exists'
    return
  }

  users.push({ username: username.value, password: password.value })
  localStorage.setItem('users', JSON.stringify(users))

  success.value = "Registered successfully"
  error.value = ''
  username.value = ''
  password.value = ''
  confirmPassword.value = ''
}
</script>

<template>
    <div class="flex flex-col items-center">
        <div class="w-[400px] bg-white shadow-xl p-10 mt-5 rounded-xl border border-slate-300">
          <h3 class="text-2xl font-semibold ">Register</h3>
          <hr class="my-4 text-gray-200" />
          <form @submit="handleRegister">
            
            <div v-if="error" class="bg-red-600 w-fit text-white text-sm py-1 px-3 mt-2 rounded-md">
              {{error}}
            </div>

            <div v-else-if="success" class="bg-green-600 w-fit text-white text-sm py-1 px-3 mt-2 rounded-md">
              {{success}}
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
            <input
              type="password"
              v-model="confirmPassword"
              class="w-full bg-gray-200 py-2 px-3 rounded text-lg my-2"
              placeholder="Confirm your password"
            />
            <button
              type="submit"
              class="w-full border border-emerald-500 text-emerald-600 font-medium hover:bg-emerald-100 py-2 px-3 my-3 rounded-lg text-lg font-medium shadow-md hover:shadow-lg transition-all"
            >
              Sign Up
            </button>
            <hr class="my-4 text-gray-200" />
            <p class="text-center">
                Already have an account?
              <router-link class="text-blue-600 hover:underline font-medium" to="/login">
                Login
              </router-link>
            </p>
          </form>
        </div>
    </div>
</template>