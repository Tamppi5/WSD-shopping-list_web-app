import { sql } from "../database/database.js";

const create = async (name) => {
    await sql`INSERT INTO shopping_lists (name) VALUES (${ name })`;
  };

const findById = async (id) => {
    const rows = await sql`SELECT * FROM shopping_lists WHERE id = ${ id }`;
  
    if (rows && rows.length > 0) {
      return rows[0];
    }
  
    return { id: 0, name: "Unknown" };
  };

const findAllActiveLists = async () => {
    return await sql`SELECT * FROM shopping_lists WHERE active = true`;
  };

const deactivateById = async (id) => {
    await sql`UPDATE shopping_lists SET active = false WHERE id = ${ id }`;
  };

const listCount = async () => {
  const rows = await sql`SELECT COUNT(id) AS list_count
    FROM shopping_lists`;

    if (rows && rows[0] && rows[0].list_count) {
      return rows[0].list_count;
    }

    return 0;
  }; 

  const itemCount = async () => {
    const rows = await sql`SELECT COUNT(id) AS item_count
    FROM shopping_list_items`;

    if (rows && rows[0] && rows[0].item_count) {
      return rows[0].item_count;
    }

    return 0;
  }; 
export { findAllActiveLists, findById, create, deactivateById, listCount, itemCount }