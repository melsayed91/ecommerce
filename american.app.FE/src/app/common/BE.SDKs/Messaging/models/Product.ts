/* tslint:disable */

declare var Object: any;
export interface ProductInterface {
  "name": string;
  "description": string;
  "price": number;
  "moq": number;
  "specs"?: any;
  "stock": number;
  "creationDate"?: Date;
  "isActive"?: boolean;
  "isDeleted"?: boolean;
  "id"?: any;
  "accountId"?: any;
  "attachmentIds"?: Array<any>;
  account?: any;
  attachments?: any[];
}

export class Product implements ProductInterface {
  "name": string;
  "description": string;
  "price": number;
  "moq": number;
  "specs": any;
  "stock": number;
  "creationDate": Date;
  "isActive": boolean;
  "isDeleted": boolean;
  "id": any;
  "accountId": any;
  "attachmentIds": Array<any>;
  account: any;
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
        "price": {
          name: 'price',
          type: 'number'
        },
        "moq": {
          name: 'moq',
          type: 'number',
          default: 1
        },
        "specs": {
          name: 'specs',
          type: 'any'
        },
        "stock": {
          name: 'stock',
          type: 'number'
        },
        "creationDate": {
          name: 'creationDate',
          type: 'Date'
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
