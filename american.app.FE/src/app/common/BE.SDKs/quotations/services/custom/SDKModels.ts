/* tslint:disable */
import { Injectable } from '@angular/core';
import { Offer } from '../../models/Offer';
import { Rfq } from '../../models/Rfq';
import { Rfp } from '../../models/Rfp';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    Offer: Offer,
    Rfq: Rfq,
    Rfp: Rfp,
    
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
