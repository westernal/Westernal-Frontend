import { getServerSideSitemapLegacy } from "next-sitemap";
import getRequest from "../../functions/requests/getRequest";

export const getServerSideProps = async (context) => {
  const result = await getRequest("api/users");

  const fields = result.data.users.map((user) => ({
    loc: `https://www.westernal.net/${user.username}`,
    lastmod: new Date().toISOString(),
  }));

  return getServerSideSitemapLegacy(context, fields);
};

export default function Site() {}
