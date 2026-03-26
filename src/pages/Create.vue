<script setup lang="ts">
import { ref } from 'vue';
import { getBlogs, saveBlogs, type Blog } from '../mockData/blogs';
import { ArrowLeft, Plus, AlertCircle, CheckCircle } from 'lucide-vue-next';

const title = ref('')
const content = ref('')
const status = ref<'public' | 'unpublic'>('public')
const error = ref('')
const success = ref('')

const handleSubmit = () => {
  if (!title.value || !content.value) {
    error.value = 'Complete all your inputs'
    success.value = ''
    return;
  }

  const blogs = getBlogs();
  const newBlog: Blog = {
    id: blogs.length ? Math.max(...blogs.map(b => b.id)) + 1 : 1,
    title: title.value,
    content: content.value,
    status: status.value,
    createdAt: new Date().toLocaleDateString()
  };
  
  blogs.push(newBlog);
  saveBlogs(blogs);
  error.value = ''
  success.value = 'Post Created Successfully'
  title.value = '';
  content.value = '';
  status.value = 'public';
}

</script>

<template>
    <div class="container mx-auto p-6 max-w-3xl">
        <router-link to="/blog" class="inline-flex items-center gap-2 mb-8 px-5 py-2.5 rounded-xl font-medium bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 hover:bg-white/20 hover:border-white/30 transition-all shadow-lg shadow-black/20">
          <ArrowLeft class="w-4 h-4" />
          Back to Blog
        </router-link>
        
        <div class="bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg shadow-black/20 border border-white/15 overflow-hidden">
          <div class="p-8">
            <div class="flex items-center gap-3 mb-8">
              <div class="w-10 h-10 rounded-xl bg-indigo-500/30 flex items-center justify-center">
                <Plus class="w-5 h-5 text-indigo-300" />
              </div>
              <h1 class="text-2xl font-bold text-white">Create New Post</h1>
            </div>
            
            <div v-if="error" class="bg-rose-500/10 border border-rose-400/20 text-rose-200 py-3 px-4 rounded-xl mb-6 flex items-center gap-2 backdrop-blur-sm">
              <AlertCircle class="w-5 h-5 flex-shrink-0" />
              {{error}}
            </div>
            
            <div v-if="success" class="bg-emerald-500/10 border border-emerald-400/20 text-emerald-200 py-3 px-4 rounded-xl mb-6 flex items-center gap-2 backdrop-blur-sm">
              <CheckCircle class="w-5 h-5 flex-shrink-0" />
              {{success}}
            </div>
            
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-white/80 mb-2">Title</label>
                <input
                  type="text"
                  v-model="title"
                  placeholder="Enter an engaging title..."
                  class="w-full bg-white/10 border border-white/20 rounded-xl py-3 px-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-white/80 mb-2">Content</label>
                <textarea
                  v-model="content"
                  placeholder="Write your content here..."
                  rows="8"
                  class="w-full bg-white/10 border border-white/20 rounded-xl py-3 px-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-transparent transition-all resize-none"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-white/80 mb-3">Status</label>
                <div class="flex gap-4">
                  <label class="flex items-center gap-3 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all" :class="status === 'public' ? 'border-emerald-400/60 bg-emerald-400/10' : 'border-white/20 hover:border-white/30 bg-white/5'">
                    <input type="radio" v-model="status" value="public" class="w-4 h-4 text-emerald-400 focus:ring-emerald-400/50 bg-transparent border-white/30" />
                    <div>
                      <span class="font-medium text-white">Public</span>
                      <p class="text-xs text-white/50">Visible to everyone</p>
                    </div>
                  </label>
                  <label class="flex items-center gap-3 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all" :class="status === 'unpublic' ? 'border-amber-400/60 bg-amber-400/10' : 'border-white/20 hover:border-white/30 bg-white/5'">
                    <input type="radio" v-model="status" value="unpublic" class="w-4 h-4 text-amber-400 focus:ring-amber-400/50 bg-transparent border-white/30" />
                    <div>
                      <span class="font-medium text-white">Unpublic</span>
                      <p class="text-xs text-white/50">Only you can see</p>
                    </div>
                  </label>
                </div>
              </div>

              <div class="flex items-center gap-3 pt-4">
                <button
                  type="submit"
                  class="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg shadow-indigo-500/30"
                >
                  <Plus class="w-5 h-5" />
                  Create Post
                </button>
                <router-link to="/blog" class="px-6 py-3 rounded-xl font-medium text-white/70 hover:bg-white/10 transition-colors">
                  Cancel
                </router-link>
              </div>
            </form>
          </div>
        </div>
    </div>
</template>