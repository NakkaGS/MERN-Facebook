import { useRef, useState } from "react";

//Styling
import "./style.css";

//Components
import AddToYourPost from "./AddToYourPost";
import EmojiPickerBackgrounds from "./EmojiPickerBackgrounds";
import ImagePreview from "./ImagePreview";

//Helpers
import useClickOutside from "../../helpers/clickOutside";

//Functions
import { createPost } from "../../functions/post";

//React Spinners
import { PulseLoader } from 'react-spinners'

export default function CreatePostPopup({ user, setVisible }) {
  const [text, setText] = useState("");
  const [showPrev, setShowPrev] = useState(false);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [background, setBackground] = useState("");

  const popup = useRef(null)

  useClickOutside(popup, () => {
    setVisible(false);
  })

  const postSubmit = async () => {
    if(background){
      setLoading(true);
      const res = await createPost(null, background, text, null, user.id, user.token)
      setLoading(false);
      setBackground("");
      setText("")
      setVisible(false)
    }
  }

  return (
    <div className="blur">
      <div className="postBox" ref={popup}>
        <div className="box_header">
          <div
            className="small_circle"
            onClick={() => {
              setVisible(false);
            }}>
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

        {!showPrev ? (
          <>
            <EmojiPickerBackgrounds
              text={text}
              user={user}
              setText={setText}
              showPrev={showPrev}
              setBackground={setBackground}
              background={background}
            />
          </>
        ) : (
          <ImagePreview
            text={text}
            user={user}
            setText={setText}
            showPrev={showPrev}
            images={images}
            setImages={setImages}
            setShowPrev={setShowPrev}
          />
        )}

        <AddToYourPost setShowPrev={setShowPrev} />
        <button className="post_submit" onClick={() => {postSubmit()}} disabled={loading} >{loading ? <PulseLoader color="#fff" size={5}/> : "Post"}</button>
      </div>
    </div>
  );
}
