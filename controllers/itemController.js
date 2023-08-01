import { renderFile } from "../deps.js";
import * as requestUtils from "../utils/requestUtils.js";
import * as listService from "../services/listService.js";
import * as itemService from "../services/itemService.js";

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
  };

  const viewList = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const listId = urlParts[2]
    const data = {
      list: await listService.findById(listId),
      unColItems: await itemService.findUnColItems(listId),
      colItems: await itemService.findColItems(listId)
    };
  
    return new Response(await renderFile("list.eta", data), responseDetails);
  };

  const addItem = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const listId = urlParts[2]
    const formData = await request.formData();
    const name = formData.get("name");
  
    await itemService.add(name, listId);
  
    return requestUtils.redirectTo(`/lists/${listId}`);
  };

  const collectItem = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const listId = urlParts[2];
    const itemId = urlParts[4];
    await itemService.collectItem(itemId);
  
    return requestUtils.redirectTo(`/lists/${listId}`);
  };
  export { viewList, addItem, collectItem}