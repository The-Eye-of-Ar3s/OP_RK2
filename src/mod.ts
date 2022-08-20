import { DependencyContainer } from "tsyringe";
import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";

class Mod implements IPostDBLoadMod
{
    private cfg = require("../config.json");

    postDBLoad(container: DependencyContainer): void {
        if (this.cfg.enabled)
        {
            const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
            const tables = databaseServer.getTables();
            const rk2 = tables.templates.items["5c1bc5af2e221602b412949b"];

            rk2._props.Ergonomics = this.cfg.ergo;
            rk2._props.Recoil = this.cfg.recoil;
        }
    }
}

module.exports = { mod: new Mod() }