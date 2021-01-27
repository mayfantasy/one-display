import { useCallback, useEffect, useState } from 'react'

export const useEscClose = (onClose: () => void, open?: boolean) => {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        return onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (open) {
      window.addEventListener('keydown', handleKey)
    }
    return () => {
      window.removeEventListener('keydown', handleKey)
    }
  }, [open, handleKey])
}
