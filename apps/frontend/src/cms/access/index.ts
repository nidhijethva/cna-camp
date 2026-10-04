import type { Access } from "payload";

export const anyone: Access = () => true;
export const signedIn: Access = ({ req }) => Boolean(req.user);

/** Drafts stay private: the public only reads published documents. */
export const publishedOrSignedIn: Access = ({ req }) => (req.user ? true : { _status: { equals: "published" } });
