import React, { PropsWithChildren } from 'react'

const Container = ({ children }: PropsWithChildren) => {
  return <div className="mx-auto max-w-5xl p-6 lg:px-8">{children}</div>
}

export default Container
