import * as dayjsModule from 'dayjs';
import toObject from 'dayjs/plugin/toObject';

const dayjs = dayjsModule.default;
dayjs.extend(toObject);

export default dayjs;
