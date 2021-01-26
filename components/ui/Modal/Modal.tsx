import { FC, useRef, useEffect, useCallback } from 'react'
import Portal from '@reach/portal'
import { Cross } from '@components/icons'
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock'
import FocusTrap from '@lib/focus-trap'
import { useUI } from '../context'
interface IProps {
  className?: string
  children?: any
  open?: boolean
  onClose: () => void
  onEnter?: () => void | null
  bgColor?: string
}

const Modal: FC<IProps> = ({
  children,
  open,
  onClose,
  onEnter = null,
  bgColor,
}) => {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>
  const { setModalView, closeModal } = useUI()

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        return onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (ref.current) {
      if (open) {
        disableBodyScroll(ref.current)
        window.addEventListener('keydown', handleKey)
      } else {
        enableBodyScroll(ref.current)
      }
    }
    return () => {
      window.removeEventListener('keydown', handleKey)
      clearAllBodyScrollLocks()
    }
  }, [open, handleKey])

  return (
    <Portal>
      {open ? (
        <div className="fixed text-primary flex items-center inset-0 z-50 justify-center bg-black bg-opacity-50">
          <div
            style={{ backgroundColor: bgColor || 'white' }}
            className="p-8 border border-accents-2 relative rounded"
            role="dialog"
            ref={ref}
          >
            <button
              onClick={() => {
                onClose()
                setModalView('LOGIN_VIEW')
              }}
              aria-label="Close panel"
              className="hover:text-gray-500 transition ease-in-out duration-150 focus:outline-none absolute right-0 top-0 m-6"
            >
              <Cross className="h-6 w-6" />
            </button>
            <FocusTrap focusFirst>{children}</FocusTrap>
          </div>
        </div>
      ) : null}
    </Portal>
  )
}

export default Modal
