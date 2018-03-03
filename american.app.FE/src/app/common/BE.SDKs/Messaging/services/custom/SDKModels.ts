/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Conversation } from '../../models/Conversation';
import { Message } from '../../models/Message';
import { AccountData } from '../../models/AccountData';
import { Specification } from '../../models/Specification';
import { Product } from '../../models/Product';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    User: User,
    Conversation: Conversation,
    Message: Message,
    AccountData: AccountData,
    Specification: Specification,
    Product: Product,
    
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
