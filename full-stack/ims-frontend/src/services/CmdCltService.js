import { createCmdService } from "./CmdService";

const REST_API_CMD_CLT = "/commandesclients";

export const CmdClientService = createCmdService(REST_API_CMD_CLT);
