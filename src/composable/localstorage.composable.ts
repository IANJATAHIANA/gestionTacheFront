
export function useLocalstorage() {
    const getItem = (key: string) => {
      const data = localStorage.getItem(key) || ''
      if (data) {
        return JSON.parse(data)
      }
      return data
    }
  
    const setItem = (key: string, value: any) => {
      return localStorage.setItem(key, JSON.stringify(value))
    }
  
    const clear = () => {
      return localStorage.clear()
    }
  
    return { getItem, setItem, clear }
  }
  