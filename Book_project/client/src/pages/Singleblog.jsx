import React from 'react'

const Singleblog = () => {
  return (
    <div className="container mt-4">
      <div className="card">
        <img
          src="https://via.placeholder.com/600"
          className="card-img-top"
          alt="Sample Blog"
        />
        <div className="card-body">
          <h2 className="card-title">Sample Blog Title - Full View</h2>
          <p className="card-text">
            This is a detailed view of the card. You can add more information
            about the blog post here, including longer content, additional
            images, or related links.
          </p>
          <button className="btn btn-secondary"  >
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}

export default Singleblog
