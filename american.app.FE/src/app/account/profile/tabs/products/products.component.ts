import { Component, OnInit, AfterViewInit } from '@angular/core';

import { Ng2FileInputService, Ng2FileInputAction } from 'ng2-file-input';

import { UserService } from '../../../../core/services/user.service/user.service';
import { ProductApi, Product } from '../../../../common/BE.SDKs/Products';
import { SysCodeApi } from '../../../../common/BE.SDKs/sysCodes';
import { LoopBackConfig as attachementApiConfig } from '../../../../common/BE.SDKs/attachment';
import { AttachmentService } from '../../../../core/services/attachment.service/attachment.service';
declare var $: any;

@Component({
  selector: 'profile-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  attachmentServer: any;

  account;
  isNew: any;
  loading;
  showProductForm;
  formValidation;
  product: Product;
  productCategory;
  table;
  products = [];
  categories = []
  attachments = [];

  uploadIconHtml = "<i class='fa fa-upload'></i>";
  removeHtml = "<i class='fa fa-times'></i>";
  uploaded = [];

  constructor(
    private auth: UserService,
    private ng2FileInputService: Ng2FileInputService,
    private ProductApi: ProductApi,
    private SysCodeApi: SysCodeApi,
    private AttachmentService: AttachmentService) {
  }

  ngOnInit() {
    this.attachmentServer = attachementApiConfig.getPath();
    this.account = this.auth.account;
    this.loadUserProducts();
    this.SysCodeApi.findByParent("5a651615f22fe122e0862672").subscribe((response: any) => {
      this.categories = response.sysCode;
    }, (err) => { });
  }

  loadUserProducts(): any {
    this.ProductApi.getUserProducts(this.account.id).subscribe((response) => {
      this.products = response.products;
    }, (err) => {

    })
  }

  initDataTable() {
    console.log('init table')
    if (this.table)
      this.table.destroy();

    this.table = $('#datatables').DataTable({
      columnDefs: [
        {
          targets: [0, 4],
          searchable: false,
          orderable: false
        }
      ],
      dom: "<'table-top'<'info'i><'filter'f>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'table-bottom'<'length'l><'paging'p>>",
      lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
      pagingType: 'full_numbers',
      responsive: true,
      stateSave: true,
      language: {
        search: '_INPUT_',
        searchPlaceholder: 'Search Products'
      }
    });
  }

  toggleRow(row) {
    row.selected = !row.selected;
  }

  openProductForm(isNew) {
    this.productCategory = undefined;
    this.isNew = isNew;
    if (!this.isNew)
      this.productCategory = this.product.category;
    else {
      this.product = new Product();
      this.product.accountId = this.account.id;
    }
    this.showProductForm = true;
  }

  closeProductForm() {
    this.showProductForm = false;
  }

  SaveProduct() {
    if (!this.formValidation.validate())
      return;
    this.loading = 'Saving Product';
    let data = {
      "name": this.product.name,
      "description": this.product.description,
      "price": this.product.price,
      "stock": this.product.stock,
      "isActive": this.product.isActive,
      "categoryId": this.product.categoryId,
      "accountId": this.product.accountId,
      "attachmentIds": this.product.attachmentIds,
    };
    if (!this.isNew)
      data['id'] = this.product.id;

    this.ProductApi.replaceOrCreate(data).subscribe((response) => {
      //to avoid reloading the whole list we just add it to the array
      if (this.isNew) {
        data['category'] = this.productCategory;
        data['attachments'] = this.attachments;
        this.products.push(data);
      }
      this.loading = undefined;
      this.closeProductForm();
    }, (err) => {

    })
  }

  formLoaded() {
    this.formValidation = $('#productForm').parsley({ trigger: "change keyup" });
  }

  validatefield(fieldId) {
    $("#" + fieldId).parsley().validate();
  }

  categoryChanged(e) {
    this.product.categoryId = e.id;
    this.product.category = e;
  }

  autocompleListFormatter = (data: any) => {
    return data['name']
  }

  scrollToBottom(selector) {
    $(selector).animate({ scrollTop: $(selector).prop("scrollHeight") }, 1000);
  }

  onAdded(event: any) {
    this.uploaded.push(event.file);
    this.scrollToBottom('.ulpoaded');
    setTimeout(() => { event.file.isLoaded = true; }, this.uploaded.length * 1000);
  }

  removeFile(index) {
    this.uploaded.splice(index, 1)
  }

  getCurrentFiles() {
    let files = this.ng2FileInputService.getCurrentFiles('multiFilesInput');
    return files;
  }

}
