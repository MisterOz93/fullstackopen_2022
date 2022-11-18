//import { NewDiaryEntry } from './src/types';
/* in progress, uncomment when resuming work
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseComment = (comment: unknown): string => {
  if (!comment || !isString(comment)) {
    throw new Error('Missing or improperly formatted comment.');
  }
  return comment;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  parseComment(object.comment);
};

export default { toNewDiaryEntry };
*/
