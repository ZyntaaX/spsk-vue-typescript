import { DateTime } from 'luxon';

export type PostModel = {
    id: string | undefined;

    title: string;
    subheader: string;
    content: string;

    created_at: DateTime;
    updated_at: DateTime;
    published_at: DateTime;

    published: boolean;

    author_id: string;

    category_id: string;
}

export function mapPostModel(apiResponse: any): PostModel {
    const {
        id, title, subheader, content, created_at, updated_at, published, author_id, category_id, published_at
    } = apiResponse;
    return {
        id, title, subheader, content, created_at, updated_at, published, author_id, category_id, published_at
    } as PostModel;
}
