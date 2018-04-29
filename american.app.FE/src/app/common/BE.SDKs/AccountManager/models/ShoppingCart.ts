/* tslint:disable */

declare var Object: any;
export interface ShoppingCartInterface {
  "quantity"?: number;
  "creationDate": Date;
  "id"?: any;
  "productId"?: any;
  product?: any;
}

export class ShoppingCart implements ShoppingCartInterface {
  "quantity": number;
  "creationDate": Date;
  "id": any;
  "productId": any;
  product: any;
  constructor(data?: ShoppingCartInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ShoppingCart`.
   */
  public static getModelName() {
    return "ShoppingCart";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ShoppingCart for dynamic purposes.
  **/
  public static factory(data: ShoppingCartInterface): ShoppingCart{
    return new ShoppingCart(data);
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
      name: 'ShoppingCart',
      plural: 'ShoppingCarts',
      path: 'ShoppingCarts',
      idName: 'id',
      properties: {
        "quantity": {
          name: 'quantity',
          type: 'number'
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
      }
    }
  }
}
