import Button from 'components/common/Button'
import { useState } from 'react'
import { validate } from 'email-validator'
import { subscribeRequest } from 'requests/subscribe.request'
import { CheckCircleFilled, InfoCircleFilled } from '@ant-design/icons'
import Message from '@components/common/Message'

interface IProps {}

const Subscribe = (props: IProps) => {
  const {} = props
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubscribe = () => {
    if (validate(email)) {
      setLoading(true)
      subscribeRequest(email)
        .then(() => {
          setSuccess(true)
        })
        .catch((err) =>
          setError(err.message || 'Internal error, please try again later')
        )
        .finally(() => {
          setLoading(false)
        })
    } else {
      setError('Please enter a valid email')
    }
  }
  return (
    <div>
      <div className="flex">
        {success && (
          <Message
            type="success"
            message="Thank you for subscribing our
            best deals."
          />
        )}
        {!success && (
          <input
            style={{ width: 230 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-8 text-black p-2 border-none rounded-l"
            placeholder="Enter email to get our best deals"
          />
        )}
        {!success && (
          <span
            className={`h-8 text-white p-2 rounded-r cursor-pointer ${
              loading
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-blue-900 hover:bg-blue-800'
            }`}
            onClick={() => {
              if (!loading) {
                onSubscribe()
              }
            }}
          >
            {loading ? 'Subscribing...' : 'Subscribe'}
          </span>
        )}
      </div>
      {error && <Message className="mt-1" type="error" message={error} />}
    </div>
  )
}

export default Subscribe
