/* tslint:disable */

declare var Object: any;
export interface OrderInterface {
  "orderNo": string;
  "isPrototype": boolean;
  "paymentInfo"?: any;
  "shippingInfo"?: any;
  "id"?: any;
  "ownerId"?: any;
  "statusId"?: any;
  "createdAt": Date;
  "updatedAt": Date;
  "shipmentIds"?: Array<any>;
  owner?: any;
  status?: any;
  shipments?: any[];
}

export class Order implements OrderInterface {
  "orderNo": string;
  "isPrototype": boolean;
  "paymentInfo": any;
  "shippingInfo": any;
  "id": any;
  "ownerId": any;
  "statusId": any;
  "createdAt": Date;
  "updatedAt": Date;
  "shipmentIds": Array<any>;
  owner: any;
  status: any;
  shipments: any[];
  constructor(data?: OrderInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Order`.
   */
  public static getModelName() {
    return "Order";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Order for dynamic purposes.
  **/
  public static factory(data: OrderInterface): Order{
    return new Order(data);
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
      name: 'Order',
      plural: 'Orders',
      path: 'Orders',
      idName: 'id',
      properties: {
        "orderNo": {
          name: 'orderNo',
          type: 'string'
        },
        "isPrototype": {
          name: 'isPrototype',
          type: 'boolean',
          default: false
        },
        "paymentInfo": {
          name: 'paymentInfo',
          type: 'any'
        },
        "shippingInfo": {
          name: 'shippingInfo',
          type: 'any'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "ownerId": {
          name: 'ownerId',
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
        "shipmentIds": {
          name: 'shipmentIds',
          type: 'Array&lt;any&gt;',
          default: <any>[]
        },
      },
      relations: {
        owner: {
          name: 'owner',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'ownerId',
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
        shipments: {
          name: 'shipments',
          type: 'any[]',
          model: '',
          relationType: 'referencesMany',
                  keyFrom: 'shipmentIds',
          keyTo: 'id'
        },
      }
    }
  }
}
