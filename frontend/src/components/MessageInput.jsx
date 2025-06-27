import { useState, useRef, useEffect } from "react";
import Picker from "emoji-picker-react";
import { ImagePlus, Send, Smile } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef();
  const { sendMessage, selectedUser } = useChatStore();

  const handleSend = () => {
    if (!text && !image) return;

    sendMessage({ text, image, receiverId: selectedUser._id });
    setText("");
    setImage(null);
    setShowEmojiPicker(false);
  };

  const handleEmojiClick = (emojiData) => {
    setText((prev) => prev + emojiData.emoji);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Optional: close emoji picker if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showEmojiPicker &&
        !event.target.closest(".emoji-picker") &&
        !event.target.closest(".emoji-toggle")
      ) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showEmojiPicker]);

  return (
    <div className="w-full bg-base-100 border-t p-4 relative">
      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-16 right-4 z-50 emoji-picker">
          <Picker onEmojiClick={handleEmojiClick} />
        </div>
      )}

      <div className="flex items-center gap-2">
        {/* Image Upload */}
        <button
          onClick={() => fileInputRef.current.click()}
          className="btn btn-sm"
        >
          <ImagePlus className="w-5 h-5" />
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          className="hidden"
        />

        {/* Message Input */}
        <input
          type="text"
          className="input input-bordered flex-1"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Emoji Toggle */}
        <button
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          className="btn btn-sm emoji-toggle"
        >
          <Smile className="w-5 h-5" />
        </button>

        {/* Send */}
        <button onClick={handleSend} className="btn btn-primary btn-sm">
          <Send className="w-4 h-4" />
        </button>
      </div>

      {/* Image Preview */}
      {image && (
        <div className="mt-2 relative w-fit">
          <img src={image} alt="preview" className="max-w-xs rounded" />
          <button
            className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 text-xs"
            onClick={() => setImage(null)}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default MessageInput;
