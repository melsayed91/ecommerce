/* tslint:disable */
import {
  Product,
  Order
} from '../index';

declare var Object: any;
export interface ProductReturnInterface {
  "description": string;
  "creationDate": Date;
  "modificationDate"?: Date;
  "isDeleted"?: boolean;
  "id"?: any;
  "statusId"?: any;
  "reasonId"?: any;
  "vendorAttachmentIds"?: Array<any>;
  "customerAttachmentIds"?: Array<any>;
  "vendorId"?: any;
  "customerId"?: any;
  "productId"?: any;
  "orderId"?: any;
  status?: any;
  reason?: any;
  vendorAttachment?: any[];
  customerAttachment?: any[];
  vendor?: any;
  customer?: any;
  product?: Product;
  order?: Order;
}

export class ProductReturn implements ProductReturnInterface {
  "description": string;
  "creationDate": Date;
  "modificationDate": Date;
  "isDeleted": boolean;
  "id": any;
  "statusId": any;
  "reasonId": any;
  "vendorAttachmentIds": Array<any>;
  "customerAttachmentIds": Array<any>;
  "vendorId": any;
  "customerId": any;
  "productId": any;
  "orderId": any;
  status: any;
  reason: any;
  vendorAttachment: any[];
  customerAttachment: any[];
  vendor: any;
  customer: any;
  product: Product;
  order: Order;
  constructor(data?: ProductReturnInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ProductReturn`.
   */
  public static getModelName() {
    return "ProductReturn";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ProductReturn for dynamic purposes.
  **/
  public static factory(data: ProductReturnInterface): ProductReturn{
    return new ProductReturn(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'ProductReturn',
      plural: 'ProductReturns',
      path: 'ProductReturns',
      idName: 'id',
      properties: {
        "description": {
          name: 'description',
          type: 'string'
        },
        "creationDate": {
          name: 'creationDate',
          type: 'Date'
        },
        "modificationDate": {
          name: 'modificationDate',
          type: 'Date'
        },
        "isDeleted": {
          name: 'isDeleted',
          type: 'boolean',
          default: false
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "statusId": {
          name: 'statusId',
          type: 'any'
        },
        "reasonId": {
          name: 'reasonId',
          type: 'any'
        },
        "vendorAttachmentIds": {
          name: 'vendorAttachmentIds',
          type: 'Array&lt;any&gt;',
          default: <any>[]
        },
        "customerAttachmentIds": {
          name: 'customerAttachmentIds',
          type: 'Array&lt;any&gt;',
          default: <any>[]
        },
        "vendorId": {
          name: 'vendorId',
          type: 'any'
        },
        "customerId": {
          name: 'customerId',
          type: 'any'
        },
        "productId": {
          name: 'productId',
          type: 'any'
        },
        "orderId": {
          name: 'orderId',
          type: 'any'
        },
      },
      relations: {
        status: {
          name: 'status',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'statusId',
          keyTo: 'id'
        },
        reason: {
          name: 'reason',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'reasonId',
          keyTo: 'id'
        },
        vendorAttachment: {
          name: 'vendorAttachment',
          type: 'any[]',
          model: '',
          relationType: 'referencesMany',
                  keyFrom: 'vendorAttachmentIds',
          keyTo: 'id'
        },
        customerAttachment: {
          name: 'customerAttachment',
          type: 'any[]',
          model: '',
          relationType: 'referencesMany',
                  keyFrom: 'customerAttachmentIds',
          keyTo: 'id'
        },
        vendor: {
          name: 'vendor',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'vendorId',
          keyTo: 'id'
        },
        customer: {
          name: 'customer',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'customerId',
          keyTo: 'id'
        },
        product: {
          name: 'product',
          type: 'Product',
          model: 'Product',
          relationType: 'belongsTo',
                  keyFrom: 'productId',
          keyTo: 'id'
        },
        order: {
          name: 'order',
          type: 'Order',
          model: 'Order',
          relationType: 'belongsTo',
                  keyFrom: 'orderId',
          keyTo: 'id'
        },
      }
    }
  }
}
