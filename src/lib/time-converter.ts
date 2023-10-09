import moment from "moment";

export default function utcTimeConverter(utc: string, format: string): string {
  return moment.utc(utc).local().format(format);
}
