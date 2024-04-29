const transactionTypeDef = `#graphql
type Transaction{
    _id:ID!
    userId: ID!
    description:String!
    paymentType:String!
    category:String!
    amount:Float!
    location:String
    date:String!
}

type Query{
    transactions: [Transaction!]
    transaction(trnsactionId:ID!): Transaction
    categoryStatistics: [CategoryStatistics!]
}

input CreateTransactionInput{
    description:String!
    paymentType:String!
    category:String!
    amount:Float!
    location:String
    date:String!
}
input UpdateTransactionInput{
    transactionId:ID!
    description:String
    paymentType:String
    category:String
    amount:Float
    location:String
    date:String
}

type Mutation{
    createTransaction(input:CreateTransactionInput):Transaction!
    updateTransaction(input:UpdateTransactionInput):Transaction!
    deleteTransaction(trnsactionId:ID!):Transaction!
}

type CategoryStatistics {
    category: String!
    totalAmount: Float!
  }
`;

export default transactionTypeDef;
