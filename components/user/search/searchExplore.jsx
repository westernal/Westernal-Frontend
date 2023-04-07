import { useMemo, useState } from "react";
import getRequest from "../../../functions/requests/getRequest";
import VerifiedUsers from "../verified/verifiedUsers";

const SearchExplore = () => {
  const [users, SetUsers] = useState([]);

  useMemo(async () => {
    const result = await getRequest("api/users/verified/featured");
    SetUsers(result?.data?.users);
    console.log(result);
  }, []);
  return (
    <section className="search-explore">
      <h1 id="website-name">westernal</h1>
      <h2>Start following new people.</h2>
      <VerifiedUsers users={users} />
    </section>
  );
};

export default SearchExplore;
