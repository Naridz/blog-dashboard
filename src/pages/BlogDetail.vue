<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getBlogs, type Blog } from '../mockData/blogs';
import { ArrowLeft, Calendar, AlertCircle, Pencil } from 'lucide-vue-next';

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
        <router-link to="/blog" class="inline-flex items-center gap-2 mb-8 px-5 py-2.5 rounded-xl font-medium bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 hover:bg-white/20 hover:border-white/30 transition-all shadow-lg shadow-black/20">
          <ArrowLeft class="w-4 h-4" />
          Back to Blog
        </router-link>
        
        <div v-if="error" class="bg-rose-500/10 border border-rose-400/20 text-rose-200 py-3 px-4 rounded-xl mb-4 flex items-center gap-2 backdrop-blur-sm">
          <AlertCircle class="w-5 h-5" />
          {{ error }}
        </div>
        
        <div v-else class="bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg shadow-black/20 border border-white/15 overflow-hidden">
          <div class="p-8">
            <div class="flex items-start justify-between mb-6">
              <span 
                :class="[
                  'px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide ring-1',
                  blog?.status === 'public' 
                    ? 'bg-emerald-400/20 text-emerald-200 ring-emerald-400/30' 
                    : 'bg-amber-400/20 text-amber-200 ring-amber-400/30'
                ]"
              >
                {{ blog?.status }}
              </span>
              <span class="text-white/50 text-sm flex items-center gap-1.5">
                <Calendar class="w-4 h-4" />
                {{ blog?.createdAt }}
              </span>
            </div>
            
            <h1 class="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight tracking-tight">{{ blog?.title }}</h1>
            
            <div class="max-w-none">
              <p class="text-white/70 text-lg leading-relaxed whitespace-pre-line">{{ blog?.content }}</p>
            </div>
          </div>
          
          <div class="bg-white/5 px-8 py-4 border-t border-white/10 flex items-center justify-between">
            <span class="text-white/50 text-sm">Blog Post #{{ blog?.id }}</span>
            <div class="flex gap-3">
              <router-link 
                :to="`/edit/${blog?.id}`" 
                class="flex items-center gap-2 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <Pencil class="w-4 h-4" />
                Edit
              </router-link>
            </div>
          </div>
        </div>
      </div>
</template>