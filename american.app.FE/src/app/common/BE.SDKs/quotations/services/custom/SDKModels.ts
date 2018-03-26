/* tslint:disable */
import { Injectable } from '@angular/core';
import { Product } from '../../models/Product';
import { Offer } from '../../models/Offer';
import { AccountData } from '../../models/AccountData';
import { Rfq } from '../../models/Rfq';
import { Rfp } from '../../models/Rfp';
import { Specification } from '../../models/Specification';
import { Conversation } from '../../models/Conversation';
import { ConversationServiceApi } from '../../models/ConversationServiceApi';
import { MessageServiceApi } from '../../models/MessageServiceApi';
import { Message } from '../../models/Message';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    Product: Product,
    Offer: Offer,
    AccountData: AccountData,
    Rfq: Rfq,
    Rfp: Rfp,
    Specification: Specification,
    Conversation: Conversation,
    ConversationServiceApi: ConversationServiceApi,
    MessageServiceApi: MessageServiceApi,
    Message: Message,
    
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
