/* tslint:disable */
import { Injectable } from '@angular/core';
import { SysCode } from '../../models/SysCode';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    SysCode: SysCode,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
