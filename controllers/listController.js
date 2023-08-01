import { renderFile } from "../deps.js";
import * as requestUtils from "../utils/requestUtils.js";
import * as listService from "../services/listService.js";

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
  };

  const viewMain = async (request) => {
    const data = {
      listC: await listService.listCount(),
      itemC: await listService.itemCount(),
    };
    return new Response(await renderFile("mainPage.eta", data), responseDetails);
  };

  const viewLists = async (request) => {
    const data = {
      lists: await listService.findAllActiveLists(),
    };
  
    return new Response(await renderFile("lists.eta", data), responseDetails);
  };

  const viewList = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
  
    const data = {
      list: await listService.findById(urlParts[2]),
    };
  
    return new Response(await renderFile("list.eta", data), responseDetails);
  };

  const addList = async (request) => {
    const formData = await request.formData();
    const name = formData.get("name");
  
    await listService.create(name);
  
    return requestUtils.redirectTo("/lists");
  };


  const deactivateList = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    await listService.deactivateById(urlParts[2]);
    return requestUtils.redirectTo("/lists");
  };

export { viewMain, viewLists, viewList, addList, deactivateList }