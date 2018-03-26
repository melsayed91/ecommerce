/* tslint:disable */

declare var Object: any;
export interface RfpInterface {
  "description": string;
  "title": string;
  "creationDate": Date;
  "modificationDate"?: Date;
  "enabled"?: boolean;
  "isDeleted"?: boolean;
  "id"?: any;
  "offerIds"?: Array<any>;
  "statusId"?: any;
  "categoryId"?: any;
  "attachmentIds"?: Array<any>;
  "accountId"?: any;
  offers?: any[];
  status?: any;
  category?: any;
  attachments?: any[];
  account?: any;
}

export class Rfp implements RfpInterface {
  "description": string;
  "title": string;
  "creationDate": Date;
  "modificationDate": Date;
  "enabled": boolean;
  "isDeleted": boolean;
  "id": any;
  "offerIds": Array<any>;
  "statusId": any;
  "categoryId": any;
  "attachmentIds": Array<any>;
  "accountId": any;
  offers: any[];
  status: any;
  category: any;
  attachments: any[];
  account: any;
  constructor(data?: RfpInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Rfp`.
   */
  public static getModelName() {
    return "Rfp";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Rfp for dynamic purposes.
  **/
  public static factory(data: RfpInterface): Rfp{
    return new Rfp(data);
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
      name: 'Rfp',
      plural: 'Rfps',
      path: 'Rfps',
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
        "offerIds": {
          name: 'offerIds',
          type: 'Array&lt;any&gt;',
          default: <any>[]
        },
        "statusId": {
          name: 'statusId',
          type: 'any'
        },
        "categoryId": {
          name: 'categoryId',
          type: 'any'
        },
        "attachmentIds": {
          name: 'attachmentIds',
          type: 'Array&lt;any&gt;',
          default: <any>[]
        },
        "accountId": {
          name: 'accountId',
          type: 'any'
        },
      },
      relations: {
        offers: {
          name: 'offers',
          type: 'any[]',
          model: '',
          relationType: 'referencesMany',
                  keyFrom: 'offerIds',
          keyTo: 'id'
        },
        status: {
          name: 'status',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'statusId',
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
