import React from "react";

export default function PostError({ error, setError }) {
  return (
    <div className="postError">
        <div>{error}</div>
        <div className="blue_btn" onClick={() => {
            setError("")
        }}>Try Again</div>
    </div>
  )

}
