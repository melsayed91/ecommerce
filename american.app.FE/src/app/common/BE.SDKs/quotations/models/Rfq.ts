/* tslint:disable */
import {
  Offer
} from '../index';

declare var Object: any;
export interface RfqInterface {
  "description": string;
  "title": string;
  "creationDate": Date;
  "modificationDate"?: Date;
  "enabled"?: boolean;
  "isDeleted"?: boolean;
  "id"?: any;
  "categoryId"?: any;
  "offerIds"?: Array<any>;
  "accountId"?: any;
  "attachmentIds"?: Array<any>;
  category?: any;
  offers?: Offer[];
  account?: any;
  attachments?: any[];
}

export class Rfq implements RfqInterface {
  "description": string;
  "title": string;
  "creationDate": Date;
  "modificationDate": Date;
  "enabled": boolean;
  "isDeleted": boolean;
  "id": any;
  "categoryId": any;
  "offerIds": Array<any>;
  "accountId": any;
  "attachmentIds": Array<any>;
  category: any;
  offers: Offer[];
  account: any;
  attachments: any[];
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
        "enabled": {
          name: 'enabled',
          type: 'boolean'
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
        "categoryId": {
          name: 'categoryId',
          type: 'any'
        },
        "offerIds": {
          name: 'offerIds',
          type: 'Array&lt;any&gt;',
          default: <any>[]
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
        category: {
          name: 'category',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'categoryId',
          keyTo: 'id'
        },
        offers: {
          name: 'offers',
          type: 'Offer[]',
          model: 'Offer',
          relationType: 'referencesMany',
                  keyFrom: 'offerIds',
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
