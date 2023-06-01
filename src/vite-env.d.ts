/// <reference types="vite/client" />

declare module "*.png";
declare module "*.sass";

interface ImportMeta {
  readonly env: ImportMetaEnv;
}