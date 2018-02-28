/* tslint:disable */
import { Injectable, Inject, Optional } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SDKModels } from './SDKModels';
import { BaseLoopBackApi } from '../core/base.service';
import { LoopBackConfig } from '../../lb.config';
import { LoopBackAuth } from '../core/auth.service';
import { LoopBackFilter,  } from '../../models/BaseModels';
import { JSONSearchParams } from '../core/search.params';
import { ErrorHandler } from '../core/error.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';
import { Order } from '../../models/Order';
import { SocketConnection } from '../../sockets/socket.connections';


/**
 * Api services for the `Order` model.
 */
@Injectable()
export class OrderApi extends BaseLoopBackApi {

  constructor(
    @Inject(Http) protected http: Http,
    @Inject(SocketConnection) protected connection: SocketConnection,
    @Inject(SDKModels) protected models: SDKModels,
    @Inject(LoopBackAuth) protected auth: LoopBackAuth,
    @Inject(JSONSearchParams) protected searchParams: JSONSearchParams,
    @Optional() @Inject(ErrorHandler) protected errorHandler: ErrorHandler
  ) {
    super(http,  connection,  models, auth, searchParams, errorHandler);
  }

  /**
   * Place an order (1. create order, 2. create shipmets, 3.create shipmentItems)
   *
   * @param {object} data Request data.
   *
   *  - `orderData` – `{any}` - full order object including shipments and shipmentItems. { order data..., "shipments": [ { ..., "items": [] } ]  }
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * Data properties:
   *
   *  - `order` – `{any}` - 
   */
  public placeOrder(orderData: any, customHeaders?: Function): Observable<any> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/Orders/placeorder";
    let _routeParams: any = {};
    let _postBody: any = {
      orderData: orderData
    };
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Updates specific attributes
   *
   * @param {object} data Request data.
   *
   *  - `id` – `{string}` - 
   *
   *  - `orderData` – `{any}` - 
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * Data properties:
   *
   *  - `order` – `{any}` - 
   */
  public updateModelAttributes(id: any, orderData: any, customHeaders?: Function): Observable<any> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/Orders/updatemodelattributes/:id";
    let _routeParams: any = {
      id: id
    };
    let _postBody: any = {
      orderData: orderData
    };
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `Order`.
   */
  public getModelName() {
    return "Order";
  }
}
