import React, { useRef, useState } from 'react';
import { BiSolidSave } from 'react-icons/bi';
import { ImCancelCircle } from 'react-icons/im';
import { db } from '../../firebase/config';
import { doc, updateDoc } from 'firebase/firestore';
import { BsTrashFill } from 'react-icons/bs';
import { IoMdReturnLeft } from 'react-icons/io';

const EditMode = ({ tweet, close }) => {
  const inputRef = useRef();
  const [isPicDeleting, setIsPicDeleting] = useState(false);

  // kaydet butonuna tıklanınca
  const handleSave = async () => {
    // 1) inputun içeirğine eriş
    const newText = inputRef.current.value;

    // 2) güncellenicek dökümanın referansını al
    const tweetRef = doc(db, 'tweets', tweet.id);

    // 3) dökümanın  içeriğini güncelle
    if (isPicDeleting) {
      // resim siliniyorsa resmi null'a çek
      await updateDoc(tweetRef, {
        textContent: newText,
        imageContent: null,
        isEdited: true,
      });
    } else {
      // resim silinmiyosa sadece yazıyı güncelle
      await updateDoc(tweetRef, {
        textContent: newText,
        isEdited: true,
      });
    }

    // 4) düzenlem modundan çık
    close();
  };

  return (
    <>
      <input
        defaultValue={tweet.textContent}
        ref={inputRef}
        className="rounded p-1 px-2 text-black"
        type="text"
      />
      <button
        onClick={handleSave}
        className="mx-5 p-2 text-green-400 rounded-full shadow hover:shadow-green-500 "
      >
        <BiSolidSave />
      </button>
      <button
        onClick={close}
        className="mx-5 p-2 text-red-400 rounded-full shadow hover:shadow-red-500 "
      >
        <ImCancelCircle />
      </button>

      {tweet.imageContent && (
        <div className="relative">
          <img
            className={`${
              isPicDeleting ? 'blur' : ''
            } my-2 rounded-lg w-full object-cover max-h-[400px]`}
            src={tweet.imageContent}
          />
          <button
            onClick={() => setIsPicDeleting(!isPicDeleting)}
            className="absolute top-0 right-0 text-xl p-2 bg-white transition text-red-600 hover:scale-90 rounded-full"
          >
            {isPicDeleting ? <IoMdReturnLeft /> : <BsTrashFill />}
          </button>
        </div>
      )}
    </>
  );
};

export default EditMode;