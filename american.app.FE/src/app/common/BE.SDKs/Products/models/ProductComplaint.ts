/* tslint:disable */

declare var Object: any;
export interface ProductComplaintInterface {
  "text"?: string;
  "creationDate": Date;
  "id"?: any;
  "productId"?: any;
  "orderId"?: any;
  "ownerId"?: any;
  "vendorId"?: any;
  product?: any;
  order?: any;
  owner?: any;
  vendor?: any;
}

export class ProductComplaint implements ProductComplaintInterface {
  "text": string;
  "creationDate": Date;
  "id": any;
  "productId": any;
  "orderId": any;
  "ownerId": any;
  "vendorId": any;
  product: any;
  order: any;
  owner: any;
  vendor: any;
  constructor(data?: ProductComplaintInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ProductComplaint`.
   */
  public static getModelName() {
    return "ProductComplaint";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ProductComplaint for dynamic purposes.
  **/
  public static factory(data: ProductComplaintInterface): ProductComplaint{
    return new ProductComplaint(data);
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
      name: 'ProductComplaint',
      plural: 'ProductComplaints',
      path: 'ProductComplaints',
      idName: 'id',
      properties: {
        "text": {
          name: 'text',
          type: 'string'
        },
        "creationDate": {
          name: 'creationDate',
          type: 'Date'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "productId": {
          name: 'productId',
          type: 'any'
        },
        "orderId": {
          name: 'orderId',
          type: 'any'
        },
        "ownerId": {
          name: 'ownerId',
          type: 'any'
        },
        "vendorId": {
          name: 'vendorId',
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
        order: {
          name: 'order',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'orderId',
          keyTo: 'id'
        },
        owner: {
          name: 'owner',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'ownerId',
          keyTo: 'id'
        },
        vendor: {
          name: 'vendor',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'vendorId',
          keyTo: 'id'
        },
      }
    }
  }
}
