import { AddonBase } from "./base";

class AddonSync extends AddonBase {
  triggerTime: number;
  private io: {
    dataIn: any;
    dataOut: any;
    deferred?: typeof Promise;
  };
  private _window: Window;
  constructor(parent: Knowledge4Zotero) {
    super(parent);
  }

  doLoad(_window: Window) {
    this._window = _window;
    this.io = (this._window as unknown as XULWindow).arguments[0];
    this.doUpdate();
  }

  doUpdate() {
    const syncInfo = this.getNoteSyncStatus(this.io.dataIn);
    this._window.document
      .getElementById("Knowledge4Zotero-sync-path")
      .setAttribute(
        "value",
        `${decodeURIComponent(syncInfo.path)}/${decodeURIComponent(
          syncInfo.filename
        )}`
      );

    let lastSync: string;
    const lastSyncTime = Number(syncInfo.lastsync);
    const currentTime = new Date().getTime();
    if (currentTime - lastSyncTime <= 60000) {
      lastSync = `${Math.round(
        (currentTime - lastSyncTime) / 1000
      )} seconds ago.`;
    } else if (currentTime - lastSyncTime <= 3600000) {
      lastSync = `${Math.round(
        (currentTime - lastSyncTime) / 60000
      )} minutes ago.`;
    } else {
      lastSync = new Date(lastSyncTime).toLocaleString();
    }
    this._window.document
      .getElementById("Knowledge4Zotero-sync-lastsync")
      .setAttribute("value", lastSync);
    setTimeout(() => {
      if (!this._window.closed) {
        this.doUpdate();
      }
    }, 3000);
  }

  doUnload() {
    this.io.deferred && this.io.deferred.resolve();
  }

  async doAccept() {
    // Update Settings
    let enable = (
      this._window.document.getElementById(
        "Knowledge4Zotero-sync-enable"
      ) as XUL.Checkbox
    ).checked;
    if (!enable) {
      const note = this.io.dataIn;
      const allNoteIds = await this.getRelatedNoteIds(note);
      const notes = Zotero.Items.get(allNoteIds);
      for (const item of notes) {
        await this.removeSyncNote(item);
      }
      this._Addon.views.showProgressWindow(
        "Better Notes",
        `Cancel sync of ${notes.length} notes.`
      );
    }
  }
  doExport() {
    this.io.dataOut.export = true;
    (this._window.document.querySelector("dialog") as any).acceptDialog();
  }

  getSyncNoteIds(): Number[] {
    const ids = Zotero.Prefs.get("Knowledge4Zotero.syncNoteIds");
    if (typeof ids === "undefined") {
      Zotero.Prefs.set("Knowledge4Zotero.syncNoteIds", "");
      return [];
    }
    return ids.split(",").map((id: string) => Number(id));
  }

  async getRelatedNoteIds(note: ZoteroItem): Promise<Number[]> {
    let allNoteIds: Number[] = [note.id];
    const subNoteIds = (
      await Promise.all(
        note
          .getNote()
          .match(/zotero:\/\/note\/\w+\/\w+\//g)
          .map(async (link) => this._Addon.knowledge.getNoteFromLink(link))
      )
    )
      .filter((res) => res.item)
      .map((res) => res.item.id);
    allNoteIds = allNoteIds.concat(subNoteIds);
    allNoteIds = new Array(...new Set(allNoteIds));
    return allNoteIds;
  }

  addSyncNote(noteItem: ZoteroItem) {
    const ids = this.getSyncNoteIds();
    if (ids.includes(noteItem.id)) {
      return;
    }
    ids.push(noteItem.id);
    Zotero.Prefs.set("Knowledge4Zotero.syncNoteIds", ids.join(","));
  }

  async removeSyncNote(noteItem: ZoteroItem) {
    const ids = this.getSyncNoteIds();
    Zotero.Prefs.set(
      "Knowledge4Zotero.syncNoteIds",
      ids.filter((id) => id !== noteItem.id).join(",")
    );
    const sycnTag = noteItem.getTags().find((t) => t.tag.includes("sync://"));
    if (sycnTag) {
      noteItem.removeTag(sycnTag.tag);
    }
    await noteItem.saveTx();
  }

  getNoteSyncStatus(noteItem: ZoteroItem): any {
    const sycnInfo = noteItem.getTags().find((t) => t.tag.includes("sync://"));
    if (!sycnInfo) {
      return false;
    }
    const params = {};
    sycnInfo.tag
      .split("?")
      .pop()
      .split("&")
      .forEach((p) => {
        params[p.split("=")[0]] = p.split("=")[1];
      });
    return params;
  }

  async updateNoteSyncStatus(
    noteItem: ZoteroItem,
    path: string = "",
    filename: string = ""
  ) {
    this.addSyncNote(noteItem);
    const syncInfo = this.getNoteSyncStatus(noteItem);
    const sycnTag = noteItem.getTags().find((t) => t.tag.includes("sync://"));
    if (sycnTag) {
      noteItem.removeTag(sycnTag.tag);
    }
    noteItem.addTag(
      `sync://note/?version=${noteItem._version}&path=${
        path ? encodeURIComponent(path) : syncInfo["path"]
      }&filename=${
        filename ? encodeURIComponent(filename) : syncInfo["filename"]
      }&lastsync=${new Date().getTime()}`,
      undefined
    );
    await noteItem.saveTx();
  }

  setSync() {
    const _t = new Date().getTime();
    this.triggerTime = _t;
    setTimeout(() => {
      if (this.triggerTime === _t) {
        this.doSync();
      }
    }, 30000);
  }

  async doSync(force: boolean = false) {
    Zotero.debug("Better Notes: sync start");
    const items = Zotero.Items.get(this.getSyncNoteIds());
    const toExport = {};
    const forceNoteIds = force
      ? await this.getRelatedNoteIds(this.io.dataIn)
      : [];
    for (const item of items) {
      const syncInfo = this.getNoteSyncStatus(item);
      const filepath = decodeURIComponent(syncInfo.path);
      const filename = decodeURIComponent(syncInfo.filename);
      if (
        Number(syncInfo.version) < item._version - 1 ||
        !(await OS.File.exists(`${filepath}/${filename}`)) ||
        forceNoteIds.includes(item.id)
      ) {
        if (Object.keys(toExport).includes(filepath)) {
          toExport[filepath].push(item);
        } else {
          toExport[filepath] = [item];
        }
      }
    }
    console.log(toExport);
    for (const filepath of Object.keys(toExport)) {
      await this._Addon.knowledge.syncNotesToFile(toExport[filepath], filepath);
    }
    if (this._window && !this._window.closed) {
      this.doUpdate();
    }
  }
}

export default AddonSync;
