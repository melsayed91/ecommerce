/* tslint:disable */

declare var Object: any;
export interface AccountDataInterface {
  "name"?: string;
  "bio"?: string;
  "city"?: string;
  "state"?: string;
  "address"?: string;
  "zipCode"?: string;
  "phone"?: string;
  "mobile"?: string;
  "userCategories"?: Array<any>;
  "id"?: any;
  "accountId"?: any;
  "customerIds"?: Array<any>;
  "countriesOfOperationIds"?: Array<any>;
  "galleryIds"?: Array<any>;
  "documentIds"?: Array<any>;
  "profileImageId"?: any;
  "countryId"?: any;
  "bannerImageId"?: any;
  "disabledCategoriesIds"?: Array<any>;
  "categoryIds"?: Array<any>;
  account?: any;
  customers?: any[];
  countriesOfOperation?: any[];
  gallery?: any[];
  documents?: any[];
  profileImage?: any;
  country?: any;
  bannerImage?: any;
  disabledCategories?: any[];
  categories?: any[];
}

export class AccountData implements AccountDataInterface {
  "name": string;
  "bio": string;
  "city": string;
  "state": string;
  "address": string;
  "zipCode": string;
  "phone": string;
  "mobile": string;
  "userCategories": Array<any>;
  "id": any;
  "accountId": any;
  "customerIds": Array<any>;
  "countriesOfOperationIds": Array<any>;
  "galleryIds": Array<any>;
  "documentIds": Array<any>;
  "profileImageId": any;
  "countryId": any;
  "bannerImageId": any;
  "disabledCategoriesIds": Array<any>;
  "categoryIds": Array<any>;
  account: any;
  customers: any[];
  countriesOfOperation: any[];
  gallery: any[];
  documents: any[];
  profileImage: any;
  country: any;
  bannerImage: any;
  disabledCategories: any[];
  categories: any[];
  constructor(data?: AccountDataInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `AccountData`.
   */
  public static getModelName() {
    return "AccountData";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of AccountData for dynamic purposes.
  **/
  public static factory(data: AccountDataInterface): AccountData{
    return new AccountData(data);
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
      name: 'AccountData',
      plural: 'AccountData',
      path: 'AccountData',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "bio": {
          name: 'bio',
          type: 'string'
        },
        "city": {
          name: 'city',
          type: 'string'
        },
        "state": {
          name: 'state',
          type: 'string'
        },
        "address": {
          name: 'address',
          type: 'string'
        },
        "zipCode": {
          name: 'zipCode',
          type: 'string'
        },
        "phone": {
          name: 'phone',
          type: 'string'
        },
        "mobile": {
          name: 'mobile',
          type: 'string'
        },
        "userCategories": {
          name: 'userCategories',
          type: 'Array&lt;any&gt;'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "accountId": {
          name: 'accountId',
          type: 'any'
        },
        "customerIds": {
          name: 'customerIds',
          type: 'Array&lt;any&gt;',
          default: <any>[]
        },
        "countriesOfOperationIds": {
          name: 'countriesOfOperationIds',
          type: 'Array&lt;any&gt;',
          default: <any>[]
        },
        "galleryIds": {
          name: 'galleryIds',
          type: 'Array&lt;any&gt;',
          default: <any>[]
        },
        "documentIds": {
          name: 'documentIds',
          type: 'Array&lt;any&gt;',
          default: <any>[]
        },
        "profileImageId": {
          name: 'profileImageId',
          type: 'any'
        },
        "countryId": {
          name: 'countryId',
          type: 'any'
        },
        "bannerImageId": {
          name: 'bannerImageId',
          type: 'any'
        },
        "disabledCategoriesIds": {
          name: 'disabledCategoriesIds',
          type: 'Array&lt;any&gt;',
          default: <any>[]
        },
        "categoryIds": {
          name: 'categoryIds',
          type: 'Array&lt;any&gt;',
          default: <any>[]
        },
      },
      relations: {
        account: {
          name: 'account',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'accountId',
          keyTo: 'id'
        },
        customers: {
          name: 'customers',
          type: 'any[]',
          model: '',
          relationType: 'referencesMany',
                  keyFrom: 'customerIds',
          keyTo: 'id'
        },
        countriesOfOperation: {
          name: 'countriesOfOperation',
          type: 'any[]',
          model: '',
          relationType: 'referencesMany',
                  keyFrom: 'countriesOfOperationIds',
          keyTo: 'id'
        },
        gallery: {
          name: 'gallery',
          type: 'any[]',
          model: '',
          relationType: 'referencesMany',
                  keyFrom: 'galleryIds',
          keyTo: 'id'
        },
        documents: {
          name: 'documents',
          type: 'any[]',
          model: '',
          relationType: 'referencesMany',
                  keyFrom: 'documentIds',
          keyTo: 'id'
        },
        profileImage: {
          name: 'profileImage',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'profileImageId',
          keyTo: 'id'
        },
        country: {
          name: 'country',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'countryId',
          keyTo: 'id'
        },
        bannerImage: {
          name: 'bannerImage',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'bannerImageId',
          keyTo: 'id'
        },
        disabledCategories: {
          name: 'disabledCategories',
          type: 'any[]',
          model: '',
          relationType: 'referencesMany',
                  keyFrom: 'disabledCategoriesIds',
          keyTo: 'id'
        },
        categories: {
          name: 'categories',
          type: 'any[]',
          model: '',
          relationType: 'referencesMany',
                  keyFrom: 'categoryIds',
          keyTo: 'id'
        },
      }
    }
  }
}
