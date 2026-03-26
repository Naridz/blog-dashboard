<script setup lang="ts">
import type { Blog } from '../mockData/blogs';
import { Pencil, Trash2 } from 'lucide-vue-next';

const props = defineProps< {blog: Blog }>()
const emit = defineEmits<{ (e: 'delete', id: number): void }>()

const handleDelete = () => {
  emit('delete', props.blog.id);
};

</script>

<template>
  <div class="group bg-white/10 backdrop-blur-sm rounded-2xl p-5 flex flex-col justify-between min-h-[280px] shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 transition-all duration-300 border border-white/15 hover:border-white/25 hover:-translate-y-0.5">
    <div>
      <div class="flex items-start justify-between mb-4">
        <span 
          :class="[
            'px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ring-1',
            props.blog.status === 'public' 
              ? 'bg-emerald-400/20 text-emerald-200 ring-emerald-400/30' 
              : 'bg-amber-400/20 text-amber-200 ring-amber-400/30'
          ]"
        >
          {{ props.blog.status }}
        </span>
        <span class="text-white/50 text-xs">{{ props.blog.createdAt }}</span>
      </div>
      
      <router-link
        :to="`/blogdetail/${props.blog.id}`"
        class="block text-xl font-bold text-white mb-3 line-clamp-2 hover:text-indigo-300 transition-colors leading-tight"
      >
        {{ props.blog.title }}
      </router-link>
      
      <p class="text-white/70 text-sm leading-relaxed line-clamp-4">{{ props.blog.content }}</p>
    </div>

    <div class="flex items-center justify-between pt-4 mt-4 border-t border-white/10">
      <div class="flex gap-2">
        <router-link 
          :to="`/edit/${props.blog.id}`" 
          class="flex items-center gap-1.5 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Pencil class="w-4 h-4" />
          Edit
        </router-link>
        <button 
          @click="handleDelete" 
          class="flex items-center gap-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
        >
          <Trash2 class="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {};
</script>