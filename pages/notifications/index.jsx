import Footer from "../../components/layout/Footer";
import Image from "next/image";

const Notifications = () => {
    return ( <div className="notification">
        <div className="header">
            <p>Notifications</p>
        </div>

        <div className="profile-notif flex">
                <Image src={"/Images/userIcon.png"} width={50} height={50} style={{borderRadius: "50%"}} />
                <p id="userId">@Westernal</p>
                <p>started following you.</p>
        </div>
        <div className="profile-notif flex">
                <Image src={"/Images/userIcon.png"} width={50} height={50} style={{borderRadius: "50%"}} />
               <p> <span id="userId">@Westernal </span>
                liked your post:
                <span id="post-title2">why westernal?</span></p>
        </div>

        <div className="mb-100"></div>

        <Footer />
    </div> );
}
 
export default Notifications;