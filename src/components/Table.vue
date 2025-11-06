<script setup lang="ts">
import type { Blog } from '../mockData/blogs';

const { blogs } = defineProps<{ blogs: Blog[] }>()
const emit = defineEmits<{ (e: 'delete', id: number): void }>()

const handleDelete = (id: number) => {
  emit('delete', id)
}
</script>

<template>
  <table class="min-w-full border border-gray-200">
    <thead class="bg-gray-100">
      <tr>
        <th class="py-2 px-4 text-left">Title</th>
        <th class="py-2 px-4 text-left">Status</th>
        <th class="py-2 px-4 text-left">Created At</th>
        <th class="py-2 px-4 text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="blog in blogs" :key="blog.id" class="border-t">
        <td><router-link class="py-2 px-4 rounded-lg hover:bg-blue-200 cursor-pointer" :to="`/blogdetail/${blog.id}`">{{ blog.title }}</router-link></td>
        <td class="py-2 px-4" :class="blog?.status === 'public' ? 'text-green-600 font-semibold' : 'text-orange-800 font-semibold'">{{ blog.status }}</td>
        <td class="py-2 px-4">{{ blog.createdAt }}</td>
        <td class="py-2 px-4 flex gap-3">
          <router-link :to="`/edit/${blog.id}`" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium transition">Edit</router-link>
          <button @click="handleDelete(blog.id)" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium transition">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>