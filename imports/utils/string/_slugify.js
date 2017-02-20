import slug from 'slug';

export const slugify = (text) => {
  return slug(text, { lower: true });
};
