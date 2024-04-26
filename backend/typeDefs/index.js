import { mergeTypeDefs } from "@graphql-tools/merge";
import userTypeDef from "./user.typedef.js";
import transactionTypeDef from "./transaction.typedef.js";

const mergedTypeDefs = mergeTypeDefs([userTypeDef, transactionTypeDef]);

export default mergedTypeDefs;
