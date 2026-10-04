import { revalidatePath } from "next/cache";
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook, PayloadRequest } from "payload";

type PathsFor<T> = (doc: T) => string[];

function revalidate(req: PayloadRequest, paths: string[]) {
  // Seed scripts run outside Next.js, where there is no cache to revalidate.
  if (req.context.skipRevalidate) return;
  for (const path of new Set(paths)) {
    req.payload.logger.info(`Revalidating ${path}`);
    revalidatePath(path);
  }
}

export function revalidateCollection<T extends Record<string, unknown>>(pathsFor: PathsFor<T>) {
  const afterChange: CollectionAfterChangeHook = ({ doc, previousDoc, req }) => {
    revalidate(req, [...pathsFor(doc as T), ...(previousDoc ? pathsFor(previousDoc as T) : [])]);
    return doc;
  };
  const afterDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
    revalidate(req, pathsFor(doc as T));
    return doc;
  };
  return { afterChange: [afterChange], afterDelete: [afterDelete] };
}

export function revalidateGlobal(paths: string[]): GlobalAfterChangeHook[] {
  return [
    ({ doc, req }) => {
      revalidate(req, paths);
      return doc;
    },
  ];
}
