import share1 from "../../public/Images/Frame 85.svg";
import share2 from "../../public/Images/Frame 85 (1).svg";
import share3 from "../../public/Images/Frame 86.svg";
import Image from "next/image";

const PWAModal = () => {
  const closeModal = () => {
    const modal = document.querySelector("dialog");

    modal.close();
  };
  return (
    <dialog className="modal-main auth-form dialog">
      <div className="flex install-header">
        <p>Install the app</p>
        <button className="close1" onClick={closeModal}>
          &times;
        </button>
      </div>
      <section className="flex app-info">
        <div className="app-logo">
          <Image src={"/Images/logo.png"} alt="logo" width={50} height={50} />
        </div>
        <div className="app-name">
          <p>Westernal</p>
          <p className="app-link">westernal.net</p>
        </div>
      </section>

      <section className="share-info">
        <div className="grid">
          <Image width={35} height={35} src={share1.src} alt="share" />
          <p>Click on share button.</p>
        </div>
        <div className="grid">
          <Image width={35} height={35} src={share2.src} alt="HomeScreen" />
          <p>Choose Add To Homescreen.</p>
        </div>
        <div className="grid">
          <Image width={35} height={35} src={share3.src} alt="Add" />
          <p>Click Add.</p>
        </div>
      </section>
    </dialog>
  );
};

export default PWAModal;
