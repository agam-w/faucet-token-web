import React from 'react'

type InputProps = {
  type?: React.HTMLInputTypeAttribute
  name?: string
  placeholder?: string
  value?: string | number
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

const Input = ({ type = 'text', name, placeholder, value, onChange }: InputProps) => {
  return (
    <div className="flex overflow-clip rounded-md bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-700 transition focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
      <input
        type={type}
        name={name}
        aria-autocomplete="none"
        className="block flex-1 border-none bg-transparent px-3 py-2 outline-none placeholder:text-gray-500"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default Input
