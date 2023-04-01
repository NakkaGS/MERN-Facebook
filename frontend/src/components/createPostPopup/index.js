import { useEffect, useRef, useState } from "react";

//Styling
import "./style.css";

//Emoji Picker
import EmojiPicker from "emoji-picker-react";

export default function CreatePostPopup({ user }) {
  const [text, setText] = useState("");
  const [showPrev, setShowPrev] = useState("");
  const [picker, setPicker] = useState(true);

  const textRef = useRef(null)

  const handleEmoji = (emojiObject) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emojiObject.emoji + end;
    setText(newText);
  };

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
        ref={textRef}
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
          {picker && (
            <div className="comment_emoji_picker rlmove">
              <EmojiPicker onEmojiClick={handleEmoji}/>
            </div>
          )}
          <img src="../../../icons/colorful.png" alt="" />
          <i className="emoji_icon_large" onClick={() => setPicker((prev) => !prev)}></i>
        </div>
      </div>
    </div>
  );
}
