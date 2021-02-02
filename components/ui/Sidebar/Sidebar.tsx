import Portal from '@reach/portal'
import { FC, useEffect, useRef } from 'react'
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock'
import { useEscClose } from 'hooks/esc-close'
import ScrollLock from 'react-scrolllock'

interface Props {
  children: any
  open: boolean
  onClose: () => void
}

const Sidebar: FC<Props> = ({ children, open = false, onClose }) => {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>

  useEscClose(onClose, open)

  return (
    <Portal>
      {open ? (
        <ScrollLock>
          <div ref={ref} className="h-screen fixed top-0 right-0 w-full z-10">
            <div className="absolute inset-0 overflow-hidden z-40">
              <div
                className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose}
              />
              <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16 outline-none">
                <div className="h-full md:w-screen md:max-w-md bg-white">
                  <div className="h-full flex flex-col text-base bg-accents-1 shadow-xl overflow-y-auto">
                    {children}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </ScrollLock>
      ) : null}
    </Portal>
  )
}

export default Sidebar
