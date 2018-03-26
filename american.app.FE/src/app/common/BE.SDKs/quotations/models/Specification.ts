/* tslint:disable */

declare var Object: any;
export interface SpecificationInterface {
  "description": string;
  "reply"?: string;
  "creationDate": Date;
  "modificationDate"?: Date;
  "isReplied"?: boolean;
  "isDeleted"?: boolean;
  "id"?: any;
  "productId"?: any;
  "accountId"?: any;
  "productOwnerId"?: any;
  product?: any;
  account?: any;
  productOwner?: any;
}

export class Specification implements SpecificationInterface {
  "description": string;
  "reply": string;
  "creationDate": Date;
  "modificationDate": Date;
  "isReplied": boolean;
  "isDeleted": boolean;
  "id": any;
  "productId": any;
  "accountId": any;
  "productOwnerId": any;
  product: any;
  account: any;
  productOwner: any;
  constructor(data?: SpecificationInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Specification`.
   */
  public static getModelName() {
    return "Specification";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Specification for dynamic purposes.
  **/
  public static factory(data: SpecificationInterface): Specification{
    return new Specification(data);
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
      name: 'Specification',
      plural: 'Specifications',
      path: 'Specifications',
      idName: 'id',
      properties: {
        "description": {
          name: 'description',
          type: 'string'
        },
        "reply": {
          name: 'reply',
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
        "isReplied": {
          name: 'isReplied',
          type: 'boolean',
          default: false
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
        "productId": {
          name: 'productId',
          type: 'any'
        },
        "accountId": {
          name: 'accountId',
          type: 'any'
        },
        "productOwnerId": {
          name: 'productOwnerId',
          type: 'any'
        },
      },
      relations: {
        product: {
          name: 'product',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'productId',
          keyTo: 'id'
        },
        account: {
          name: 'account',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'accountId',
          keyTo: 'id'
        },
        productOwner: {
          name: 'productOwner',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'productOwnerId',
          keyTo: 'id'
        },
      }
    }
  }
}
