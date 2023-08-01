import { sql } from "../database/database.js";

const add = async (name, id) => {
    await sql`INSERT INTO shopping_list_items (name, shopping_list_id) VALUES (${ name }, ${ id }) `;
  };

  const findUnColItems = async (listId) => {
    return await sql`SELECT * FROM shopping_list_items WHERE collected = FALSE AND shopping_list_id = ${listId} ORDER BY name ASC`;
  };

  const findColItems = async (listId) => {
    return await sql`SELECT * FROM shopping_list_items WHERE collected = TRUE AND shopping_list_id = ${listId} ORDER BY name ASC`;
  };
  const collectItem = async (id) => {
    await sql`UPDATE shopping_list_items SET collected = true WHERE id = ${ id }`;
  };
export { add, findUnColItems, findColItems, collectItem }