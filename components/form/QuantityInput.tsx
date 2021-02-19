import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import Button from 'components/common/Button'
import { ChangeEvent } from 'react'

interface IProps {
  quantity: number
  increaseQuantity: (quantity: number) => void
  handleQuantity: (e: ChangeEvent<HTMLInputElement>) => void
  handleBlur: () => void
}
const QuantityInput = (props: IProps) => {
  const { quantity, increaseQuantity, handleQuantity, handleBlur } = props
  const descreaseDisabled = quantity <= 1
  return (
    <div className="flex flex-row items-center h-8">
      <div
        onClick={() => {
          if (!descreaseDisabled) {
            increaseQuantity(-1)
          }
        }}
        className={`text-white h-full w-8 rounded-l flex items-center justify-center ${
          descreaseDisabled ? 'bg-gray-400' : 'bg-blue-900 cursor-pointer '
        }`}
      >
        <MinusOutlined />
      </div>
      <div className="h-full w-15">
        <input
          className="h-full w-full border-t border-b border-gray-400 p-2"
          type="number"
          max={99}
          min={0}
          value={quantity}
          onChange={handleQuantity}
          onBlur={handleBlur}
        />
      </div>
      <div
        className="bg-blue-900 text-white h-full w-8 rounded-r flex items-center justify-center cursor-pointer"
        onClick={() => increaseQuantity(1)}
      >
        <PlusOutlined />
      </div>
    </div>
  )
}

export default QuantityInput
