import { createCmdService } from "./CmdService";

const REST_API_CMD_FRS = "/commandesfournisseurs";

export const CmdFournisseurService = createCmdService(REST_API_CMD_FRS);
