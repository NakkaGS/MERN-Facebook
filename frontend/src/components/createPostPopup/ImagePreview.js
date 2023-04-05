import { useRef } from "react";
import EmojiPickerBackgrounds from "./EmojiPickerBackgrounds";

export default function ImagePreview({ text, user, setText }) {
  const ImageInputRef = useRef(null);
  const handleImages = () => {};

  return (
    <div className="overflow_a">
      <EmojiPickerBackgrounds text={text} user={user} setText={setText} type2 />
      <div className="add_pics_wrap">
        <input
          type="file"
          multiple
          hidden
          ref={ImageInputRef}
          onChange={handleImages}
        />
      </div>
      {
        images && images.length ? "": ""
      }
    </div>
  );
}
