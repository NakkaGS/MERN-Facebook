import "./style.css"

export default function createPostPopup() {
  return (
    <div className="blur">
        <div className="postBox">
            <div className="box_header">
                <div className="small_circle">
                    <i className="exit_icon"></i>
                </div>
                <span>Create Post</span>
            </div>
        </div>
    </div>
  )
}
