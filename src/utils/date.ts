import {
    CalendarDate,
    DateValue,
    getLocalTimeZone,
    parseDate,
    Time,
    today,
} from "@internationalized/date";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatDate = (
    date: Date | string | number | null,
    format: string = "DD/MM/YYYY",
    locale: string = "vi",
    timeZone: string = "Asia/Ho_Chi_Minh",
) => {
    if (!date) return "undefined";

    return dayjs.utc(date).tz(timeZone).locale(locale).format(format);
};

export const getToday = (): CalendarDate => today(getLocalTimeZone());

export const toDateValue = (date?: string | null): DateValue | null => {
    if (!date) return null;

    if (typeof date !== "string") return date;

    return parseDate(date.split(" ")[0]);
};

export const getCurrentTime = (time?: string | null): Time => {
    if (!time) {
        const now = new Date();
        return new Time(now.getHours());
    }

    if (typeof time !== "string") return time;

    const [hours, minutes] = time.split(":").map(Number);
    return new Time(hours, minutes);
};
