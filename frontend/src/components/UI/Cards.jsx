import Card from "./Card";

const Cards = ({ transactions, userPicture }) => {
  return (
    <div className="w-full px-10 min-h-[40vh]">
      <p className="text-5xl font-bold text-center my-10">
        {transactions?.length > 0 && "History"}
      </p>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20">
        {transactions?.map((transaction) => (
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
