declare const _globalThis: {
  [key: string]: any;
  Zotero: _ZoteroTypes.Zotero;
  ZoteroPane: _ZoteroTypes.ZoteroPane;
  Zotero_Tabs: typeof Zotero_Tabs;
  window: Window;
  document: Document;
  OS: typeof OS;
  Blob: typeof Blob;
  ztoolkit: ZToolkit;
  addon: typeof addon;
};

declare interface Window {
  openDialog(
    url?: string | URL,
    target?: string,
    features?: string,
    ...args: any
  ): Window;
}

declare type ZToolkit = ReturnType<
  typeof import("../src/utils/ztoolkit").createZToolkit
>;

declare const ztoolkit: ZToolkit;

declare const rootURI: string;

declare const addon: import("../src/addon").default;

declare const __env__: "production" | "development";

declare class Localization {}

declare class XULElementBase extends HTMLElement {
  get content(): DocumentFragment;
  init(): void;
  destroy(): void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string,
  ): void;
  static get observedAttributes(): string[];
}

declare class MozXULElement {
  static parseXULToFragment(xul: string): Fragment;
  static insertFTLIfNeeded(ftl: string): void;
}
