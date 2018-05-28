/* tslint:disable */
import { Injectable } from '@angular/core';
import { Product } from '../../models/Product';
import { Order } from '../../models/Order';
import { Shipment } from '../../models/Shipment';
import { ProductReview } from '../../models/ProductReview';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    Product: Product,
    Order: Order,
    Shipment: Shipment,
    ProductReview: ProductReview,
    
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
