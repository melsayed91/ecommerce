/* tslint:disable */

declare var Object: any;
export interface MessageInterface {
  "text"?: string;
  "creationDate": Date;
  "seenDate"?: Date;
  "id"?: any;
  "conversationId"?: any;
  "ownerId"?: any;
  conversation?: any;
  owner?: any;
}

export class Message implements MessageInterface {
  "text": string;
  "creationDate": Date;
  "seenDate": Date;
  "id": any;
  "conversationId": any;
  "ownerId": any;
  conversation: any;
  owner: any;
  constructor(data?: MessageInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Message`.
   */
  public static getModelName() {
    return "Message";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Message for dynamic purposes.
  **/
  public static factory(data: MessageInterface): Message{
    return new Message(data);
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
      name: 'Message',
      plural: 'Messages',
      path: 'Messages',
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
        "seenDate": {
          name: 'seenDate',
          type: 'Date'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "conversationId": {
          name: 'conversationId',
          type: 'any'
        },
        "ownerId": {
          name: 'ownerId',
          type: 'any'
        },
      },
      relations: {
        conversation: {
          name: 'conversation',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'conversationId',
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
