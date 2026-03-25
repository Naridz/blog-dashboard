<script setup lang="ts">
import type { Blog } from '../mockData/blogs';

const { blogs } = defineProps<{ blogs: Blog[] }>()
const emit = defineEmits<{ (e: 'delete', id: number): void }>()

const handleDelete = (id: number) => {
  emit('delete', id)
}
</script>

<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
    <table class="min-w-full">
      <thead class="bg-gray-50">
        <tr>
          <th class="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
          <th class="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
          <th class="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Created At</th>
          <th class="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100">
        <tr v-for="blog in blogs" :key="blog.id" class="hover:bg-gray-50/80 transition-colors duration-200">
          <td class="py-4 px-6">
            <router-link 
              class="text-gray-900 font-medium hover:text-indigo-600 transition-colors line-clamp-1" 
              :to="`/blogdetail/${blog.id}`"
            >
              {{ blog.title }}
            </router-link>
          </td>
          <td class="py-4 px-6">
            <span 
              :class="[
                'px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide',
                blog.status === 'public' 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : 'bg-amber-100 text-amber-700'
              ]"
            >
              {{ blog.status }}
            </span>
          </td>
          <td class="py-4 px-6 text-sm text-gray-500">{{ blog.createdAt }}</td>
          <td class="py-4 px-6">
            <div class="flex items-center gap-2">
              <router-link 
                :to="`/edit/${blog.id}`" 
                class="flex items-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
                Edit
              </router-link>
              <button 
                @click="handleDelete(blog.id)" 
                class="flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
                Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
export default {};
</script>