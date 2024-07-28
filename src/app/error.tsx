'use client'
import React from 'react'

const error = (error:Error) => {
  console.log(error.message,error)
  return (
    <div>error</div>
  )
}

export default error