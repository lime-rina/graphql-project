import { useQuery } from "@apollo/client";
import Card from "./Card";
import {
  GET_AUTHENTICATED_USER,
  GET_USER_TRANSACTIONS,
} from "../../graphql/queries/user.query";

const Cards = ({ userPicture }) => {
  const { data: authUser } = useQuery(GET_AUTHENTICATED_USER);

  const { data: userTransactions } = useQuery(GET_USER_TRANSACTIONS, {
    variables: {
      userId: authUser?.authUser?._id,
    },
  });
  return (
    <div className="w-full px-10 min-h-[40vh]">
      <p className="text-5xl font-bold text-center my-10">
        {userTransactions?.transactions?.length > 0 && "History"}
      </p>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20">
        {userTransactions?.user?.transactions?.map((transaction) => (
          <Card
            transaction={transaction}
            key={transaction._id}
            userPicture={userPicture}
          />
        ))}
      </div>
    </div>
  );
};
export default Cards;
