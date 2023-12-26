import { create } from 'zustand'

interface IStore {
  lang: string
  token: string
  layout: {
    collapsed: boolean
  }
  setLang: (v: string) => void
  setCollapsed: () => void
}

export const useStore = create<IStore>()((set, get) => ({
  lang: localStorage.getItem('lang') || 'zh',
  token: localStorage.getItem('token') || '',
  layout: {
    collapsed: false,
  },
  setLang(v) {
    set(() => ({ lang: v }))
    localStorage.setItem('lang', v)
  },
  setCollapsed() {
    set(state => ({ layout: { collapsed: !state.layout.collapsed } }))
  },
}))
