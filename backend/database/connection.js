import knex from "knex";
import dbConfig from "../config/database.js";

const db = knex(dbConfig);

export default db;
