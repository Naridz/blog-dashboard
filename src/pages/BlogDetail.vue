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
    <div class="container mx-auto p-8">
        <router-link to="/blog" class="inline-block mb-6 px-4 py-3 rounded-full font-medium cursor-pointer bg-gradient-to-r shadow-lg transition from-slate-700 to-slate-900 text-white hover:from-slate-800 hover:to-slate-950">
        ← Back
        </router-link>
        
        <div v-if="error" class="bg-red-600 text-white py-2 px-4 rounded mb-4">{{ error }}</div>
        <div v-else class="bg-white shadow-md rounded-lg p-6 border border-gray-200">
          <h1 class="text-3xl font-bold mb-2 text-gray-900">{{ blog?.title }}</h1>
          <div class="flex items-center mb-2 text-gray-500 text-sm">
            <span class="mr-2">Status:</span>
            <span :class="blog?.status === 'public' ? 'text-green-600 font-semibold' : 'text-orange-800 font-semibold'">
              {{ blog?.status }}
            </span>
            <span class="mx-3">|</span>
            <span>Created: {{ blog?.createdAt }}</span>
          </div>

          <hr class="mb-5"/>
          <p class="text-gray-700 text-lg leading-relaxed">{{ blog?.content }}</p>
        </div>
      </div>
</template>