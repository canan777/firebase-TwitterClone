import { useEffect, useState } from 'react';
import Form from './Form';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from '../firebase/config';
import Spinner from './Spinner';
import Post from './Post';

const Main = ({ user }) => {
  const [tweets, setTweets] = useState(null);
  const tweetsCol = collection(db, 'tweets');

  // tweet kolleksiyonundaki verileri anlık olarak al
  useEffect(() => {
    // filtreleme ayarı tanımla
    const q = query(tweetsCol, orderBy('createdAt', 'desc'));

    const unsub = onSnapshot(q, (snapshot) => {
      // geçici dizinp
      const tempTweets = [];

      // bütün dökümanları dön
      snapshot.forEach((doc) => {
        tempTweets.push({ id: doc.id, ...doc.data() });
      });

      // veriyi state'e aktar
      setTweets(tempTweets);
    });

    // sayfadan çıkınca aboneliği bitir
    return () => unsub();
  }, []);

  return (
    <main className="border border-gray-700 overflow-y-auto">
      <header className="font-bold p-4 border-b-[1px] border-gray-700">
        Anasayfa
      </header>

      <Form user={user} />

      {!tweets ? (
        <Spinner style={'w-6 h-6 mx-auto my-10'} />
      ) : (
        tweets.map((tweet) => <Post key={tweet.id} tweet={tweet} />)
      )}
    </main>
  );
};

export default Main;