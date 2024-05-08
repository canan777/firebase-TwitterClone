import { BiDoorOpen } from 'react-icons/bi';
import { navSections } from './../constants/index';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';

const Nav = ({ user }) => {
  return (
    <div className="flex flex-col justify-between items-end px-2 py-4">
      {/* linkler */}
      <div>
        <img className="w-14 mb-4" src="x-logo.webp" />

        {navSections.map((i) => (
          <div
            key={i.title}
            className="flex justify-center md:justify-normal items-center gap-3 text-2xl md:text-xl p-3 cursor-pointer transition rounded-lg hover:bg-[#505050b7]"
          >
            {i.icon}
            <span className="max-md:hidden whitespace-nowrap">
              {i.title}
            </span>
          </div>
        ))}
      </div>

      {/* kullanıcı bilgileri */}
      <div>
        {!user ? (
          <div className="w-12 h-12 bg-gray-300 rounded-full animate-bounce"></div>
        ) : (
          <div className="flex flex-col gap-5">
            <div className="flex gap-2 items-center">
              <img
                className="w-12 h-12 rounded-full"
                src={user?.photoURL}
              />
              <p className="max-md:hidden">{user.displayName}</p>
            </div>

            <button
              onClick={() => signOut(auth)}
              className="flex justify-center gap-2 p-1 items-center bg-gray-700 rounded text-2xl md:text-[15px] transition hover:bg-gray-800"
            >
              <BiDoorOpen />
              <span className="max-md:hidden">Çıkış Yap</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;