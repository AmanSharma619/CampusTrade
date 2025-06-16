"use client"

import React, { useState } from 'react'
import { UseFirebase } from '@/auth/firebase';
import { set } from 'mongoose';

const SellForm = (props) => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [action, setAction] = useState(null);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  let data;
  let firebase = UseFirebase();
  const user = firebase.user;

  async function handleclick(e) {
    e.preventDefault();
    if (!image || !title || !description || !action) {
      setError("Please fill all fields and upload an image.");
      return;
    }
    setError(null);
    setSubmitting(true);
    setSuccess(false);
    try {
      let imgdata = new FormData();
      imgdata.append("file", image);
      imgdata.append("upload_preset", "items-pics");
      imgdata.append("cloud_name",process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
      const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: imgdata,
      });
      const imageData = await res.json();
      const imageUrl = imageData.secure_url;
      const data = await firebase.getUserByUID(user.uid)
      const userName = data.Name;
      const userSection = data.Section;
      await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
          section: userSection,
          item: title,
          description: description,
          action: action,
          image: imageUrl,
        }),
      });
      setSuccess(true);
      setTitle("");
      setDescription("");
      setImage(null);
      setAction("");
      setTimeout(() => {
        setSuccess(false);
        props.setShowForm(false);
        window.location.reload();
      }, 2000);
    } catch (err) {
      setError("Failed to post item. Please try again.");
    }
    setSubmitting(false);
  }
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
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && (
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-white/80 z-50 rounded-xl">
            <svg className="w-16 h-16 text-green-500 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-xl font-bold text-green-700">Item Posted Successfully!</p>
          </div>
        )}
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Item Title"
            className="p-2 border rounded"
            onChange={e => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            className="p-2 border rounded"
            onChange={e => setDescription(e.target.value)}
          />
          <div className="flex flex-col gap-2">
            <label htmlFor="item-image" className="block text-gray-700 font-medium mb-1">Upload Image</label>
            <div className="relative w-full max-w-xs mx-auto">
              <input
                id="item-image"
                type="file"
                accept="image/*"
                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
                onChange={e => {
                  if (e.target.files[0]) {
                    const file = e.target.files[0];

                    setImage(e.target.files[0]
                    )

                  };
                }}
              />
              {!image ? (
                <div className="flex items-center justify-center border-2 border-dashed border-blue-400 rounded-lg p-4 bg-blue-50 text-blue-600 font-semibold cursor-pointer transition hover:bg-blue-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5V19a2 2 0 002 2h14a2 2 0 002-2v-2.5M16.5 12.75L12 17.25m0 0l-4.5-4.5M12 17.25V4.5" />
                  </svg>
                  Choose Image
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-green-400 rounded-lg p-4 bg-green-50 text-green-600 font-semibold gap-2">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m9.75 4.5a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Image Selected</span>
                  </div>
                  <span className="text-xs text-gray-500 truncate max-w-[120px]">{image.name}</span>
                  <button type="button" className="text-xs text-red-600 underline mt-1" onClick={() => setImage(null)}>
                    Cancel
                  </button>
                </div>
              )}

            </div>
          </div>
          <select
            className="p-2 border rounded"
            value={action}
            onChange={e => setAction(e.target.value)}
          >
            <option value="">Select Action</option>
            <option value="Selling">Selling</option>
            <option value="Lending">Lending</option>
          </select>

          {!submitting? ( <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            onClick={handleclick}
          >
            Submit
          </button>) : (
            <p>Posting...</p>
          )}
        </form>
      </div>
    </div>
  )
}

export default SellForm