import { BiMessageRounded } from 'react-icons/bi';
import { FaRetweet } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';
import { AiOutlineHeart } from 'react-icons/ai';
import { FiShare2 } from 'react-icons/fi';
import moment from 'moment/moment';
import 'moment/locale/tr';
import { auth, db } from '../../firebase/config';
import {
  arrayRemove,
  arrayUnion,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import Dropdown from './Dropdown';
import { useState } from 'react';
import EditMode from './EditMode';

const Post = ({ tweet }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  // aktif kullanıcı bu tweet'in like dizi içersinde var mı?
  const isLiked = tweet.likes.includes(auth.currentUser.uid);

  // tweet atılma tarihinin ne kadar zaman önce oldğunu hesapla
  const date = moment(tweet?.createdAt?.toDate()).fromNow();

  // tweet dökümanın likes dizisine oturumu açık olan
  // kullanıcının id'sini ekle
  const handleLike = async () => {
    // dökümanın referanısnı al
    const ref = doc(db, 'tweets', tweet.id);

    // dökümanın bir değerini güncelleme
    await updateDoc(ref, {
      likes: isLiked
        ? arrayRemove(auth.currentUser.uid) // like varsa kaldır
        : arrayUnion(auth.currentUser.uid), // like yoksa ekle
    });
  };

  // tweet'i kaldır
  const handleDelete = async () => {
    // kullcanıcın onayını alma
    if (confirm("Tweet'i silmeyi onaylıyor musunuz?")) {
      // kaldırıcağımız dökümanın referansını alma
      const tweetRef = doc(db, 'tweets', tweet.id);

      // dökümanı kaldır
      await deleteDoc(tweetRef);
    }
  };

  return (
    <div className="relative flex gap-3 py-6 px-3 border-b-[1px] border-gray-700">
      <img
        className="w-12 h-12 rounded-full"
        src={tweet.user.photo}
        alt="profile-pic"
      />

      <div className="w-full">
        {/* üst kısım > kullanıcı bilgileri */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 whitespace-nowrap">
            <p className="font-bold">{tweet.user.name}</p>
            <p className="text-gray-400">{tweet.user.name}</p>
            <p className="text-gray-400"> {date}</p>
            {tweet.isEdited && (
              <p className="text-gray-400 text-[10px]">
                * Düzenlendi
              </p>
            )}
          </div>

          {tweet.user.id === auth.currentUser.uid && (
            <Dropdown
              setIsEditMode={setIsEditMode}
              handleDelete={handleDelete}
            />
          )}
        </div>

        {/* orta kısım > tweet içeriği */}
        <div className="my-4">
          {/* düzenlem modundaysak editMode bileşenini ekran bas */}
          {isEditMode && (
            <EditMode
              tweet={tweet}
              close={() => setIsEditMode(false)}
            />
          )}

          {tweet.textContent && !isEditMode && (
            <p>{tweet.textContent}</p>
          )}

          {tweet.imageContent && !isEditMode && (
            <img
              className="my-2 rounded-lg w-full object-cover max-h-[400px]"
              src={tweet.imageContent}
            />
          )}
        </div>

        {/* alt kısım > etkileşim butonları */}
        <div className="flex justify-between">
          <div className="grid place-items-center py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#00b7ff69]">
            <BiMessageRounded />
          </div>

          <div className="grid place-items-center py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#00ff4436]">
            <FaRetweet />
          </div>

          <div
            onClick={handleLike}
            className="flex justify-center items-center gap-2 py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#e857d969]"
          >
            {isLiked ? <FcLike /> : <AiOutlineHeart />}
            <span>{tweet.likes.length}</span>
          </div>

          <div className="grid place-items-center py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#7e7e7ea8]">
            <FiShare2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;