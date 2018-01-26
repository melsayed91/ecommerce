/* tslint:disable */
import {
  Rfq,
  Rfp
} from '../index';

declare var Object: any;
export interface OfferInterface {
  "description"?: string;
  "price": number;
  "quantity"?: number;
  "creationDate": Date;
  "modificationDate"?: Date;
  "id"?: any;
  "rfqId"?: any;
  "rfpId"?: any;
  "accountId"?: any;
  rfq?: Rfq;
  rfp?: Rfp;
  account?: any;
}

export class Offer implements OfferInterface {
  "description": string;
  "price": number;
  "quantity": number;
  "creationDate": Date;
  "modificationDate": Date;
  "id": any;
  "rfqId": any;
  "rfpId": any;
  "accountId": any;
  rfq: Rfq;
  rfp: Rfp;
  account: any;
  constructor(data?: OfferInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Offer`.
   */
  public static getModelName() {
    return "Offer";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Offer for dynamic purposes.
  **/
  public static factory(data: OfferInterface): Offer{
    return new Offer(data);
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
      name: 'Offer',
      plural: 'Offers',
      path: 'Offers',
      idName: 'id',
      properties: {
        "description": {
          name: 'description',
          type: 'string'
        },
        "price": {
          name: 'price',
          type: 'number'
        },
        "quantity": {
          name: 'quantity',
          type: 'number'
        },
        "creationDate": {
          name: 'creationDate',
          type: 'Date'
        },
        "modificationDate": {
          name: 'modificationDate',
          type: 'Date'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "rfqId": {
          name: 'rfqId',
          type: 'any'
        },
        "rfpId": {
          name: 'rfpId',
          type: 'any'
        },
        "accountId": {
          name: 'accountId',
          type: 'any'
        },
      },
      relations: {
        rfq: {
          name: 'rfq',
          type: 'Rfq',
          model: 'Rfq',
          relationType: 'belongsTo',
                  keyFrom: 'rfqId',
          keyTo: 'id'
        },
        rfp: {
          name: 'rfp',
          type: 'Rfp',
          model: 'Rfp',
          relationType: 'belongsTo',
                  keyFrom: 'rfpId',
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
      }
    }
  }
}
