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
    <nav class="bg-white border-b border-gray-200 shadow-sm">
        <div class="container mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
                <router-link to="/">
                    <img :src="Logo" alt="Logo" class="rounded-full shadow-md shadow-green-300 hover:scale-110 hover:shadow-green-500 transition-all duration-300"/>
                </router-link>
                
                <div v-if="!isLoggedIn" class="flex items-center gap-3">
                    <router-link 
                        to="/login" 
                        class="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-all shadow-sm shadow-indigo-200"
                    >
                        Sign In
                    </router-link>
                    <router-link 
                        to="/register" 
                        class="px-5 py-2.5 rounded-xl border-2 border-gray-200 text-gray-700 font-medium hover:border-indigo-200 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all"
                    >
                        Sign Up
                    </router-link>
                </div>
                
                <div v-else class="flex items-center gap-3">
                    <router-link 
                        to="/blog" 
                        :class="[
                            'flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all',
                            $route.path === '/blog' 
                                ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' 
                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        ]"
                    >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                        </svg>
                        Blog
                    </router-link>
                    <button 
                        @click="handleLogout" 
                        class="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-50 text-rose-600 font-medium hover:bg-rose-100 transition-all"
                    >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                        </svg>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    </nav>
</template>