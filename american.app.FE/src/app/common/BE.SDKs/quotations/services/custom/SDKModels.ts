/* tslint:disable */
import { Injectable } from '@angular/core';
import { Offer } from '../../models/Offer';
import { Rfq } from '../../models/Rfq';
import { Rfp } from '../../models/Rfp';
import { Specification } from '../../models/Specification';
import { Product } from '../../models/Product';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    Offer: Offer,
    Rfq: Rfq,
    Rfp: Rfp,
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
