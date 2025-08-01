/* eslint-disable no-console */
export class Logger {
  private readonly tag: string;

  constructor(tag: string) {
    this.tag = tag;
  }

  private format(level: string, msg: string): [string, ...any[]] {
    return [`[${this.tag}] ${msg}`];
  }

  warn(msg: string) {
    console.warn(...this.format('warn', msg));
  }

  error(msg: string) {
    console.error(...this.format('error', msg));
  }

  info(msg: string) {
    console.info(...this.format('info', msg));
  }
}
