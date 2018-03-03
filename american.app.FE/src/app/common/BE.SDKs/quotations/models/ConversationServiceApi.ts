/* tslint:disable */

declare var Object: any;
export interface ConversationServiceApiInterface {
  "id"?: number;
}

export class ConversationServiceApi implements ConversationServiceApiInterface {
  "id": number;
  constructor(data?: ConversationServiceApiInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ConversationServiceApi`.
   */
  public static getModelName() {
    return "ConversationServiceApi";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ConversationServiceApi for dynamic purposes.
  **/
  public static factory(data: ConversationServiceApiInterface): ConversationServiceApi{
    return new ConversationServiceApi(data);
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
      name: 'ConversationServiceApi',
      plural: 'ConversationServiceApis',
      path: 'ConversationServiceApis',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
