<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getBlogs, saveBlogs } from '../mockData/blogs';

const route = useRoute();
const blogId = Number(route.params.id);

const title = ref('');
const content = ref('');
const status = ref<'public' | 'unpublic'>('public');
const error = ref('');
const success = ref('');

onMounted(() => {
  const blogs = getBlogs();
  const blog = blogs.find(b => b.id === blogId);
  if (blog) {
    title.value = blog.title;
    content.value = blog.content;
    status.value = blog.status;
  } else {
    error.value = 'Blog not found';
  }
});

const handleSubmit = () => {
  if (!title.value || !content.value) {
    error.value = 'Complete all your inputs';
    success.value = '';
    return;
  }
  const blogs :any= getBlogs();
  const index = blogs.findIndex((b:any) => b.id === blogId);
  if (index !== -1) {
    blogs[index] = { ...blogs[index],
      title: title.value,
      content: content.value,
      status: status.value,
    };
    saveBlogs(blogs);
    error.value = '';
    success.value = 'Blog updated successfully';
  } else {
    error.value = 'Blog not found';
    success.value = '';
  }
};

</script>

<template>
    <div class="container mx-auto p-6 max-w-3xl">
        <router-link to="/blog" class="inline-flex items-center gap-2 mb-8 px-5 py-2.5 rounded-xl font-medium bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Back to Blog
        </router-link>
        
        <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div class="p-8">
            <div class="flex items-center gap-3 mb-8">
              <div class="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
              </div>
              <h1 class="text-2xl font-bold text-gray-900">Edit Post</h1>
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div v-if="error" class="bg-rose-50 border border-rose-200 text-rose-700 py-3 px-4 rounded-xl flex items-center gap-2">
                <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                {{error}}
              </div>
              
              <div v-if="success" class="bg-emerald-50 border border-emerald-200 text-emerald-700 py-3 px-4 rounded-xl flex items-center gap-2">
                <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                {{success}}
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  v-model="title"
                  placeholder="Enter title"
                  class="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea
                  placeholder="Write your content here..."
                  v-model="content"
                  rows="8"
                  class="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-3">Status</label>
                <div class="flex gap-4">
                  <label class="flex items-center gap-3 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all" :class="status === 'public' ? 'border-emerald-500 bg-emerald-50/50' : 'border-gray-200 hover:border-gray-300'">
                    <input type="radio" v-model="status" value="public" class="w-4 h-4 text-emerald-600 focus:ring-emerald-500" />
                    <div>
                      <span class="font-medium text-gray-900">Public</span>
                      <p class="text-xs text-gray-500">Visible to everyone</p>
                    </div>
                  </label>
                  <label class="flex items-center gap-3 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all" :class="status === 'unpublic' ? 'border-amber-500 bg-amber-50/50' : 'border-gray-200 hover:border-gray-300'">
                    <input type="radio" v-model="status" value="unpublic" class="w-4 h-4 text-amber-600 focus:ring-amber-500" />
                    <div>
                      <span class="font-medium text-gray-900">Unpublic</span>
                      <p class="text-xs text-gray-500">Only you can see</p>
                    </div>
                  </label>
                </div>
              </div>
              
              <div class="flex items-center gap-3 pt-4">
                <button type="submit" class="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors shadow-sm shadow-indigo-200">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  Save Changes
                </button>
                <router-link to="/blog" class="px-6 py-3 rounded-xl font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                  Cancel
                </router-link>
              </div>
            </form>
          </div>
        </div>
    </div>
</template>