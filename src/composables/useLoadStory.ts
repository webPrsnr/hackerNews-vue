import { ref, watchEffect } from 'vue'
import type { StoryResponse } from '..'
import { useLoader } from './useLoader'
import api from '@/services/api'

export function useLoadStory(id: string) {
  const { isLoading, startLoading, stopLoading } = useLoader()

  const story = ref<StoryResponse | null>(null)

  watchEffect(async () => {
    story.value = null
    startLoading()

    try {
      story.value = await api.stories.story(Number(id))
    }
    catch (error) {
      console.error(error)
    }
    finally {
      stopLoading()
    }
  })

  return {
    isLoading,
    story,
  }
}