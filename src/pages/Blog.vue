<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { getBlogs, saveBlogs } from '../mockData/blogs';
import Card from '../components/Card.vue';
import Table from '../components/Table.vue';
import type { Blog } from '../mockData/blogs';
import { Plus, Search, X, LayoutGrid, Table as TableIcon, Layout, CheckCircle } from 'lucide-vue-next';

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
              <h1 class="text-2xl font-bold text-white">Blog Posts</h1>
              <p class="text-white/60 mt-1">Manage and organize your blog content</p>
            </div>
            <router-link 
              to="/create" 
              class="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-5 rounded-xl font-medium transition-all shadow-lg shadow-indigo-500/30"
            >
              <Plus class="w-5 h-5" />
              Create New Post
            </router-link>
          </div>
          
          <!-- Toolbar -->
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg shadow-black/20 border border-white/15 p-4">
            <div class="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <!-- Search -->
              <div class="relative flex-1 lg:w-80">
                <Search class="w-5 h-5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  v-model="searchKeyword"
                  placeholder="Search posts..."
                  class="w-full bg-white/10 border border-white/20 rounded-xl py-2.5 pl-10 pr-10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-transparent transition-all"
                />
                <button
                  v-if="searchKeyword"
                  @click="clearSearch"
                  type="button"
                  class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white/60 transition-colors"
                >
                  <X class="w-3 h-3" />
                </button>
              </div>
              
              <div class="flex items-center gap-3 w-full lg:w-auto">
                <!-- View Toggle -->
                <div class="flex gap-1 bg-white/10 rounded-xl p-1">
                  <button 
                    @click="switchMode = 'card'" 
                    :class="['flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all', switchMode === 'card' ? 'bg-white/20 text-white shadow-sm' : 'text-white/60 hover:text-white hover:bg-white/10']"
                  >
                    <LayoutGrid class="w-4 h-4" />
                    Card
                  </button>
                  <button 
                    @click="switchMode = 'table'" 
                    :class="['flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all', switchMode === 'table' ? 'bg-white/20 text-white shadow-sm' : 'text-white/60 hover:text-white hover:bg-white/10']"
                  >
                    <TableIcon class="w-4 h-4" />
                    Table
                  </button>
                </div>
                
                <!-- Status Filter -->
                <div class="flex gap-1 bg-white/10 rounded-xl p-1">
                  <button 
                    @click="statusBlog = 'all'"
                    :class="['px-4 py-2 rounded-lg font-medium text-sm transition-all', statusBlog === 'all' ? 'bg-white/20 text-white shadow-sm' : 'text-white/60 hover:text-white hover:bg-white/10']"
                  >
                    All
                  </button>
                  <button 
                    @click="statusBlog = 'public'"
                    :class="['px-4 py-2 rounded-lg font-medium text-sm transition-all', statusBlog === 'public' ? 'bg-white/20 text-emerald-300 shadow-sm' : 'text-white/60 hover:text-white hover:bg-white/10']"
                  >
                    Public
                  </button>
                  <button 
                    @click="statusBlog = 'unpublic'"
                    :class="['px-4 py-2 rounded-lg font-medium text-sm transition-all', statusBlog === 'unpublic' ? 'bg-white/20 text-amber-300 shadow-sm' : 'text-white/60 hover:text-white hover:bg-white/10']"
                  >
                    Unpublic
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Success Message -->
        <div v-if="success" class="bg-emerald-500/10 border border-emerald-400/20 text-emerald-200 py-3 px-4 rounded-xl mb-6 flex items-center gap-2 max-w-md backdrop-blur-sm">
          <CheckCircle class="w-5 h-5 flex-shrink-0" />
          {{success}}
        </div>
        
        <!-- Empty State -->
        <div v-if="filteredBlogs.length === 0" class="text-center py-16">
          <div class="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Layout class="w-8 h-8 text-white/40" />
          </div>
          <h3 class="text-lg font-medium text-white mb-1">No blogs found</h3>
          <p class="text-white/50">Try adjusting your search or filters</p>
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