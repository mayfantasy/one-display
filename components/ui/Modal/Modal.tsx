import { FC, useRef, useEffect, useCallback } from 'react'
import Portal from '@reach/portal'
import { Cross } from '@components/icons'
import ScrollLock, { TouchScrollable } from 'react-scrolllock'
import FocusTrap from '@lib/focus-trap'
import { useUI } from '../context'
import { useEscClose } from 'hooks/esc-close'
import ClickOutside from '@lib/click-outside'
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
  const { setModalView, closeModal } = useUI()

  useEscClose(onClose, open)

  return (
    <Portal>
      {open ? (
        <ScrollLock>
          <div className="fixed text-primary inset-0 z-50 bg-black bg-opacity-50">
            <div
              className="absolute w-full h-full left-0 top-0"
              onClick={closeModal}
            />
            <div
              style={{
                backgroundColor: bgColor || 'rgb(237, 236, 241)',
                maxWidth: '95%',
                boxShadow: '0 6px 22px -8px rgb(0 0 0 / 30%)',
                borderRadius: 10,
                transform: 'translate(-50%, -50%)',
              }}
              className="p-8 border border-accents-2 absolute top-1/2 left-1/2"
              role="dialog"
            >
              {/* <button
                onClick={() => {
                  onClose()
                  setModalView('LOGIN_VIEW')
                }}
                aria-label="Close panel"
                className="hover:text-gray-500 transition ease-in-out duration-150 focus:outline-none absolute right-0 top-0 m-6"
              >
                <Cross className="h-6 w-6" />
              </button> */}
              <FocusTrap focusFirst>{children}</FocusTrap>
            </div>
          </div>
        </ScrollLock>
      ) : null}
    </Portal>
  )
}

export default Modal
