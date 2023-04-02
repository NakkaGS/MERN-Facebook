import { useEffect, useState } from "react";

//Emoji Picker
import EmojiPicker from "emoji-picker-react";

export default function EmojiPickerBackgrounds({ text, textRef, setText }) {
  const [picker, setPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  const handleEmoji = (emojiObject) => {
    const ref = textRef?.current;
    ref.focus();
    const start = text.substring(0, ref?.selectionStart);
    const end = text.substring(ref?.selectionStart);
    const newText = start + emojiObject?.emoji + end;
    setText(newText);
    setCursorPosition(start.length + emojiObject?.length);
  };

  return (
    <div className="post_emojis_wrap">
      {picker && (
        <div className="comment_emoji_picker rlmove">
          <EmojiPicker onEmojiClick={handleEmoji} />
        </div>
      )}
      <img src="../../../icons/colorful.png" alt="" />
      <i
        className="emoji_icon_large"
        onClick={() => setPicker((prev) => !prev)}></i>
    </div>
  );
}
