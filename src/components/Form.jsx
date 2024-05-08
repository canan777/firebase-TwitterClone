import { BsCardImage } from 'react-icons/bs';
import {
  addDoc,
  collection,
  serverTimestamp,
} from 'firebase/firestore';
import { db, storage } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { toast } from 'react-toastify';
import { useState } from 'react';
import Spinner from './Spinner';

const Form = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);

  // tweets kolleksiyonun refernasını al
  const tweetsCol = collection(db, 'tweets');

  // dosya eğer resimse, resmi storage'a yükle
  // resmin url'ini fonksiyonun çağrldığı yere döndür
  const uploadImage = async (file) => {
    // 1) dosya resim değilse fonksiyonu durdur
    if (!file || !file.type.startsWith('image')) return null;

    // 2) dosyanın yükleneceği yerin referansını oluştur
    const fileRef = ref(storage, v4() + file.name);

    // 3) referansını oluşturğumuz yere dosyayı yükle
    await uploadBytes(fileRef, file);

    // 4) yüklenen dosyanın url'ine eriş
    return await getDownloadURL(fileRef);
  };

  // formun gönderilmesi
  const handleSubmit = async (e) => {
    e.preventDefault();
    // inputlardaki veriler eriş
    const textContent = e.target[0].value;
    const imageContent = e.target[1].files[0];

    // yazı veya resim içeriği yoksa uyarı ver
    if (!textContent && !imageContent)
      return toast.info('Lütfen içerik giriniz');

    setIsLoading(true);

    // resmi yükle
    const url = await uploadImage(imageContent);

    // tweets kolleksiyonuna yeni döküman ekle
    await addDoc(tweetsCol, {
      textContent,
      imageContent: url,
      createdAt: serverTimestamp(),
      user: {
        id: user.uid,
        name: user.displayName,
        photo: user.photoURL,
      },
      likes: [],
      isEdited: false,
    });

    // formu sıfırla
    e.target.reset();

    // yüklenmeyi sonlandır
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 p-4 border-b-[1px] border-gray-700"
    >
      <img
        className="rounded-full h-[35px] md:h-[45px] mt-1"
        src={user?.photoURL}
        alt="profile-pic"
      />

      <div className="w-full">
        <input
          type="text"
          className="w-full bg-transparent my-2 outline-none md:text-lg"
          placeholder="Neler Oluyor?"
        />

        <div className="flex justify-between items-center">
          <label
            htmlFor="image-input"
            className="hover:bg-gray-800 text-lg transition p-4 cursor-pointer rounded-full"
          >
            <BsCardImage />
          </label>

          <input className="hidden" id="image-input" type="file" />

          <button
            disabled={isLoading}
            className="bg-blue-600 flex items-center justify-center px-4 py-2 min-w-[85px] min-h-[40px] rounded-full transition hover:bg-blue-800"
          >
            {isLoading ? <Spinner /> : 'Tweetle'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
