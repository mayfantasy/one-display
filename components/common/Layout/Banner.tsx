import { url } from 'inspector'
import { IBg } from 'types/ui.types'

interface IProps {
  bg: IBg
  children?: React.ReactNode
}

const Banner = (props: IProps) => {
  const { bg, children } = props
  return (
    <div
      className="banner relative"
      style={{
        height: bg.height || '100vh',
      }}
    >
      {/* Bg image */}
      <div className="banner__bg w-full h-full absolute">
        <img
          src={bg.src}
          className="object-cover object-center w-full h-full"
        />
      </div>

      {/* Bg mask */}
      <div
        className="banner-mask w-full h-full absolute"
        style={{ backgroundColor: bg.mask || 'transparent' }}
      />

      {/* Bg content */}
      <div className="banner__content absolute w-full h-full">{children}</div>
    </div>
  )
}

export default Banner
