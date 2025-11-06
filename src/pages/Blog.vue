<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { getBlogs, saveBlogs } from '../mockData/blogs';
import Card from '../components/Card.vue';
import Table from '../components/Table.vue';
import type { Blog } from '../mockData/blogs';

const allBlog = ref<Blog[]>([])
const searchBlog = ref<string>('')
const searchKeyword = ref<string>('')
const statusBlog = ref<'all' | 'public'| 'unpublic'>('all')
const switchMode = ref<'card' | 'table'>('card')
const success = ref('')

onMounted(() => {
  allBlog.value = getBlogs()
})

const filteredBlogs = computed(() => {
  return allBlog.value.filter((b) => {
    const matchSearch = b.title.toLowerCase().includes(searchKeyword.value.toLowerCase())
    const matchStatus = statusBlog.value === 'all' || b.status === statusBlog.value
    return matchSearch && matchStatus
  })
})

const handleSearch = () => {
  searchKeyword.value = searchBlog.value;
  searchBlog.value = '';
};

const handleDelete = (id:number) => {
  if (confirm('Are you sure ?')) {
    allBlog.value = allBlog.value.filter((b) => b.id !== id)
    saveBlogs(allBlog.value)
    setTimeout(() => {
      success.value = ""
    },2500)
    success.value = "Blog Deleted Successfully !"
  }
}

</script>

<template>
    <div class="container mx-auto p-4">
        <div class="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <form @submit.prevent="handleSearch" class="mb-6 w-full sm:w-auto">
                <input
                type="text"
                v-model="searchBlog"
                placeholder="Search posts . . ."
                class="border border-gray-400 bg-white rounded-full py-2 px-3 mr-2 w-full sm:w-auto"
                />
                <button class="bg-stone-600 text-white my-2 py-2 px-4 rounded-full hover:bg-stone-800 transition">Search</button>
            </form>
            <ul class="flex gap-2 mb-4 bg-gray-100 rounded-full p-1 w-max">
              <li @click="switchMode = 'card'" :class="['px-4 py-2 rounded-full cursor-pointer transition-colors duration-200', switchMode === 'card' ? 'bg-teal-600 text-white' : 'text-gray-700 hover:bg-gray-200']">
                Card
              </li>
              <li @click="switchMode = 'table'" :class="['px-4 py-2 rounded-full cursor-pointer transition-colors duration-200', switchMode === 'table' ? 'bg-teal-600 text-white' : 'text-gray-700 hover:bg-gray-200']">
                Table
              </li>
            </ul>
            <div class="flex items-center gap-4 flex-col sm:flex-row">
                <div class="flex items-center gap-3 bg-white border border-gray-200 rounded-full px-4 py-2 w-full sm:w-auto shadow-sm">
                    <label class="text-gray-600 font-medium">Status:</label>
                    <div class="flex items-center gap-3">
                        <label class="flex items-center gap-1 cursor-pointer"><input type="radio" v-model="statusBlog" value="all"/><span>All</span></label>
                        <label class="flex items-center gap-1 cursor-pointer"><input type="radio" v-model="statusBlog" value="public" /><span>Public</span></label>
                        <label class="flex items-center gap-1 cursor-pointer"><input type="radio" v-model="statusBlog" value="unpublic"/><span>Unpublic</span></label>
                    </div>
                </div>
                <router-link to="/create" class="bg-sky-600 hover:bg-sky-700 text-white py-3 px-4 rounded-full transition w-full sm:w-auto text-center">Create New Blog</router-link>
            </div>
        </div>
        <div v-if="success" class="bg-green-600 text-center w-60 text-white py-2 px-4 rounded mb-4">{{success}}</div>
        <p v-if="filteredBlogs.length === 0" class="text-center text-gray-500 bg-gray-100 py-4 px-6 rounded-lg shadow-sm my-4">No blogs found.</p>
        
        <div v-if="switchMode === 'card'" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Card
          v-for="blog in filteredBlogs"
          :key="blog.id"
          :blog="blog"
          @delete="handleDelete"/>
        </div>
        
        <div v-else>
          <Table
          :blogs="filteredBlogs"
          @delete="handleDelete"/>
        </div>
      </div>   
</template>