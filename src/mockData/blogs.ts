export interface Blog {
  id: number
  title: string
  content: string
  status: 'public' | 'unpublic'
  createdAt: string
}

const defaultBlogs : Blog[] = [
  {
    id: 1,
    title: 'Test 1',
    content: 'test 1',
    status: 'public',
    createdAt: '11/3/2023'
  },
  {
    id: 2,
    title: 'Test 2',
    content: 'Donec pharetra tempor posuere. Fusce interdum egestas cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    status: 'unpublic',
    createdAt: '11/3/2023'
  },
  {
    id: 3,
    title: 'Test 50',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mattis nunc nisi, at molestie elit dapibus eu. Aliquam gravida condimentum nulla. 
              Donec pharetra tempor posuere. Fusce interdum egestas cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Proin volutpat mi sapien, in lobortis enim vulputate vel. Curabitur finibus sodales neque.`,
    status: 'unpublic',
    createdAt: '11/5/2025'
  }
]

export function getBlogs() : Blog[] {
  const stored = JSON.parse(localStorage.getItem('blogs') || '[]') as Blog[]
  if (stored.length === 0) {
    localStorage.setItem('blogs', JSON.stringify(defaultBlogs))
    return defaultBlogs
  }
  return stored
}

export function saveBlogs(blogs:Blog[]) {
  localStorage.setItem('blogs', JSON.stringify(blogs))
}

export function getBlogById(id:number) : Blog | undefined {
  const blogs = getBlogs()
  return blogs.find((b:any) => b.id === Number(id))
}