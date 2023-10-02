import React, { PropsWithChildren } from 'react'

type ButtonProps = PropsWithChildren & {
  onClick?: () => void
  disabled?: boolean
}

const Button = ({ children, onClick, disabled }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center space-x-2 rounded-md bg-indigo-600 px-3 py-2 font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus:bg-indigo-700 disabled:bg-indigo-500/80"
    >
      {children}
    </button>
  )
}

export default Button
