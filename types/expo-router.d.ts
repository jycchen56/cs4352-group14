declare module "expo-router" {
  export function useRouter(): { replace: (to: string) => void; push: (to: string) => void };
  export function useSearchParams(): Record<string, string>;
  export const router: { replace: (to: string) => void; push: (to: string) => void };
  const Stack: any;
  const Redirect: any;
  const Slot: any;
  export { Redirect, Slot, Stack };
  const _default: any;
  export default _default;
}
