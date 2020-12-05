import { config } from 'dotenv';
import { readFileSync } from 'fs';
import { resolve } from 'path';

config();
const defaultConfig = JSON.parse(readFileSync(resolve(__dirname, '../config.json')).toString());
const testConfig = JSON.parse(readFileSync(resolve(__dirname, '../configTest.json')).toString());

export interface IConfig {
  PORT: number;
  express_debug: boolean;
  mongo_host: string;
  mongo_user: string;
  mongo_pass: string;
  mongo_database: string;
  mongo_debug: boolean;
  session_cookie_name: string;
  session_secret: string;
}

export function configuration(target: string): IConfig {
  const result: any = target === 'Test' ? { ...testConfig } : { ...defaultConfig };
  for (const key in result) {
    if (key in process.env) result[key] = process.env[key];
  }
  return result;
}
