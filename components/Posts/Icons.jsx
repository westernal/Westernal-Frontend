import Image from "next/image";

const Icons = () => {
  return (
    <div className="icons">
      <Image src={"/Images/spotify.svg"} width={25} height={25} alt="spotify" />
      <Image
        src={"/Images/soundcloud.svg"}
        width={46}
        height={25}
        alt="soundcloud"
      />
      <Image src={"/Images/youtube.svg"} width={35} height={25} alt="youtube" />
      <Image src={"/Images/twitch.svg"} width={25} height={25} alt="twitch" />
      <Image
        src={"/Images/facebook.svg"}
        width={25}
        height={25}
        alt="facebook"
      />
      <Image src={"/Images/vimeo.svg"} width={25} height={25} alt="vimeo" />
    </div>
  );
};

export default Icons;
