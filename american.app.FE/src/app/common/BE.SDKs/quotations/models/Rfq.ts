/* tslint:disable */

declare var Object: any;
export interface RfqInterface {
  "description": string;
  "quantity": number;
  "title": string;
  "creationDate": Date;
  "modificationDate"?: Date;
  "isDeleted"?: boolean;
  "id"?: any;
  "offerId"?: any;
  "accountId"?: any;
  "productId"?: any;
  offer?: any;
  account?: any;
  product?: any;
}

export class Rfq implements RfqInterface {
  "description": string;
  "quantity": number;
  "title": string;
  "creationDate": Date;
  "modificationDate": Date;
  "isDeleted": boolean;
  "id": any;
  "offerId": any;
  "accountId": any;
  "productId": any;
  offer: any;
  account: any;
  product: any;
  constructor(data?: RfqInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Rfq`.
   */
  public static getModelName() {
    return "Rfq";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Rfq for dynamic purposes.
  **/
  public static factory(data: RfqInterface): Rfq{
    return new Rfq(data);
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
      name: 'Rfq',
      plural: 'Rfqs',
      path: 'Rfqs',
      idName: 'id',
      properties: {
        "description": {
          name: 'description',
          type: 'string'
        },
        "quantity": {
          name: 'quantity',
          type: 'number'
        },
        "title": {
          name: 'title',
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
        "offerId": {
          name: 'offerId',
          type: 'any'
        },
        "accountId": {
          name: 'accountId',
          type: 'any'
        },
        "productId": {
          name: 'productId',
          type: 'any'
        },
      },
      relations: {
        offer: {
          name: 'offer',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'offerId',
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
        product: {
          name: 'product',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'productId',
          keyTo: 'id'
        },
      }
    }
  }
}
