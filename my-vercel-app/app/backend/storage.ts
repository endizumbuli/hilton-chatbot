// my-vercel-app/app/backend/storage.ts
// TEMP shim so other files can call storage.* without crashing.
// Every method returns a resolved Promise(undefined).

type AsyncAny = (...args: any[]) => Promise<any>;

const handler: ProxyHandler<Record<string, AsyncAny>> = {
  get() {
    return async () => undefined;
  },
};

export const storage = new Proxy({}, handler) as Record<string, AsyncAny>;
export default storage;
