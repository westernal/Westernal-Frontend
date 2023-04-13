import share1 from "../../public/Images/Frame 85.svg";
import share2 from "../../public/Images/Frame 85 (1).svg";
import share3 from "../../public/Images/Frame 86.svg";
import { useEffect } from "react";
import Image from "next/image";

const PWAModal = () => {
  useEffect(() => {
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close1")[0];

    if (modal != null) {
      span.addEventListener("click", function () {
        modal.style.display = "none";
        (
          document.getElementsByClassName("login")[0] as HTMLElement
        ).style.display = "flex";
      });
    }
  }, []);
  return (
    <div className="pwa">
      <section id="myModal" className="modal">
        <div className="modal-content flex">
          <section className="modal-main auth-form">
            <div className="flex install-header">
              <p>Install the app</p>
              <button className="close1">&times;</button>
            </div>
            <section className="flex app-info">
              <div className="app-logo">
                <Image
                  src={"/Images/logo.png"}
                  alt="logo"
                  width={50}
                  height={50}
                />
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
                <Image
                  width={35}
                  height={35}
                  src={share2.src}
                  alt="HomeScreen"
                />
                <p>Choose Add To Homescreen.</p>
              </div>
              <div className="grid">
                <Image width={35} height={35} src={share3.src} alt="Add" />
                <p>Click Add.</p>
              </div>
            </section>
          </section>
        </div>
      </section>
    </div>
  );
};

export default PWAModal;
