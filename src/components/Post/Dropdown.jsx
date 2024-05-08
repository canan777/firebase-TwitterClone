import { useRef } from 'react';

const Dropdown = ({ handleDelete, setIsEditMode }) => {
  const checkbox = useRef();
  return (
    <>
      <label className="popup">
        <input ref={checkbox} type="checkbox" />
        <div className="burger" tabindex="0">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav className="popup-window">
          <legend>Aksiyonlar</legend>
          <ul>
            <li>
              <button
                onClick={() => {
                  // chekbox'ın tikini kaldır
                  checkbox.current.checked = false;

                  // edit modunu aktif et
                  setIsEditMode(true);
                }}
              >
                <img src="edit.svg" />
                <span>Düzenle</span>
              </button>
            </li>
            <hr />
            <li>
              <button onClick={handleDelete}>
                <img src="/delete.svg" />
                <span>Sil</span>
              </button>
            </li>
          </ul>
        </nav>
      </label>
    </>
  );
};

export default Dropdown;