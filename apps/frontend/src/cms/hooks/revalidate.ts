import { revalidatePath } from "next/cache";
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook, PayloadRequest } from "payload";

/**
 * Content is shared across many pages (trip cards, enquiry dropdowns, contact details in the
 * header and footer), so any change refreshes the whole site. It is small and edits are rare.
 */
function refreshSite(req: PayloadRequest) {
  // Scripts such as the seed run outside Next.js, where there is no cache to refresh.
  if (req.context.skipRevalidate) return;
  revalidatePath("/", "layout");
}

/** Draft saves never reach the site; publishing, unpublishing and plain saves do. */
const isDraftOnly = (doc: { _status?: string }, previousDoc?: { _status?: string }) =>
  doc._status === "draft" && previousDoc?._status !== "published";

const afterChange: CollectionAfterChangeHook = ({ doc, previousDoc, req }) => {
  if (!isDraftOnly(doc, previousDoc)) refreshSite(req);
  return doc;
};

const afterDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
  refreshSite(req);
  return doc;
};

const afterGlobalChange: GlobalAfterChangeHook = ({ doc, previousDoc, req }) => {
  if (!isDraftOnly(doc, previousDoc)) refreshSite(req);
  return doc;
};

export const revalidateSite = { afterChange: [afterChange], afterDelete: [afterDelete] };

export const revalidateSiteGlobal = { afterChange: [afterGlobalChange] };
