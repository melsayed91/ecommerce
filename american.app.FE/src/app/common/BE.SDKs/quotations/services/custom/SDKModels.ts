/* tslint:disable */
import { Injectable } from '@angular/core';
import { Rfq } from '../../models/Rfq';
import { Rfp } from '../../models/Rfp';
import { Offer } from '../../models/Offer';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    Rfq: Rfq,
    Rfp: Rfp,
    Offer: Offer,
    
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
