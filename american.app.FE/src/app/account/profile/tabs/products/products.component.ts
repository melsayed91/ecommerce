import { Component, OnInit, AfterViewInit, OnDestroy, Inject } from '@angular/core';
import "rxjs/add/operator/takeWhile";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { SaleComponent } from "./sale/sale.component";
import { Ng2FileInputService, Ng2FileInputAction } from 'ng2-file-input';
import { UserService } from '../../../../core/services/user.service/user.service';
import { ProductApi, Product } from '../../../../common/BE.SDKs/Products';
import { SysCodeApi } from '../../../../common/BE.SDKs/sysCodes';
import { AttachmentApi, LoopBackConfig as attachementApiConfig } from '../../../../common/BE.SDKs/attachment';
import { AttachmentService } from '../../../../core/services/attachment.service/attachment.service';
declare var $: any;
@Component({
  selector: 'profile-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.alive = false;
  }

  alive: boolean = true;
  canAddDiscount: boolean = false;
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
  spec = { name: "", value: "" };
  uploadIconHtml = "<i class='fa fa-upload'></i>";
  removeHtml = "<i class='fa fa-times'></i>";
  uploaded = [];
  returnAccepted = true;
  warrantyProvided = true;
  constructor(
    private dialog: MatDialog,
    private auth: UserService,
    private ng2FileInputService: Ng2FileInputService,
    private ProductApi: ProductApi,
    private SysCodeApi: SysCodeApi,
    private AttachmentService: AttachmentService,
    private AttachmentServiceAPI: AttachmentApi) {
  }

  ngOnInit() {
    this.attachmentServer = attachementApiConfig.getPath();
    this.account = this.auth.account;
    this.loadUserProducts();
    this.SysCodeApi.getAllSubIndustries()
      .takeWhile(() => this.alive)
      .subscribe((response: any) => {
        this.categories = response.subIndustries;
      }, (err) => { });
  }

  loadUserProducts(): any {
    this.ProductApi.updateAttributes("mm", {})
    this.ProductApi.getUserProducts(this.account.id)
      .takeWhile(() => this.alive)
      .subscribe((response) => {
        this.products = response.products;
      }, (err) => {

      })
  }

  initDataTable() {
    if (this.table)
      this.table.destroy();

    this.table = $('#datatables').DataTable({
      select: false,
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

    this.table.on('select', function (e, dt, type, indexes) {
      this.canAddDiscount = this.table.rows({ selected: true }).count() > 0;
    }.bind(this))
    this.table.on('deselect', function (e, dt, type, indexes) {
      this.canAddDiscount = this.table.rows({ selected: true }).count() > 0;
    }.bind(this))
  }

  openSaleDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
    };

    const dialogRef = this.dialog.open(SaleComponent,
      dialogConfig);


    dialogRef.afterClosed().subscribe(
      val => console.log("Dialog output:", val)
    );
  }

  openProductForm(isNew) {
    this.productCategory = undefined;
    this.uploaded = [];
    this.isNew = isNew;
    if (!this.isNew) {
      this.productCategory = this.product.category;
      this.warrantyProvided = this.product.warrantyPeriod > 0;
      this.returnAccepted = this.product.returnPeriode > 0;
    }

    else {
      this.product = new Product();
      this.product.accountId = this.account.id
      this.product.specs = [];
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

    let uploadedAtchmentIds = this.uploaded.map(function (item) { return item.id });
    let data = {
      "name": this.product.name,
      "description": this.product.description,
      "price": this.product.price,
      "prototypePrice": this.product.prototypePrice,
      "stock": this.product.stock,
      "moq": this.product.moq,
      "isActive": this.product.isActive,
      "categoryId": this.product.categoryId,
      "accountId": this.product.accountId,
      "attachmentIds": this.isNew ? uploadedAtchmentIds : this.product.attachmentIds.concat(uploadedAtchmentIds),
      "specs": this.product.specs,
      "returnPeriode": this.returnAccepted ? this.product.returnPeriode : 0,
      "warrantyPeriod": this.warrantyProvided ? this.product.warrantyPeriod : 0,
      "rating": this.product.rating,
      "views": this.product.views,
      "sells": this.product.sells
    };

    if (!this.isNew) {
      data['id'] = this.product.id;
    }


    this.ProductApi.upsert(data)
      .takeWhile(() => this.alive)
      .subscribe((response) => {
        //to avoid reloading the whole list we just add it to the array
        if (this.isNew) {
          data['category'] = this.productCategory;
          data['attachments'] = this.uploaded;
          this.products.push(data);
        }
        else
          this.product.attachments = this.product.attachments.concat(this.uploaded);


        this.loading = undefined;
        this.closeProductForm();
      }, (err) => {

      })
  }

  formLoaded() {
    this.formValidation = $('#productForm').parsley({ trigger: "change keyup" });
  }

  validatefield(fieldId) {
    return $("#" + fieldId).parsley().validate();
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
    var form = new FormData();
    form.append("file", event.file, event.file.name);
    this.AttachmentService.upload(form, event.file.name, {})
      .takeWhile(() => this.alive)
      .subscribe((response: any) => {
        this.uploaded.push(response);
      }, (err) => {

      })
  }

  removeFile(event: any) {
    var toBeDeletedIndex = this.uploaded.findIndex(function (item) {
      return item.originalFileName === event.file.name
    });
    this.AttachmentServiceAPI.deleteById(this.uploaded[toBeDeletedIndex].id)
      .takeWhile(() => this.alive)
      .subscribe((response: any) => {
        this.uploaded.splice(toBeDeletedIndex, 1)
      }, (err) => {
      })
  }

  getCurrentFiles() {
    let files = this.ng2FileInputService.getCurrentFiles('multiFilesInput');
    return files;
  }

  addSpec() {
    if (this.validatefield("specDesc") === true && this.validatefield("specKey") === true) {
      this.product.specs.push(this.spec);
      this.spec = { name: "", value: "" };
    }
  }
}