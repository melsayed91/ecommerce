/* tslint:disable */

declare var Object: any;
export interface ShipmentInterface {
  "awb"?: string;
  "shippedBy"?: string;
  "shippingFees"?: number;
  "id"?: any;
  "orderId"?: any;
  "sellerId"?: any;
  "statusId"?: any;
  "createdAt": Date;
  "updatedAt": Date;
  "itemsIds"?: Array<any>;
  order?: any;
  seller?: any;
  status?: any;
  items?: any[];
}

export class Shipment implements ShipmentInterface {
  "awb": string;
  "shippedBy": string;
  "shippingFees": number;
  "id": any;
  "orderId": any;
  "sellerId": any;
  "statusId": any;
  "createdAt": Date;
  "updatedAt": Date;
  "itemsIds": Array<any>;
  order: any;
  seller: any;
  status: any;
  items: any[];
  constructor(data?: ShipmentInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Shipment`.
   */
  public static getModelName() {
    return "Shipment";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Shipment for dynamic purposes.
  **/
  public static factory(data: ShipmentInterface): Shipment{
    return new Shipment(data);
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
      name: 'Shipment',
      plural: 'shipments',
      path: 'shipments',
      idName: 'id',
      properties: {
        "awb": {
          name: 'awb',
          type: 'string'
        },
        "shippedBy": {
          name: 'shippedBy',
          type: 'string'
        },
        "shippingFees": {
          name: 'shippingFees',
          type: 'number'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "orderId": {
          name: 'orderId',
          type: 'any'
        },
        "sellerId": {
          name: 'sellerId',
          type: 'any'
        },
        "statusId": {
          name: 'statusId',
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
        "itemsIds": {
          name: 'itemsIds',
          type: 'Array&lt;any&gt;',
          default: <any>[]
        },
      },
      relations: {
        order: {
          name: 'order',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'orderId',
          keyTo: 'id'
        },
        seller: {
          name: 'seller',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'sellerId',
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
        items: {
          name: 'items',
          type: 'any[]',
          model: '',
          relationType: 'referencesMany',
                  keyFrom: 'itemsIds',
          keyTo: 'id'
        },
      }
    }
  }
}
