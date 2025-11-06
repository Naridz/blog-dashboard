<script setup lang="ts">
import { ref } from 'vue';
import { getBlogs, saveBlogs, type Blog } from '../mockData/blogs';

const title = ref('')
const content = ref('')
const status = ref<'public' | 'unpublic'>('public')
const error = ref('')
const success = ref('')

const handleSubmit = () => {
  if (!title.value || !content.value) {
    error.value = 'Complete all your inputs'
    success.value = ''
    return;
  }

  const blogs = getBlogs();
  const newBlog: Blog = {
    id: blogs.length ? Math.max(...blogs.map(b => b.id)) + 1 : 1,
    title: title.value,
    content: content.value,
    status: status.value,
    createdAt: new Date().toLocaleDateString()
  };
  
  blogs.push(newBlog);
  saveBlogs(blogs);
  error.value = ''
  success.value = 'Post Created Successfully'
  title.value = '';
  content.value = '';
  status.value = 'public';
}

</script>

<template>
    <div class="container mx-auto p-8">
        <router-link to="/blog" class="inline-block mb-6 px-4 py-3 rounded-full font-medium cursor-pointer bg-gradient-to-r shadow-lg transition from-slate-700 to-slate-900 text-white hover:from-slate-800 hover:to-slate-950">
        ← Back
        </router-link>
        <h1 class="text-2xl font-bold mb-4">Create New Post</h1>
        <div v-if="error" class="bg-red-600 text-white py-2 px-4 rounded mb-4">{{error}}</div>
        <div v-if="success" class="bg-green-600 text-white py-2 px-4 rounded mb-4">{{success}}</div>
        <form @submit.prevent="handleSubmit">
        <input
        type="text"
        v-model="title"
        placeholder="Enter title"
        class="w-full bg-white/90 border border-gray-300 rounded-md py-2 px-3 mb-4"
        />

        <textarea
        v-model="content"
        placeholder="Write your content here..."
        class="w-full bg-white/90 border border-gray-300 rounded-md py-2 px-3 h-40 mb-4"
        />
        
        <div class="mb-4">
          <label class="mr-4 font-medium">Status:</label>
          <label class="mr-4"><input type="radio" v-model="status" value="public" /> Public</label>
          <label><input type="radio" v-model="status" value="unpublic" /> Unpublic</label>
        </div>

        <button
          type="submit"
          class="bg-blue-600 shadow-md hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
          Create
        </button>
      </form>
    </div>
</template>