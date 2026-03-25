<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getBlogs, type Blog } from '../mockData/blogs';

const route = useRoute();
const blogId = Number(route.params.id);

const blog = ref<Blog | null>(null);
const error = ref('');

onMounted(() => {
  const blogs = getBlogs();
  const found = blogs.find(b => b.id === blogId);
  if (found) {
    blog.value = found;
  } else {
    error.value = 'Blog not found';
  }
});
</script>

<template>
    <div class="container mx-auto p-6 max-w-4xl">
        <router-link to="/blog" class="inline-flex items-center gap-2 mb-8 px-5 py-2.5 rounded-xl font-medium bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Back to Blog
        </router-link>
        
        <div v-if="error" class="bg-rose-50 border border-rose-200 text-rose-700 py-3 px-4 rounded-xl mb-4 flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          {{ error }}
        </div>
        
        <div v-else class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div class="p-8">
            <div class="flex items-start justify-between mb-6">
              <span 
                :class="[
                  'px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide',
                  blog?.status === 'public' 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'bg-amber-100 text-amber-700'
                ]"
              >
                {{ blog?.status }}
              </span>
              <span class="text-gray-400 text-sm flex items-center gap-1.5">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                {{ blog?.createdAt }}
              </span>
            </div>
            
            <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">{{ blog?.title }}</h1>
            
            <div class="prose prose-gray max-w-none">
              <p class="text-gray-600 text-lg leading-relaxed whitespace-pre-line">{{ blog?.content }}</p>
            </div>
          </div>
          
          <div class="bg-gray-50 px-8 py-4 border-t border-gray-100 flex items-center justify-between">
            <span class="text-gray-500 text-sm">Blog Post #{{ blog?.id }}</span>
            <div class="flex gap-3">
              <router-link 
                :to="`/edit/${blog?.id}`" 
                class="flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
                Edit
              </router-link>
            </div>
          </div>
        </div>
      </div>
</template>