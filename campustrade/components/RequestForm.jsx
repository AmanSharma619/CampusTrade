"use client"
import React, { useState } from 'react'
import { UseFirebase } from '@/auth/firebase';

const RequestForm = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [action, setAction] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  let firebase = UseFirebase();
  const user = firebase.user;

  async function handleclick(e) {
    e.preventDefault();
    if (!title || !description || !action) {
      setError("Please fill all fields.");
      return;
    }
    setError(null);
    setSubmitting(true);
    setSuccess(false);
    try {
      const data = await firebase.getUserByUID(user.uid)
      const userName = data.Name;
      const userSection = data.Section;
      await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userID: user.uid,
          name: userName,
          section: userSection,
          item: title,
          description: description,
          action: action,
          image: "https://i.ibb.co/6hmR0y0/requested.jpg",
          imagePublicID: "requested",
        }),
      });
      setSuccess(true);
      setTitle("");
      setDescription("");
      setAction("");
      setTimeout(() => {
        setSuccess(false);
        props.setShowRequestForm(false);
        window.location.reload();
      }, 2000);
    } catch (err) {
      setError("Failed to post request. Please try again.");
    }
    setSubmitting(false);
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#181c24]/70 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-lg p-7 w-[90%] max-w-md relative">
        <button
          className="absolute top-2 right-2 text-sm bg-red-500 text-white px-2 py-1 rounded"
          onClick={() => props.setShowRequestForm(false)}
        >
          Close
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">Request an Item</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && (
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-white/80 z-50 rounded-xl">
            <svg className="w-16 h-16 text-green-500 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-xl font-bold text-green-700">Request Posted Successfully!</p>
          </div>
        )}
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Item Title"
            className="p-2 border rounded"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            className="p-2 border rounded"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <select
            className="p-2 border rounded"
            value={action}
            onChange={e => setAction(e.target.value)}
          >
            <option value="">Select Action</option>
            <option value="Requested">Requested</option>
          </select>
          {!submitting ? (
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              onClick={handleclick}
            >
              Submit
            </button>
          ) : (
            <p>Posting...</p>
          )}
        </form>
      </div>
    </div>
  )
}

export default RequestForm