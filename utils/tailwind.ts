import resolve from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config";

const twConfig = resolve(tailwindConfig);
const mdBreakpoint = Number.parseInt((twConfig.theme.screens as any).md);

export { mdBreakpoint };
