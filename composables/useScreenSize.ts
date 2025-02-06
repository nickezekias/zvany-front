// useScreenSize.ts
import { ref, onMounted, onUnmounted, computed } from 'vue'

export function useScreenSize() {
  // Define standard breakpoints
  const breakpoints = {
    mobile: 768,
    tablet: 1024,
    laptop: 1280,
  }

  const width = ref<number>(0)

  // Function to check the current screen width and update the width ref
  const updateWidth = (): void => {
    width.value = window.innerWidth
  }

  // Computed properties for screen size checks
  const isMobile = computed((): boolean => width.value <= breakpoints.mobile)
  const isTablet = computed((): boolean => width.value > breakpoints.mobile && width.value <= breakpoints.tablet)
  const isLaptop = computed((): boolean => width.value > breakpoints.tablet && width.value <= breakpoints.laptop)
  const isDesktop = computed((): boolean => width.value > breakpoints.laptop)

  // Initialize screen size on mounted
  onMounted(() => {
    updateWidth()
    window.addEventListener('resize', updateWidth)
  })

  // Clean up on unmount
  onUnmounted(() => {
    window.removeEventListener('resize', updateWidth)
  })

  return {
    isMobile,
    isTablet,
    isLaptop,
    isDesktop,
  }
}
