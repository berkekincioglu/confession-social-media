import * as Tag from './Tags';

const tagColors: any = new Map<any, string>([
  [Tag.REGRET, 'red'],
  [Tag.FIRST_EXPERIENCE, 'orange'],
  [Tag.SAD, 'yellow'],
  [Tag.GUILTY, 'olive'],
  [Tag.LOVE, 'pink'],
  [Tag.HAPPY, 'green'],
  [Tag.CONGRATULATIONS, 'teal'],
  [Tag.CHEATING, 'purple'],
  [Tag.MOCKING, 'violet'],
  [Tag.DEPRESSION, 'black'],
  [Tag.SEXUAL_ABUSE, 'blue'],
]);

export const pickTagColor = (tag: any) => {
  let tagColor = 'grey';
  tagColor = tagColors.get(tag);

  return tagColor;
};
