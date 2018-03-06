/* tslint:disable */

declare var Object: any;
export interface ProductInterface {
  "name": string;
  "description": string;
  "returnPeriode": number;
  "warrantyPeriod": number;
  "price": number;
  "prototypePrice": number;
  "moq": number;
  "specs"?: Array<any>;
  "stock": number;
  "isActive"?: boolean;
  "isDeleted"?: boolean;
  "id"?: any;
  "accountId"?: any;
  "categoryId"?: any;
  "createdAt": Date;
  "updatedAt": Date;
  "attachmentIds"?: Array<any>;
  account?: any;
  category?: any;
  attachments?: any[];
}

export class Product implements ProductInterface {
  "name": string;
  "description": string;
  "returnPeriode": number;
  "warrantyPeriod": number;
  "price": number;
  "prototypePrice": number;
  "moq": number;
  "specs": Array<any>;
  "stock": number;
  "isActive": boolean;
  "isDeleted": boolean;
  "id": any;
  "accountId": any;
  "categoryId": any;
  "createdAt": Date;
  "updatedAt": Date;
  "attachmentIds": Array<any>;
  account: any;
  category: any;
  attachments: any[];
  constructor(data?: ProductInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Product`.
   */
  public static getModelName() {
    return "Product";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Product for dynamic purposes.
  **/
  public static factory(data: ProductInterface): Product{
    return new Product(data);
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
      name: 'Product',
      plural: 'Products',
      path: 'Products',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "description": {
          name: 'description',
          type: 'string'
        },
        "returnPeriode": {
          name: 'returnPeriode',
          type: 'number'
        },
        "warrantyPeriod": {
          name: 'warrantyPeriod',
          type: 'number'
        },
        "price": {
          name: 'price',
          type: 'number'
        },
        "prototypePrice": {
          name: 'prototypePrice',
          type: 'number'
        },
        "moq": {
          name: 'moq',
          type: 'number',
          default: 1
        },
        "specs": {
          name: 'specs',
          type: 'Array&lt;any&gt;'
        },
        "stock": {
          name: 'stock',
          type: 'number'
        },
        "isActive": {
          name: 'isActive',
          type: 'boolean',
          default: true
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
        "accountId": {
          name: 'accountId',
          type: 'any'
        },
        "categoryId": {
          name: 'categoryId',
          type: 'any'
        },
        "createdAt": {
          name: 'createdAt',
          type: 'Date'
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'Date'
        },
        "attachmentIds": {
          name: 'attachmentIds',
          type: 'Array&lt;any&gt;',
          default: <any>[]
        },
      },
      relations: {
        account: {
          name: 'account',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'accountId',
          keyTo: 'id'
        },
        category: {
          name: 'category',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'categoryId',
          keyTo: 'id'
        },
        attachments: {
          name: 'attachments',
          type: 'any[]',
          model: '',
          relationType: 'referencesMany',
                  keyFrom: 'attachmentIds',
          keyTo: 'id'
        },
      }
    }
  }
}
