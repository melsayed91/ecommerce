/* tslint:disable */

declare var Object: any;
export interface RfpInterface {
  "description": string;
  "title": string;
  "creationDate": Date;
  "modificationDate"?: Date;
  "id"?: any;
  "rfqIds"?: Array<any>;
  "offerIds"?: Array<any>;
  "categoryId"?: any;
  rfqs?: any[];
  offers?: any[];
  category?: any;
}

export class Rfp implements RfpInterface {
  "description": string;
  "title": string;
  "creationDate": Date;
  "modificationDate": Date;
  "id": any;
  "rfqIds": Array<any>;
  "offerIds": Array<any>;
  "categoryId": any;
  rfqs: any[];
  offers: any[];
  category: any;
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
        "id": {
          name: 'id',
          type: 'any'
        },
        "rfqIds": {
          name: 'rfqIds',
          type: 'Array&lt;any&gt;',
          default: <any>[]
        },
        "offerIds": {
          name: 'offerIds',
          type: 'Array&lt;any&gt;',
          default: <any>[]
        },
        "categoryId": {
          name: 'categoryId',
          type: 'any'
        },
      },
      relations: {
        rfqs: {
          name: 'rfqs',
          type: 'any[]',
          model: '',
          relationType: 'referencesMany',
                  keyFrom: 'rfqIds',
          keyTo: 'id'
        },
        offers: {
          name: 'offers',
          type: 'any[]',
          model: '',
          relationType: 'referencesMany',
                  keyFrom: 'offerIds',
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
      }
    }
  }
}