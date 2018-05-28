/* tslint:disable */

declare var Object: any;
export interface ProductReviewInterface {
  "text"?: string;
  "creationDate": Date;
  "rating"?: number;
  "id"?: any;
  "productId"?: any;
  "ownerId"?: any;
  product?: any;
  owner?: any;
}

export class ProductReview implements ProductReviewInterface {
  "text": string;
  "creationDate": Date;
  "rating": number;
  "id": any;
  "productId": any;
  "ownerId": any;
  product: any;
  owner: any;
  constructor(data?: ProductReviewInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ProductReview`.
   */
  public static getModelName() {
    return "ProductReview";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ProductReview for dynamic purposes.
  **/
  public static factory(data: ProductReviewInterface): ProductReview{
    return new ProductReview(data);
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
      name: 'ProductReview',
      plural: 'ProductReviews',
      path: 'ProductReviews',
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
        "rating": {
          name: 'rating',
          type: 'number'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "productId": {
          name: 'productId',
          type: 'any'
        },
        "ownerId": {
          name: 'ownerId',
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
        owner: {
          name: 'owner',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'ownerId',
          keyTo: 'id'
        },
      }
    }
  }
}
