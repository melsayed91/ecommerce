/* tslint:disable */
import { Injectable } from '@angular/core';
import { Account } from '../../models/Account';
import { AccountData } from '../../models/AccountData';
import { Email } from '../../models/Email';
import { SysUser } from '../../models/SysUser';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    Account: Account,
    AccountData: AccountData,
    Email: Email,
    SysUser: SysUser,
    
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
