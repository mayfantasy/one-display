interface IProps {
  src?: string
  alt?: string
  noScaleEffect?: boolean
}

const SquareImage = (props: IProps) => {
  const { src, alt, noScaleEffect } = props
  return (
    <div className="w-full flex flex-row justify-center relative overflow-hidden bg-white">
      <div className="responsive-square" />
      <div className="w-full h-full absolute flex flex-row items-center">
        <img
          className={`w-full ${
            !noScaleEffect
              ? 'transform hover:scale-125 transition duration-200'
              : ''
          }`}
          alt={alt}
          src={src || '/square-placeholder.jpg'}
        />
      </div>
    </div>
  )
}

export default SquareImage
