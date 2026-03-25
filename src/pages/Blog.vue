<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { getBlogs, saveBlogs } from '../mockData/blogs';
import Card from '../components/Card.vue';
import Table from '../components/Table.vue';
import type { Blog } from '../mockData/blogs';

const allBlog = ref<Blog[]>([])
const searchKeyword = ref<string>('')
const statusBlog = ref<'all' | 'public'| 'unpublic'>('all')
const switchMode = ref<'card' | 'table'>('card')
const success = ref('')

onMounted(() => {
  allBlog.value = getBlogs()
})

const filteredBlogs = computed(() => {
  return allBlog.value.filter((b) => {
    const query = searchKeyword.value.toLowerCase()
    const matchSearch = b.title.toLowerCase().includes(query) || b.content.toLowerCase().includes(query)
    const matchStatus = statusBlog.value === 'all' || b.status === statusBlog.value
    return matchSearch && matchStatus
  })
})

const clearSearch = () => {
  searchKeyword.value = ''
}

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
    <div class="container mx-auto p-6">
        <!-- Header -->
        <div class="mb-8">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Blog Posts</h1>
              <p class="text-gray-500 mt-1">Manage and organize your blog content</p>
            </div>
            <router-link 
              to="/create" 
              class="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-5 rounded-xl font-medium transition-all shadow-sm shadow-indigo-200"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              Create New Post
            </router-link>
          </div>
          
          <!-- Toolbar -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
            <div class="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <!-- Search -->
              <div class="relative flex-1 lg:w-80">
                <svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                <input
                  type="text"
                  v-model="searchKeyword"
                  placeholder="Search posts..."
                  class="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-10 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
                <button
                  v-if="searchKeyword"
                  @click="clearSearch"
                  type="button"
                  class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-500 transition-colors"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
              
              <div class="flex items-center gap-3 w-full lg:w-auto">
                <!-- View Toggle -->
                <div class="flex gap-1 bg-gray-100 rounded-xl p-1">
                  <button 
                    @click="switchMode = 'card'" 
                    :class="['flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all', switchMode === 'card' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-600 hover:text-gray-900']"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                    </svg>
                    Card
                  </button>
                  <button 
                    @click="switchMode = 'table'" 
                    :class="['flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all', switchMode === 'table' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-600 hover:text-gray-900']"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7-4h14M4 6h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z"/>
                    </svg>
                    Table
                  </button>
                </div>
                
                <!-- Status Filter -->
                <div class="flex gap-1 bg-gray-100 rounded-xl p-1">
                  <button 
                    @click="statusBlog = 'all'"
                    :class="['px-4 py-2 rounded-lg font-medium text-sm transition-all', statusBlog === 'all' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900']"
                  >
                    All
                  </button>
                  <button 
                    @click="statusBlog = 'public'"
                    :class="['px-4 py-2 rounded-lg font-medium text-sm transition-all', statusBlog === 'public' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-600 hover:text-gray-900']"
                  >
                    Public
                  </button>
                  <button 
                    @click="statusBlog = 'unpublic'"
                    :class="['px-4 py-2 rounded-lg font-medium text-sm transition-all', statusBlog === 'unpublic' ? 'bg-white text-amber-600 shadow-sm' : 'text-gray-600 hover:text-gray-900']"
                  >
                    Unpublic
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Success Message -->
        <div v-if="success" class="bg-emerald-50 border border-emerald-200 text-emerald-700 py-3 px-4 rounded-xl mb-6 flex items-center gap-2 max-w-md">
          <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
          {{success}}
        </div>
        
        <!-- Empty State -->
        <div v-if="filteredBlogs.length === 0" class="text-center py-16">
          <div class="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-1">No blogs found</h3>
          <p class="text-gray-500">Try adjusting your search or filters</p>
        </div>
        
        <!-- Content -->
        <div v-else>
          <div v-if="switchMode === 'card'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </div>   
</template>