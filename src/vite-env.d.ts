
/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: {
    readonly MODE: string;
    readonly BASE_URL: string;
    readonly DEV: boolean;
    readonly PROD: boolean;
    readonly SSR: boolean;
    readonly VITE_API_URL?: string;
  }
}
