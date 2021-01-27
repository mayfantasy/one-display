import { FC, useEffect, useMemo, useState } from 'react'
import cn from 'classnames'

import { useRouter } from 'next/router'
import { CloseOutlined, SearchOutlined } from '@ant-design/icons'
import { useUI } from '@components/ui/context'

interface Props {
  className?: string
  id?: string
  navColor?: string
}

const Searchbar: FC<Props> = ({ className, id = 'search', navColor }) => {
  const router = useRouter()
  const q = router.query.q as string
  const [key, setKey] = useState('')

  const { closeSearchbar } = useUI()

  useEffect(() => {
    router.prefetch('/search')
  }, [])

  useEffect(() => {
    console.log(q)
    if (q) {
      setKey(q)
    }
  }, [router.query])

  const handleSearch = () => {
    router.push(
      {
        pathname: `/search`,
        query: key ? { key } : {},
      },
      undefined,
      { shallow: true }
    )
  }

  return (
    <div className="w-full flex flex-row items-center">
      <label className="hidden" htmlFor={id}>
        Search
      </label>
      <div className="w-full flex flex-row items-center border-b-2">
        {/* Search Icon */}
        <div
          onClick={handleSearch}
          style={{ color: navColor }}
          className="text-black h-8 p-2 flex items-center cursor-pointer"
        >
          <SearchOutlined />
        </div>

        {/* Input Box */}
        <input
          type="text"
          style={{ color: navColor }}
          className="flex-1 border-none bg-transparent h-8 p-2 placeholder-gray-300 outline-none"
          id={id}
          value={key}
          onChange={(e) => {
            setKey(e.target.value)
          }}
          placeholder="Search for products..."
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              handleSearch()
            }
          }}
        />
        {/* Clear */}
        <div
          style={{ color: navColor }}
          onClick={() => {
            setKey('')
            closeSearchbar()
          }}
          className="text-black h-8 p-2 flex items-center cursor-pointer"
        >
          <CloseOutlined />
        </div>
      </div>
    </div>
  )
}

export default Searchbar
