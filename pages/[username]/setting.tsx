import Footer from "../../components/layout/Footer";
import BackHeader from "../../components/layout/header/BackHeader";
import Logout from "../../components/authentication/Logout";
import SettingForm from "../../components/authentication/form/SettingForm";
import getRequest from "../../functions/requests/getRequest";
import { User } from "../../interfaces/interface";

const Setting = ({ user }: { user: User }) => {
  return (
    <>
      <BackHeader title={"Setting"} />

      <main className="setting flex">
        <section className="auth-form">
          <SettingForm user={user} />
        </section>

        <div className="setting-btns">
          <a href="mailto:support@contact.westernal.net">
            <button className="contact-btn">Contact Support</button>
          </a>
          <Logout />
        </div>
      </main>

      <Footer />
    </>
  );
};

Setting.getInitialProps = async (context: any) => {
  const username: string = context.query.username;
  const result = await getRequest(`api/posts/user/${username}`);

  if (result?.status == 404 || !result) {
    context.res.writeHead(307, { Location: "/404" });
    context.res.end();
  }

  return {
    user: result.data.creator,
  };
};

export default Setting;
