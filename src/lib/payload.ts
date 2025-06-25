const PAYLOAD_API_URL = 'http://localhost:3000/api'

export interface NewsItem {
  id: string | number
  title: string
  description: string
  content?: Array<{ paragraph: string }>
  image: {
    url: string
    alt: string
  }
  type: 'edital' | 'evento' | 'projeto'
  date: string
}

export interface Project {
  id: string | number
  title: string
  category: string
  image: {
    url: string
    alt: string
  }
  description: string
  technologies: Array<{ technology: string }>
  longDescription?: Array<{ paragraph: string }>
  features?: Array<{ feature: string }>
  startDate: string
  status: string
  team?: Array<{ member: string }>
  repository?: string
}

export interface TeamMember {
  id: string | number
  name: string
  role: string
  description?: string
  image: {
    url: string
    alt: string
  }
  email?: string
  linkedin?: string
  github?: string
  lattes?: string
  skills?: Array<{ skill: string }>
  isActive: boolean
  order: number
}

export async function getNews(): Promise<NewsItem[]> {
  try {
    const response = await fetch(`${PAYLOAD_API_URL}/news`)
    const data = await response.json()
    
    // Transformar URLs relativas em absolutas
    const news = data.docs?.map((item: any) => ({
      ...item,
      image: {
        ...item.image,
        url: item.image?.url?.startsWith('/') 
          ? `http://localhost:3000${item.image.url}` 
          : item.image?.url
      }
    })) || []
    
    return news
  } catch (error) {
    console.error('Erro ao buscar notícias:', error)
    return []
  }
}

export async function getNewsById(id: string): Promise<NewsItem | null> {
  try {
    const response = await fetch(`${PAYLOAD_API_URL}/news/${id}`)
    if (!response.ok) return null
    
    const newsItem = await response.json()
    
    // Transformar URL relativa em absoluta
    if (newsItem.image?.url?.startsWith('/')) {
      newsItem.image.url = `http://localhost:3000${newsItem.image.url}`
    }
    
    return newsItem
  } catch (error) {
    console.error('Erro ao buscar notícia:', error)
    return null
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const response = await fetch(`${PAYLOAD_API_URL}/projects`)
    const data = await response.json()
    
    // Transformar URLs relativas em absolutas
    const projects = data.docs?.map((project: any) => ({
      ...project,
      image: {
        ...project.image,
        url: project.image?.url?.startsWith('/') 
          ? `http://localhost:3000${project.image.url}` 
          : project.image?.url
      }
    })) || []
    
    return projects
  } catch (error) {
    console.error('Erro ao buscar projetos:', error)
    return []
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const response = await fetch(`${PAYLOAD_API_URL}/projects/${id}`)
    if (!response.ok) return null
    
    const project = await response.json()
    
    // Transformar URL relativa em absoluta
    if (project.image?.url?.startsWith('/')) {
      project.image.url = `http://localhost:3000${project.image.url}`
    }
    
    return project
  } catch (error) {
    console.error('Erro ao buscar projeto:', error)
    return null
  }
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const response = await fetch(`${PAYLOAD_API_URL}/team?sort=order`)
    const data = await response.json()
    
    // Transformar URLs relativas em absolutas e filtrar apenas membros ativos
    const teamMembers = data.docs?.map((member: any) => {
      const imageUrl = member.image?.url?.startsWith('/') 
        ? `http://localhost:3000${member.image.url}` 
        : member.image?.url || '/placeholder.svg';
      
      return {
        ...member,
        image: {
          alt: member.image?.alt || member.name,
          url: imageUrl
        }
      };
    }).filter((member: any) => member.isActive) || []
    
    return teamMembers
  } catch (error) {
    console.error('Erro ao buscar membros da equipe:', error)
    return []
  }
}

export async function getTeamMemberById(id: string): Promise<TeamMember | null> {
  try {
    const response = await fetch(`${PAYLOAD_API_URL}/team/${id}`)
    if (!response.ok) return null
    
    const teamMember = await response.json()
    
    // Transformar URL relativa em absoluta
    if (teamMember.image?.url?.startsWith('/')) {
      teamMember.image = {
        alt: teamMember.image?.alt || teamMember.name,
        url: `http://localhost:3000${teamMember.image.url}`
      }
    }
    
    return teamMember
  } catch (error) {
    console.error('Erro ao buscar membro da equipe:', error)
    return null
  }
}
