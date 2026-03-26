<script setup lang="ts">
import type { Blog } from '../mockData/blogs';
import { Pencil, Trash2 } from 'lucide-vue-next';

const { blogs } = defineProps<{ blogs: Blog[] }>()
const emit = defineEmits<{ (e: 'delete', id: number): void }>()

const handleDelete = (id: number) => {
  emit('delete', id)
}
</script>

<template>
  <div class="bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg shadow-black/20 border border-white/15 overflow-hidden">
    <table class="min-w-full">
      <thead class="bg-white/5">
        <tr>
          <th class="py-4 px-6 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">Title</th>
          <th class="py-4 px-6 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">Status</th>
          <th class="py-4 px-6 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">Created At</th>
          <th class="py-4 px-6 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-white/10">
        <tr v-for="blog in blogs" :key="blog.id" class="hover:bg-white/5 transition-colors duration-200">
          <td class="py-4 px-6">
            <router-link 
              class="text-white font-medium hover:text-indigo-300 transition-colors line-clamp-1" 
              :to="`/blogdetail/${blog.id}`"
            >
              {{ blog.title }}
            </router-link>
          </td>
          <td class="py-4 px-6">
            <span 
              :class="[
                'px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ring-1',
                blog.status === 'public' 
                  ? 'bg-emerald-400/20 text-emerald-200 ring-emerald-400/30' 
                  : 'bg-amber-400/20 text-amber-200 ring-amber-400/30'
              ]"
            >
              {{ blog.status }}
            </span>
          </td>
          <td class="py-4 px-6 text-sm text-white/50">{{ blog.createdAt }}</td>
          <td class="py-4 px-6">
            <div class="flex items-center gap-2">
              <router-link 
                :to="`/edit/${blog.id}`" 
                class="flex items-center gap-1.5 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-200 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
              >
                <Pencil class="w-4 h-4" />
                Edit
              </router-link>
              <button 
                @click="handleDelete(blog.id)" 
                class="flex items-center gap-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer"
              >
                <Trash2 class="w-4 h-4" />
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