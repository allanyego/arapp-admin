import dayjs from "dayjs";

/**
 * Calculate age
 * @param {Date} birthDate
 */
export default function getAge(birthDate) {
  return dayjs().diff(dayjs(birthDate), "year");
}
