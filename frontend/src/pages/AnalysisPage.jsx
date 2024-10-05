import React from 'react'
import Upload from '../components/AnalysisPage/Upload'

const AnalysisPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 ">
    <h1 className="text-4xl font-bold text-teal-700 mb-8">
      Seismic Detection Platform
    </h1>
    <Upload />
  </div>
  )
}

export default AnalysisPage