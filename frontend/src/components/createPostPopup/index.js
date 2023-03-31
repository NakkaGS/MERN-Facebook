import { useState } from "react";

//Styling
import "./style.css";

export default function CreatePostPopup({ user }) {
  const [text, setText] = useState("");
  const [showPrev, setShowPrev] = useState("")

  return (
    <div className="blur">
      <div className="postBox">
        <div className="box_header">
          <div className="small_circle">
            <i className="exit_icon"></i>
          </div>
          <span>Create Post</span>
        </div>

        <div className="box_profile">
          <img src={user?.picture} alt="" className="box_profile_img" />
          <div className="box_col">
            <div className="box_profile_name">
              {user?.first_name} {user?.last_name}
            </div>
            <div className="box_privacy">
              <img src="../../../icons/public.png" alt="" />
              <span>Public</span>
              <i className="arrowDown_icon"></i>
            </div>
          </div>
        </div>

        <textarea
          maxLength="100"
          value={text}
          placeholder={`What's on your mind, ${user?.first_name}`}
          onChange={(e) => setText(e.target.value)}
          className="post_input"></textarea>

        {showPrev && (
          <div className="flex_center">
            <textarea
              maxLength="100"
              value={text}
              placeholder={`What's on your mind, ${user?.first_name}`}
              onChange={(e) => setText(e.target.value)}
              className="post_input"></textarea>
          </div>
        )}

        <div className="post_emojis_wrap">
          <div className="comment_emoji_picker rlmove"></div>
        </div>
      </div>
    </div>
  );
}
