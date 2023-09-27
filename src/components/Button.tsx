import React, { PropsWithChildren } from 'react'

type ButtonProps = PropsWithChildren & {}

const Button = ({ children }: ButtonProps) => {
  return (
    <button className="rounded-md bg-indigo-600 px-3 py-2 font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus:bg-indigo-700">
      {children}
    </button>
  )
}

export default Button
