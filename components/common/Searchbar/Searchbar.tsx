import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react'
import cn from 'classnames'

import { useRouter } from 'next/router'
import { CloseOutlined, SearchOutlined } from '@ant-design/icons'
import { useUI } from '@components/ui/context'

interface Props {
  className?: string
  id?: string
  navColor?: string
  handleSearch: () => void
  keyword: string
  setKeyword: (key: string) => void
  closeSearchbar: () => void
}

const Searchbar: FC<Props> = ({
  className,
  id = 'search',
  navColor,
  handleSearch,
  keyword,
  setKeyword,
  closeSearchbar,
}) => {
  return (
    <div className="w-full flex flex-row items-center px-2">
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
          value={keyword}
          onChange={(e) => {
            console.log(e.target.value)
            setKeyword(e.target.value)
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
            setKeyword('')
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
