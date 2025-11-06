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
    <div class="container mx-auto p-8">
        <router-link to="/blog" class="inline-block mb-6 px-4 py-3 rounded-full font-medium cursor-pointer bg-gradient-to-r shadow-lg transition from-slate-700 to-slate-900 text-white hover:from-slate-800 hover:to-slate-950">
        ← Back
        </router-link>
        <h1 class="text-2xl font-bold mb-4">Edit Post</h1>

        <form  @submit.prevent="handleSubmit">
          <div v-if="error" class="bg-red-600 text-white py-2 px-4 rounded mb-4">{{error}}</div>
          <div v-if="success" class="bg-green-600 text-white py-2 px-4 rounded mb-4">{{success}}</div>
        <input
          type="text"
          v-model="title"
          placeholder="Enter title"
          class="w-full bg-white/90 border border-gray-300 rounded-md py-2 px-3 mb-4"
        />

        <textarea
          placeholder="Write your content here..."
          v-model="content"
          class="w-full bg-white/90 border border-gray-300 rounded-md py-2 px-3 h-40 mb-4"
        />

        <div class="mb-4">
          <label class="mr-4 font-medium">Status:</label>
          <label class="mr-4"><input type="radio" v-model="status" value="public" /> Public</label>
          <label><input type="radio" v-model="status" value="unpublic" /> Unpublic</label>
        </div>
        <button type="submit" class="bg-sky-600 hover:bg-sky-700 text-white py-2 px-5 mt-2 rounded-md text-lg">
          Update
        </button>
      </form>
    </div>
</template>