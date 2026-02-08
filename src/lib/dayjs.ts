import dayjsOriginal from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjsOriginal.extend(localizedFormat);

export const dayjsWithLocale = dayjsOriginal;
export default dayjsWithLocale;
