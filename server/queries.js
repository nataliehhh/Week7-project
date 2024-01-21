export const selectAllPostsQuery = `
SELECT
    posts.id,
    posts.username,
    posts.brew_name,
    posts.roaster_name,
    posts.single_origin,
    process.process,
    brew_method.method,
    posts.review,
    posts.image,
    (
        SELECT STRING_AGG(COALESCE(origin_country.origin_country, ''), ', ' ORDER BY origin_country.origin_country)
        FROM posts_origin_country
        LEFT JOIN origin_country ON posts_origin_country.origin_country_id = origin_country.id
        WHERE posts_origin_country.posts_id = posts.id 
    ) AS origin_country,
    (
        SELECT STRING_AGG(COALESCE(flavour_tags.flavour_tags, ''),  ', ' ORDER BY flavour_tags.flavour_tags)
        FROM posts_flavour_tags
        LEFT JOIN flavour_tags ON posts_flavour_tags.flavour_tags_id = flavour_tags.id
        WHERE posts_flavour_tags.posts_id = posts.id 
    ) AS flavour_tags
FROM
    posts
LEFT JOIN process ON posts.process_id = process.id
LEFT JOIN brew_method ON posts.brew_method_id = brew_method.id
GROUP BY
    posts.id,
    posts.username,
    posts.brew_name,
    posts.roaster_name,
    posts.single_origin,
    process.process,
    brew_method.method,
    posts.review,
    posts.image; 
    `;

export const selectPostById = `
SELECT
    posts.id,
    posts.username,
    posts.brew_name,
    posts.roaster_name,
    posts.single_origin,
    process.process,
    brew_method.method,
    posts.review,
    posts.image,
    (
        SELECT STRING_AGG(COALESCE(origin_country.origin_country, ''), ', ' ORDER BY origin_country.origin_country)
        FROM posts_origin_country
        LEFT JOIN origin_country ON posts_origin_country.origin_country_id = origin_country.id
        WHERE posts_origin_country.posts_id = posts.id 
    ) AS origin_country,
    (
        SELECT STRING_AGG(COALESCE(flavour_tags.flavour_tags, ''),  ', ' ORDER BY flavour_tags.flavour_tags)
        FROM posts_flavour_tags
        LEFT JOIN flavour_tags ON posts_flavour_tags.flavour_tags_id = flavour_tags.id
        WHERE posts_flavour_tags.posts_id = posts.id 
    ) AS flavour_tags
FROM
    posts
LEFT JOIN process ON posts.process_id = process.id
LEFT JOIN brew_method ON posts.brew_method_id = brew_method.id
WHERE posts.id = $1
GROUP BY
    posts.id,
    posts.username,
    posts.brew_name,
    posts.roaster_name,
    posts.single_origin,
    process.process,
    brew_method.method,
    posts.review,
    posts.image;
    `;