<script setup lang="ts">
import type { Blog } from '../mockData/blogs';

const props = defineProps< {blog: Blog }>()
const emit = defineEmits<{ (e: 'delete', id: number): void }>()

const handleDelete = () => {
  emit('delete', props.blog.id);
};

</script>

<template>
  <div class="group bg-white rounded-2xl p-5 flex flex-col justify-between min-h-[280px] shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 hover:-translate-y-1">
    <div>
      <div class="flex items-start justify-between mb-4">
        <span 
          :class="[
            'px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide',
            props.blog.status === 'public' 
              ? 'bg-emerald-100 text-emerald-700' 
              : 'bg-amber-100 text-amber-700'
          ]"
        >
          {{ props.blog.status }}
        </span>
        <span class="text-gray-400 text-xs">{{ props.blog.createdAt }}</span>
      </div>
      
      <router-link
        :to="`/blogdetail/${props.blog.id}`"
        class="block text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-indigo-600 transition-colors leading-tight"
      >
        {{ props.blog.title }}
      </router-link>
      
      <p class="text-gray-600 text-sm leading-relaxed line-clamp-4">{{ props.blog.content }}</p>
    </div>

    <div class="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
      <div class="flex gap-2">
        <router-link 
          :to="`/edit/${props.blog.id}`" 
          class="flex items-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
          </svg>
          Edit
        </router-link>
        <button 
          @click="handleDelete" 
          class="flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {};
</script>