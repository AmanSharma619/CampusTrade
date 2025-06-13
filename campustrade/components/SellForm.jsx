
import React from 'react'

const SellForm = (props) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#181c24]/70 backdrop-blur-sm">
    <div className="bg-white rounded-xl shadow-lg p-7 w-[90%] max-w-md relative">
      <button
        className="absolute top-2 right-2 text-sm bg-red-500 text-white px-2 py-1 rounded"
        onClick={() => props.setShowForm(false)}
        >
        Close
      </button>
      <h2 className="text-xl font-bold mb-4 text-center">Post an Item</h2>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Item Title"
          className="p-2 border rounded"
          />
        <input
          type="text"
          placeholder="Description"
          className="p-2 border rounded"
          />
        <div className="flex flex-col gap-2">
          <label htmlFor="item-image" className="block text-gray-700 font-medium mb-1">Upload Image</label>
          <div className="relative w-full max-w-xs mx-auto">
            <input
              id="item-image"
              type="file"
              accept="image/*"
              className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
            />
            <div className="flex items-center justify-center border-2 border-dashed border-blue-400 rounded-lg p-4 bg-blue-50 text-blue-600 font-semibold cursor-pointer transition hover:bg-blue-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5V19a2 2 0 002 2h14a2 2 0 002-2v-2.5M16.5 12.75L12 17.25m0 0l-4.5-4.5M12 17.25V4.5" />
              </svg>
              Choose Image
            </div>
          </div>
        </div>
        <select className="p-2 border rounded">
          <option value="">Select Action</option>
          <option value="Selling">Selling</option>
          <option value="Lending">Lending</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
          Submit
        </button>
      </form>
    </div>
  </div>
  )
}

export default SellForm