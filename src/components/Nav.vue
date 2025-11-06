<script setup>
import Logo from '../assets/vue.svg'
import { useRouter } from 'vue-router';
import { logout, isLoggedIn} from '../auth';

const router = useRouter()

const handleLogout = (e) => {
    e.preventDefault();
    logout()
    alert("Logout")
    router.push('/login')
}
</script>

<template>
    <nav class="bg-white text-slate-800 border-slate-300 shadow-md p-6">
        <ul class="flex justify-between container mx-auto">
            <li>
                <router-link to="/">
                    <img :src="Logo" alt="Logo" class="rounded-full shadow-md shadow-green-300 hover:scale-110 hover:shadow-green-500 transition-all duration-300"/>
                </router-link>
            </li>
            <li v-if="!isLoggedIn" class="flex gap-3 items-center">
                <router-link to="/login" class="px-5 py-2 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 active:scale-90 transition-all duration-200 shadow-sm">login</router-link>
                <router-link to="/register" class="px-5 py-2 rounded-lg border border-emerald-500 text-emerald-600 font-medium hover:bg-emerald-50 active:scale-90 transition-all duration-200">register</router-link>
            </li>
            <li v-else class="flex gap-3 items-center">
                <router-link to="/blog" class="px-5 py-2 rounded-lg bg-neutral-500 text-white font-medium hover:bg-neutral-600 active:scale-90 transition-all duration-200 shadow-sm">blog</router-link>
                <button @click="handleLogout" class="px-5 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 active:scale-90 transition-all duration-200 shadow-sm">log out</button>
            </li>
        </ul>
    </nav>
</template>