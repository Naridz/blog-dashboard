<script setup>
import Logo from '../assets/vue.svg'
import { useRouter } from 'vue-router';
import { logout, isLoggedIn } from '../auth';
import { LayoutGrid, LogOut } from 'lucide-vue-next';

const router = useRouter()

const handleLogout = (e) => {
    e.preventDefault();
    logout()
    alert("Logout")
    router.push('/login')
}
</script>

<template>
    <nav class="bg-white/10 backdrop-blur-md border-b border-white/15 sticky top-0 z-50">
        <div class="container mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
                <router-link to="/">
                    <img :src="Logo" alt="Logo" class="rounded-full shadow-md shadow-emerald-500/30 hover:scale-110 hover:shadow-emerald-400/50 transition-all duration-300"/>
                </router-link>
                
                <div v-if="!isLoggedIn" class="flex items-center gap-3">
                    <router-link 
                        to="/login" 
                        class="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/30"
                    >
                        Sign In
                    </router-link>
                    <router-link 
                        to="/register" 
                        class="px-5 py-2.5 rounded-xl border border-white/30 text-white/90 font-medium hover:border-indigo-400 hover:text-white hover:bg-indigo-500/20 transition-all"
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
                                ? 'bg-indigo-500/30 text-indigo-200 border border-indigo-400/40' 
                                : 'text-white/70 hover:bg-white/10 hover:text-white'
                        ]"
                    >
                        <LayoutGrid class="w-5 h-5" />
                        Blog
                    </router-link>
                    <button 
                        @click="handleLogout" 
                        class="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-500/20 text-rose-200 font-medium hover:bg-rose-500/30 transition-all"
                    >
                        <LogOut class="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    </nav>
</template>