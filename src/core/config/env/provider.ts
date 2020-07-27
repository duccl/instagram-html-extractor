import { Configs, ConfigType } from '../../types';
import { loadAwsConfigs, loadProcessConfigs } from './providers';

export class Config {
  private static _configs: Map<Configs, ConfigType>;

  private constructor() {
    Config._configs = new Map();
    this.loadConfigs();
  }

  public static get<T>(configName: Configs): T {
    this._configs || new Config();

    return (this._configs.get(configName) as unknown) as T;
  }

  private loadConfigs(): this {
    Config._configs.set('AWS', loadAwsConfigs());
    Config._configs.set('PROCESS', loadProcessConfigs());

    return this;
  }
}
