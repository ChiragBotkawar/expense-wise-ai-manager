
import { useState, useEffect } from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Initial check
    checkMobile()
    
    // Add event listener for window resize
    window.addEventListener("resize", checkMobile)
    
    // Clean up event listener
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return isMobile
}
