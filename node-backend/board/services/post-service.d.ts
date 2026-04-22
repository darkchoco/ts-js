import type { Collection } from 'mongodb';
declare function writePost(collection: Collection, post: any): Promise<import("mongodb").InsertOneResult<import("mongodb").Document>>;
declare function list(collection: Collection, page: number, search: string): Promise<(import("mongodb").WithId<import("mongodb").Document>[] | import("../utils/paginator.js").PaginatorResult)[]>;
declare function getDetailPost(collection: Collection, id: string): Promise<import("mongodb").WithId<import("mongodb").Document> | null>;
declare function getPostByIdAndPassword(collection: Collection, { id, password }: {
    id: string;
    password: string;
}): Promise<import("mongodb").WithId<import("mongodb").Document> | null>;
declare function getPostById(collection: Collection, id: string): Promise<import("mongodb").WithId<import("mongodb").Document> | null>;
declare function updatePost(collection: Collection, id: string, post: any): Promise<import("mongodb").UpdateResult<import("mongodb").Document>>;
declare function deletePost(collection: Collection, id: string, password: string): Promise<import("mongodb").DeleteResult>;
declare function deleteComment(collection: Collection, id: string, commentIdx: number, password: string): Promise<import("mongodb").WithId<import("mongodb").Document> | null>;
declare const _default: {
    writePost: typeof writePost;
    list: typeof list;
    getDetailPost: typeof getDetailPost;
    getPostByIdAndPassword: typeof getPostByIdAndPassword;
    getPostById: typeof getPostById;
    updatePost: typeof updatePost;
    deletePost: typeof deletePost;
    deleteComment: typeof deleteComment;
};
export default _default;
//# sourceMappingURL=post-service.d.ts.map