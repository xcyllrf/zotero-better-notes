import { getFileContent } from "../../utils/str";

export async function injectEditorScripts(win: Window) {
  ztoolkit.UI.appendElement(
    {
      tag: "script",
      id: "betternotes-script",
      properties: {
        innerHTML: await getFileContent(
          rootURI + "chrome/content/scripts/editorScript.js",
        ),
      },
      ignoreIfExists: true,
    },
    win.document.head,
  );
}

export function injectEditorCSS(win: Window) {
  ztoolkit.UI.appendElement(
    {
      tag: "style",
      id: "betternotes-style",
      properties: {
        innerHTML: `
        .primary-editor > h1::before {
          margin-left: -64px !important;
          padding-left: 40px !important;
          content: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20width%3D%2218px%22%20height%3D%2218px%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2015.56%22%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill%3A%23666%3B%7D%3C%2Fstyle%3E%3C%2Fdefs%3E%3Ctitle%3E%E6%9C%AA%E6%A0%87%E9%A2%98-1%3C%2Ftitle%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M12.29%2C16.8H11.14V12.33H6.07V16.8H4.92V7H6.07v4.3h5.07V7h1.15Z%22%20transform%3D%22translate(0%20-4.22)%22%2F%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M18.05%2C16.8H16.93V8.41a4%2C4%2C0%2C0%2C1-.9.53%2C6.52%2C6.52%2C0%2C0%2C1-1.14.44l-.32-1a8.2%2C8.2%2C0%2C0%2C0%2C1.67-.67%2C6.31%2C6.31%2C0%2C0%2C0%2C1.39-1h.42Z%22%20transform%3D%22translate(0%20-4.22)%22%2F%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M21%2C5a2.25%2C2.25%2C0%2C0%2C1%2C2.25%2C2.25v9.56A2.25%2C2.25%2C0%2C0%2C1%2C21%2C19H3A2.25%2C2.25%2C0%2C0%2C1%2C.75%2C16.78V7.22A2.25%2C2.25%2C0%2C0%2C1%2C3%2C5H21m0-.75H3a3%2C3%2C0%2C0%2C0-3%2C3v9.56a3%2C3%2C0%2C0%2C0%2C3%2C3H21a3%2C3%2C0%2C0%2C0%2C3-3V7.22a3%2C3%2C0%2C0%2C0-3-3Z%22%20transform%3D%22translate(0%20-4.22)%22%2F%3E%3C%2Fsvg%3E") !important;
        }
        .primary-editor > h2::before {
          margin-left: -64px !important;
          padding-left: 40px !important;
          content: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20width%3D%2218px%22%20height%3D%2218px%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2015.56%22%3E%3Cdefs%3E%3Cstyle%3E.a%7Bfill%3A%23666%3B%7D%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cpath%20class%3D%22a%22%20d%3D%22M11.17%2C16.8H10V12.33H5V16.8H3.8V7H5v4.3H10V7h1.15Z%22%20transform%3D%22translate(0%20-4.22)%22%2F%3E%3Cpath%20class%3D%22a%22%20d%3D%22M14.14%2C16.8v-.48a4.1%2C4.1%2C0%2C0%2C1%2C.14-1.11%2C2.86%2C2.86%2C0%2C0%2C1%2C.45-.91%2C5.49%2C5.49%2C0%2C0%2C1%2C.83-.86c.33-.29.75-.61%2C1.24-1a7.43%2C7.43%2C0%2C0%2C0%2C.9-.73%2C3.9%2C3.9%2C0%2C0%2C0%2C.57-.7%2C2.22%2C2.22%2C0%2C0%2C0%2C.3-.66%2C2.87%2C2.87%2C0%2C0%2C0%2C.11-.77%2C1.89%2C1.89%2C0%2C0%2C0-.47-1.32%2C1.66%2C1.66%2C0%2C0%2C0-1.28-.5A3.17%2C3.17%2C0%2C0%2C0%2C15.7%2C8a3.49%2C3.49%2C0%2C0%2C0-1.08.76l-.68-.65a4.26%2C4.26%2C0%2C0%2C1%2C1.39-1A4%2C4%2C0%2C0%2C1%2C17%2C6.84a2.62%2C2.62%2C0%2C0%2C1%2C2.83%2C2.67%2C3.58%2C3.58%2C0%2C0%2C1-.15%2C1%2C3.09%2C3.09%2C0%2C0%2C1-.41.9%2C5.53%2C5.53%2C0%2C0%2C1-.67.81%2C9%2C9%2C0%2C0%2C1-.95.79c-.46.32-.84.59-1.13.82a4.68%2C4.68%2C0%2C0%2C0-.71.64%2C2%2C2%2C0%2C0%2C0-.38.6%2C2.08%2C2.08%2C0%2C0%2C0-.11.69h4.88v1Z%22%20transform%3D%22translate(0%20-4.22)%22%2F%3E%3Cpath%20class%3D%22a%22%20d%3D%22M21%2C5a2.25%2C2.25%2C0%2C0%2C1%2C2.25%2C2.25v9.56A2.25%2C2.25%2C0%2C0%2C1%2C21%2C19H3A2.25%2C2.25%2C0%2C0%2C1%2C.75%2C16.78V7.22A2.25%2C2.25%2C0%2C0%2C1%2C3%2C5H21m0-.75H3a3%2C3%2C0%2C0%2C0-3%2C3v9.56a3%2C3%2C0%2C0%2C0%2C3%2C3H21a3%2C3%2C0%2C0%2C0%2C3-3V7.22a3%2C3%2C0%2C0%2C0-3-3Z%22%20transform%3D%22translate(0%20-4.22)%22%2F%3E%3C%2Fsvg%3E") !important;
        }
        .primary-editor > h3::before {
          margin-left: -64px !important;
          padding-left: 40px !important;
          content: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20width%3D%2218px%22%20height%3D%2218px%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2015.56%22%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill%3A%23666%3B%7D%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M11.17%2C16.8H10V12.33H5V16.8H3.8V7H5v4.3H10V7h1.15Z%22%20transform%3D%22translate(0%20-4.22)%22%2F%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M14%2C16.14l.51-.8a4.75%2C4.75%2C0%2C0%2C0%2C1.1.52%2C4.27%2C4.27%2C0%2C0%2C0%2C1.12.16%2C2.29%2C2.29%2C0%2C0%2C0%2C1.64-.52A1.77%2C1.77%2C0%2C0%2C0%2C19%2C14.17a1.7%2C1.7%2C0%2C0%2C0-.68-1.48%2C3.6%2C3.6%2C0%2C0%2C0-2.06-.48H15.4v-1h.77A3%2C3%2C0%2C0%2C0%2C18%2C10.81a1.65%2C1.65%2C0%2C0%2C0%2C.6-1.41%2C1.47%2C1.47%2C0%2C0%2C0-.47-1.19A1.67%2C1.67%2C0%2C0%2C0%2C17%2C7.79a3.33%2C3.33%2C0%2C0%2C0-2.08.73l-.59-.75a4.4%2C4.4%2C0%2C0%2C1%2C1.28-.71A4.35%2C4.35%2C0%2C0%2C1%2C17%2C6.84a2.84%2C2.84%2C0%2C0%2C1%2C2%2C.65%2C2.21%2C2.21%2C0%2C0%2C1%2C.74%2C1.78%2C2.35%2C2.35%2C0%2C0%2C1-.49%2C1.5%2C2.7%2C2.7%2C0%2C0%2C1-1.46.89v0a2.74%2C2.74%2C0%2C0%2C1%2C1.65.74%2C2.15%2C2.15%2C0%2C0%2C1%2C.66%2C1.65%2C2.64%2C2.64%2C0%2C0%2C1-.9%2C2.12%2C3.44%2C3.44%2C0%2C0%2C1-2.34.78%2C5.3%2C5.3%2C0%2C0%2C1-1.48-.2A5%2C5%2C0%2C0%2C1%2C14%2C16.14Z%22%20transform%3D%22translate(0%20-4.22)%22%2F%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M21%2C5a2.25%2C2.25%2C0%2C0%2C1%2C2.25%2C2.25v9.56A2.25%2C2.25%2C0%2C0%2C1%2C21%2C19H3A2.25%2C2.25%2C0%2C0%2C1%2C.75%2C16.78V7.22A2.25%2C2.25%2C0%2C0%2C1%2C3%2C5H21m0-.75H3a3%2C3%2C0%2C0%2C0-3%2C3v9.56a3%2C3%2C0%2C0%2C0%2C3%2C3H21a3%2C3%2C0%2C0%2C0%2C3-3V7.22a3%2C3%2C0%2C0%2C0-3-3Z%22%20transform%3D%22translate(0%20-4.22)%22%2F%3E%3C%2Fsvg%3E") !important;
        }
        .primary-editor > h4::before {
          margin-left: -64px !important;
          padding-left: 40px !important;
          content: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20width%3D%2218px%22%20height%3D%2218px%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2015.56%22%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill%3A%23666%3B%7D%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M11.17%2C16.8H10V12.33H5V16.8H3.8V7H5v4.3H10V7h1.15Z%22%20transform%3D%22translate(0%20-4.22)%22%2F%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M19.43%2C6.92v6.59h1.05v1.05H19.43V16.9H18.31V14.56H13.66v-1c.43-.49.87-1%2C1.31-1.57s.87-1.13%2C1.27-1.7S17%2C9.14%2C17.36%2C8.57a16.51%2C16.51%2C0%2C0%2C0%2C.86-1.65Zm-4.49%2C6.59h3.37V8.63c-.34.61-.67%2C1.15-1%2C1.63s-.6.91-.87%2C1.3-.56.74-.81%2C1Z%22%20transform%3D%22translate(0%20-4.22)%22%2F%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M21%2C5a2.25%2C2.25%2C0%2C0%2C1%2C2.25%2C2.25v9.56A2.25%2C2.25%2C0%2C0%2C1%2C21%2C19H3A2.25%2C2.25%2C0%2C0%2C1%2C.75%2C16.78V7.22A2.25%2C2.25%2C0%2C0%2C1%2C3%2C5H21m0-.75H3a3%2C3%2C0%2C0%2C0-3%2C3v9.56a3%2C3%2C0%2C0%2C0%2C3%2C3H21a3%2C3%2C0%2C0%2C0%2C3-3V7.22a3%2C3%2C0%2C0%2C0-3-3Z%22%20transform%3D%22translate(0%20-4.22)%22%2F%3E%3C%2Fsvg%3E") !important;
        }
        .primary-editor > h5::before {
          margin-left: -64px !important;
          padding-left: 40px !important;
          content: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20width%3D%2218px%22%20height%3D%2218px%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2015.56%22%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill%3A%23666%3B%7D%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M11.17%2C16.8H10V12.33H5V16.8H3.8V7H5v4.3H10V7h1.15Z%22%20transform%3D%22translate(0%20-4.22)%22%2F%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M14%2C16l.58-.76a3.67%2C3.67%2C0%2C0%2C0%2C1%2C.58A3.44%2C3.44%2C0%2C0%2C0%2C16.8%2C16a2.17%2C2.17%2C0%2C0%2C0%2C1.58-.6A2%2C2%2C0%2C0%2C0%2C19%2C13.88a1.85%2C1.85%2C0%2C0%2C0-.64-1.5%2C2.83%2C2.83%2C0%2C0%2C0-1.86-.54c-.27%2C0-.55%2C0-.86%2C0s-.58%2C0-.81.06L15.17%2C7H19.7V8H16.14l-.2%2C2.88.47%2C0h.43a3.5%2C3.5%2C0%2C0%2C1%2C2.43.79%2C2.74%2C2.74%2C0%2C0%2C1%2C.88%2C2.16%2C3%2C3%2C0%2C0%2C1-.94%2C2.3%2C3.41%2C3.41%2C0%2C0%2C1-2.4.87%2C4.45%2C4.45%2C0%2C0%2C1-1.5-.24A4.81%2C4.81%2C0%2C0%2C1%2C14%2C16Z%22%20transform%3D%22translate(0%20-4.22)%22%2F%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M21%2C5a2.25%2C2.25%2C0%2C0%2C1%2C2.25%2C2.25v9.56A2.25%2C2.25%2C0%2C0%2C1%2C21%2C19H3A2.25%2C2.25%2C0%2C0%2C1%2C.75%2C16.78V7.22A2.25%2C2.25%2C0%2C0%2C1%2C3%2C5H21m0-.75H3a3%2C3%2C0%2C0%2C0-3%2C3v9.56a3%2C3%2C0%2C0%2C0%2C3%2C3H21a3%2C3%2C0%2C0%2C0%2C3-3V7.22a3%2C3%2C0%2C0%2C0-3-3Z%22%20transform%3D%22translate(0%20-4.22)%22%2F%3E%3C%2Fsvg%3E") !important;
        }
        .primary-editor > h6::before {
          margin-left: -64px !important;
          padding-left: 40px !important;
          content: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20width%3D%2218px%22%20height%3D%2218px%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2015.56%22%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill%3A%23666%3B%7D%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M11.17%2C16.8H10V12.33H5V16.8H3.8V7H5v4.3H10V7h1.15Z%22%20transform%3D%22translate(0%20-4.22)%22%2F%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M20.18%2C13.7a3.24%2C3.24%2C0%2C0%2C1-.88%2C2.38%2C2.94%2C2.94%2C0%2C0%2C1-2.2.9%2C2.69%2C2.69%2C0%2C0%2C1-2.31-1.17A5.59%2C5.59%2C0%2C0%2C1%2C14%2C12.49a12.18%2C12.18%2C0%2C0%2C1%2C.2-2.14%2C5.16%2C5.16%2C0%2C0%2C1%2C.84-2A3.65%2C3.65%2C0%2C0%2C1%2C16.27%2C7.2%2C3.71%2C3.71%2C0%2C0%2C1%2C18%2C6.84%2C3.14%2C3.14%2C0%2C0%2C1%2C19%2C7a3.59%2C3.59%2C0%2C0%2C1%2C1%2C.5l-.56.77a2.3%2C2.3%2C0%2C0%2C0-1.49-.48A2.3%2C2.3%2C0%2C0%2C0%2C16.79%2C8a3%2C3%2C0%2C0%2C0-.92.85%2C3.79%2C3.79%2C0%2C0%2C0-.56%2C1.25%2C6.56%2C6.56%2C0%2C0%2C0-.19%2C1.65h0a2.61%2C2.61%2C0%2C0%2C1%2C1-.84%2C2.91%2C2.91%2C0%2C0%2C1%2C1.23-.28%2C2.63%2C2.63%2C0%2C0%2C1%2C2%2C.85A3.09%2C3.09%2C0%2C0%2C1%2C20.18%2C13.7ZM19%2C13.78a2.28%2C2.28%2C0%2C0%2C0-.5-1.62%2C1.67%2C1.67%2C0%2C0%2C0-1.29-.54%2C2%2C2%2C0%2C0%2C0-1.5.58%2C2%2C2%2C0%2C0%2C0-.56%2C1.4%2C2.65%2C2.65%2C0%2C0%2C0%2C.55%2C1.74%2C1.85%2C1.85%2C0%2C0%2C0%2C2.78.1A2.38%2C2.38%2C0%2C0%2C0%2C19%2C13.78Z%22%20transform%3D%22translate(0%20-4.22)%22%2F%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M21%2C5a2.25%2C2.25%2C0%2C0%2C1%2C2.25%2C2.25v9.56A2.25%2C2.25%2C0%2C0%2C1%2C21%2C19H3A2.25%2C2.25%2C0%2C0%2C1%2C.75%2C16.78V7.22A2.25%2C2.25%2C0%2C0%2C1%2C3%2C5H21m0-.75H3a3%2C3%2C0%2C0%2C0-3%2C3v9.56a3%2C3%2C0%2C0%2C0%2C3%2C3H21a3%2C3%2C0%2C0%2C0%2C3-3V7.22a3%2C3%2C0%2C0%2C0-3-3Z%22%20transform%3D%22translate(0%20-4.22)%22%2F%3E%3C%2Fsvg%3E") !important;
        }
        .primary-editor > p, .primary-editor h1, .primary-editor h2, .primary-editor h3, .primary-editor h4, .primary-editor h5, .primary-editor h6, .primary-editor pre, .primary-editor blockquote, .primary-editor table, .primary-editor ul, .primary-editor ol, .primary-editor hr{
          max-width: unset
        }
      `,
      },
      ignoreIfExists: true,
    },
    win.document.head,
  );
}
