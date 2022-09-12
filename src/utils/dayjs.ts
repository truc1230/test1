import * as dayjsModule from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import toObject from 'dayjs/plugin/toObject';

const dayjs = dayjsModule.default;
dayjs.extend(toObject);
dayjs.extend(isSameOrAfter);

export const isDifferenceDateTimes = (one: Date, two: Date) => !!dayjs(one).diff(two);

export const createDateWithoutTime = (date: Date) => new Date(date).setHours(0, 0, 0, 0);

export default dayjs;
