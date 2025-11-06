<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { Blog } from '../mockData/blogs';

const props = defineProps< {blog: Blog }>()
const emit = defineEmits<{ (e: 'delete', id: number): void }>()

const handleDelete = () => {
  emit('delete', props.blog.id);
};

</script>

<template>
  <div class="border-2 bg-white rounded-xl p-4 flex flex-col justify-between min-h-[250px] shadow-md">
    <router-link
      :to="`/blogdetail/${props.blog.id}`"
      class="text-2xl sm:text-3xl font-semibold p-2 mb-2 rounded-lg hover:bg-gray-200 transition">
      {{ props.blog.title }}
    </router-link>

    <hr class="my-2" />
    <p class="my-3 line-clamp-3">{{ props.blog.content }}</p>
    <hr class="my-2" />

    <div class="flex justify-between items-center text-sm text-gray-600 mt-2">
      <div class="flex flex-col sm:flex-row gap-2">
        <span>Status: <span :class="props.blog?.status === 'public' ? 'text-green-500 font-semibold' : 'text-orange-800 font-semibold'">{{ props.blog.status }}</span></span>
        <span>Created at: <span class="font-medium">{{ props.blog.createdAt }}</span></span>
      </div>
      <div class="flex gap-3">
        <router-link :to="`/edit/${props.blog.id}`" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium transition">
          Edit
        </router-link>
        <button @click="handleDelete" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium transition">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>