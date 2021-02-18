import Button from '@components/common/Button'
import { useState } from 'react'
import { validate } from 'email-validator'
import { subscribeRequest } from 'requests/subscribe.request'
import { CheckCircleFilled, InfoCircleFilled } from '@ant-design/icons'

interface IProps {}

const Subscribe = (props: IProps) => {
  const {} = props
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const onSubscribe = () => {
    if (validate(email)) {
      subscribeRequest(email)
        .then(() => {
          setSuccess(true)
        })
        .catch((err) =>
          setError(err.message || 'Internal error, please try again later')
        )
    } else {
      setError('Please enter a valid email')
    }
  }
  return (
    <div>
      <div className="flex">
        {success && (
          <div className="text-green-500 flex items-center">
            <CheckCircleFilled className="mr-2" /> Thank you for subscribing our
            best deals.
          </div>
        )}
        {!success && (
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-8 w-64 text-black p-2 border-none rounded-l"
            placeholder="Enter email to get our best deals"
          />
        )}
        {!success && (
          <span
            className="h-8 bg-blue-900 text-white p-2 rounded-r cursor-pointer hover:bg-blue-800"
            onClick={onSubscribe}
          >
            Subscribe
          </span>
        )}
      </div>
      {error && <div className="text-red-500 mt-1">{error}</div>}
    </div>
  )
}

export default Subscribe
