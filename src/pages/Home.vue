<template>
    <div class="container mx-auto py-16 px-6">
        <div class="text-center max-w-2xl mx-auto">
            <h1 class="text-5xl font-bold text-white mb-4 tracking-tight">Blog Management</h1>
            <p class="text-xl text-white/70 mb-8">Vue.js + Tailwind CSS</p>
            
            <div class="flex items-center justify-center gap-4">
                <router-link 
                    to="/login" 
                    class="px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/30"
                >
                    Get Started
                </router-link>
                <router-link 
                    to="/blog" 
                    class="px-6 py-3 rounded-xl border border-white/30 text-white/90 font-medium hover:border-indigo-400 hover:text-white hover:bg-indigo-500/20 transition-all"
                >
                    View Blogs
                </router-link>
            </div>
        </div>
    </div>
</template>