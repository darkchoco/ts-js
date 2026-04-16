import type { Collection } from 'mongodb';
declare function writePost(collection: Collection, post: any): Promise<import("mongodb").InsertOneResult<import("mongodb").Document>>;
declare const _default: {
    writePost: typeof writePost;
};
export default _default;
//# sourceMappingURL=post-service.d.ts.map