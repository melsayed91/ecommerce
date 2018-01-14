import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

@Injectable()
export class NotifyService {

  constructor() { }

  showErrorMessage(title, text) {
    swal({
      type: 'error',
      title: title,
      text: text,
      buttonsStyling: true,
      confirmButtonClass: 'btn btn-error'

    }).catch(swal.noop);
  }
  showSuccessMessage(title, text) {
    swal({
      type: 'success',
      title: title,
      text: text,
      buttonsStyling: true,
      confirmButtonClass: 'btn btn-success'

    }).catch(swal.noop);
  }


}
