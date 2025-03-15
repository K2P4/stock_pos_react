import React from 'react'

const ContainerComponent = ({children}) => {
  return (
    <div className='container mx-auto mt-14'>
      {children}
    </div>
  )
}

export default ContainerComponent
