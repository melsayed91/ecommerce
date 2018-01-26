import { Component, OnInit, AfterViewInit } from '@angular/core';

import { Ng2FileInputService, Ng2FileInputAction } from 'ng2-file-input';

declare var $: any;

@Component({
  selector: 'profile-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  isNew: any;

  loading;
  showProductForm;
  formValidation;
  product = {};
  table;
  products = [
    {
      "id": "5a6997660946fbebc8c841a3",
      "stock": "10", "isActive": false,
      "price": 2115.66,
      "avatar": "../../../../../assets/img/bag2.png",
      "name": "Guy Callahan",
      "category": 1,
      "about": "Quis nostrud ex commodo anim nostrud aliquip labore ad eu commodo culpa. Tempor fugiat sit proident pariatur deserunt cillum dolor occaecat esse velit cupidatat labore. Nisi non nostrud veniam tempor duis amet culpa esse elit dolor. Voluptate ut voluptate cupidatat aliqua culpa. Esse id veniam nulla exercitation aute incididunt consequat cupidatat ullamco commodo aute consequat. Reprehenderit duis nostrud mollit irure nostrud laborum ad ullamco nulla sit. Minim voluptate duis mollit amet sit sint.\r\n",
      "images": [
        {
          "id": 0,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 1,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 2,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 3,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 4,
          "picture": "http://placehold.it/32x32"
        }
      ]
    },
    {
      "id": "5a6997664ce83c95e19b2cab",
      "stock": "7", "isActive": true,
      "price": 2235.99,
      "avatar": "../../../../../assets/img/bag.png",
      "name": "Galloway Blanchard",
      "category": 1,
      "about": "Anim veniam veniam mollit id et ipsum officia anim nisi incididunt eu occaecat anim consequat. Ex voluptate quis aliqua proident voluptate commodo consequat eiusmod occaecat minim et ut. Voluptate et ullamco minim non irure fugiat eu consequat fugiat est id.\r\n",
      "images": [
        {
          "id": 0,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 1,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 2,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 3,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 4,
          "picture": "http://placehold.it/32x32"
        }
      ]
    },
    {
      "id": "5a6997662051e95dc5874591",
      "stock": "80", "isActive": true,
      "price": 1874.56,
      "avatar": "../../../../../assets/img/bag3.png",
      "name": "Sandy Gould",
      "category": 2,
      "about": "Eu esse nostrud velit nisi ad nisi voluptate veniam occaecat et Lorem. Enim ipsum ullamco occaecat deserunt irure. Sunt est incididunt eu id officia eu enim sint nulla aliqua nostrud est consectetur. Est do labore ex culpa consectetur ipsum laborum magna velit dolore nisi sint non dolore. Ullamco dolor excepteur ea veniam minim cupidatat et amet et pariatur eu reprehenderit adipisicing adipisicing. Aliquip enim veniam cupidatat magna tempor non ipsum et non. Non adipisicing excepteur quis laboris laborum laboris.\r\n",
      "images": [
        {
          "id": 0,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 1,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 2,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 3,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 4,
          "picture": "http://placehold.it/32x32"
        }
      ]
    },
    {
      "id": "5a69920755b19cac2937e355",
      "stock": "11", "isActive": false,
      "price": 1774.29,
      "avatar": "../../../../../assets/img/bag.png",
      "name": "Vaughn Ryan",
      "category": 1,
      "about": "Exercitation reprehenderit nisi do quis sunt. Eiusmod ad et officia deserunt cillum cillum esse et magna officia deserunt esse. Elit enim voluptate sint labore cillum sunt.\r\n",
      "images": [
        {
          "id": 0,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 1,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 2,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 3,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 4,
          "picture": "http://placehold.it/32x32"
        }
      ]
    },
    {
      "id": "5a6992075bff4e2374db4a2b",
      "stock": "100", "isActive": true,
      "price": 2982.75,
      "avatar": "../../../../../assets/img/bag2.png",
      "name": "Cannon Kim",
      "category": 1,
      "about": "Nulla do mollit ullamco proident velit quis nulla consequat culpa velit commodo exercitation. Deserunt velit nulla pariatur voluptate nostrud fugiat pariatur. Laboris id sint fugiat exercitation veniam magna adipisicing irure. Eiusmod officia cupidatat consequat id Lorem. Lorem magna esse eu do voluptate minim. Adipisicing cupidatat consequat anim eiusmod laborum velit dolor reprehenderit reprehenderit et excepteur aliqua. Cillum sunt sunt elit in culpa ea ad Lorem.\r\n",
      "images": [
        {
          "id": 0,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 1,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 2,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 3,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 4,
          "picture": "http://placehold.it/32x32"
        }
      ]
    },
    {
      "id": "5a6992070b99c4446ecfc074",
      "stock": "470", "isActive": true,
      "price": 3484.12,
      "avatar": "../../../../../assets/img/bag3.png",
      "name": "Shawn Rowe",
      "category": 2,
      "about": "Do sit excepteur dolore ut dolore enim. Do aliqua consequat est elit. Adipisicing cupidatat ea ad laboris velit esse nulla laboris tempor dolore. Et cillum esse elit mollit incididunt et amet. Laboris proident Lorem incididunt ea consectetur excepteur commodo. Velit irure magna nisi exercitation elit excepteur cillum culpa laboris eiusmod duis eiusmod deserunt eiusmod.\r\n",
      "images": [
        {
          "id": 0,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 1,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 2,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 3,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 4,
          "picture": "http://placehold.it/32x32"
        }
      ]
    },
    {
      "id": "5a6992072e2ef8fccf15e3c7",
      "stock": "44", "isActive": false,
      "price": 1383.13,
      "avatar": "../../../../../assets/img/bag.png",
      "name": "Flynn Kent",
      "category": 3,
      "about": "Aute incididunt cillum quis fugiat commodo magna commodo consequat veniam in. Est labore est officia ea occaecat. Mollit reprehenderit cupidatat voluptate elit quis aliqua irure exercitation deserunt proident cillum. Occaecat minim velit amet laborum non.\r\n",
      "images": [
        {
          "id": 0,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 1,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 2,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 3,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 4,
          "picture": "http://placehold.it/32x32"
        }
      ]
    },
    {
      "id": "5a6992077b79c4b610c04e50",
      "stock": "19", "isActive": false,
      "price": 1185.13,
      "avatar": "../../../../../assets/img/bag2.png",
      "name": "Bernadine Eaton",
      "category": 4,
      "about": "Laborum quis duis voluptate duis consequat irure id labore excepteur aliquip dolore esse. Mollit fugiat id magna proident dolor anim esse nulla. Voluptate officia est sunt proident elit aliquip non labore culpa esse culpa aliqua mollit elit. Qui veniam nulla velit est ad dolor labore occaecat excepteur eiusmod excepteur. Consequat eu pariatur aute mollit esse cillum sit. Laborum id elit aliquip Lorem.\r\n",
      "images": [
        {
          "id": 0,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 1,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 2,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 3,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 4,
          "picture": "http://placehold.it/32x32"
        }
      ]
    },
    {
      "id": "5a6992076e60b598432ce83a",
      "stock": "0", "isActive": false,
      "price": 3645.42,
      "avatar": "../../../../../assets/img/bag.png",
      "name": "Shari Schneider",
      "category": 5,
      "about": "Fugiat aliquip non adipisicing eu do id nostrud. Laboris aliqua commodo ex anim enim incididunt pariatur aute tempor proident et do esse anim. Ex anim aute est id enim mollit eu. Deserunt aute ut excepteur nulla exercitation. Ullamco incididunt do ex in exercitation excepteur officia aliquip nulla ullamco quis tempor. Cillum adipisicing consequat ea veniam Lorem do occaecat anim.\r\n",
      "images": [
        {
          "id": 0,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 1,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 2,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 3,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 4,
          "picture": "http://placehold.it/32x32"
        }
      ]
    },
    {
      "id": "5a699207cb5f00cd610fd885",
      "stock": "10", "isActive": true,
      "price": 3100.68,
      "avatar": "../../../../../assets/img/bag3.png",
      "name": "Carole Craft",
      "category": 1,
      "about": "Ex voluptate adipisicing magna nostrud irure. Occaecat quis tempor veniam adipisicing esse non id quis proident do sint esse eu deserunt. Nulla veniam velit elit eiusmod et id. Laboris ad aliquip ut aliqua consectetur reprehenderit culpa sit enim eu cupidatat. Amet aliqua reprehenderit aute exercitation veniam. Amet magna reprehenderit sint est anim id excepteur nulla.\r\n",
      "images": [
        {
          "id": 0,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 1,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 2,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 3,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 4,
          "picture": "http://placehold.it/32x32"
        }
      ]
    },
    {
      "id": "5a699207657a73d75b16e943",
      "stock": "0", "isActive": false,
      "price": 3671.16,
      "avatar": "../../../../../assets/img/bag.png",
      "name": "Duncan Golden",
      "category": 1,
      "about": "Eiusmod officia excepteur proident dolore ipsum commodo dolore ad irure et aliqua minim ullamco labore. Elit culpa ipsum excepteur esse ullamco ea laboris ea sint officia ea. Sint Lorem pariatur ex voluptate qui enim labore dolore sunt cillum eiusmod sit non.\r\n",
      "images": [
        {
          "id": 0,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 1,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 2,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 3,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 4,
          "picture": "http://placehold.it/32x32"
        }
      ]
    },
    {
      "id": "5a699207cfc8998daf804304",
      "stock": "0", "isActive": true,
      "price": 2287.71,
      "avatar": "../../../../../assets/img/bag3.png",
      "name": "Craig Carroll",
      "category": 1,
      "about": "Quis exercitation ea velit ea do nisi voluptate. Eu minim labore in sint excepteur magna. Enim sunt elit et amet nisi. Eiusmod mollit reprehenderit occaecat dolore. Magna ad esse ipsum esse occaecat laborum aliqua anim incididunt.\r\n",
      "images": [
        {
          "id": 0,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 1,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 2,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 3,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 4,
          "picture": "http://placehold.it/32x32"
        }
      ]
    },
    {
      "id": "5a6992076e63ea10a9fe469a",
      "stock": "39", "isActive": true,
      "price": 1557.27,
      "avatar": "../../../../../assets/img/bag2.png",
      "name": "Good Lawrence",
      "category": 5,
      "about": "Laborum adipisicing ipsum ea anim. Labore sit dolor ad in do in laboris ex. Quis qui cupidatat esse et commodo magna qui est exercitation fugiat minim. Consectetur aute ex exercitation tempor in. Quis cupidatat non laborum adipisicing sit duis dolor ad fugiat eu mollit ipsum anim.\r\n",
      "images": [
        {
          "id": 0,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 1,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 2,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 3,
          "picture": "http://placehold.it/32x32"
        },
        {
          "id": 4,
          "picture": "http://placehold.it/32x32"
        }
      ]
    }
  ]

  categories = [
    { name: "Travel Bags", id: 13 },
    { name: "Women Bags", id: 12 },
    { name: "Back Packs", id: 19 },
    { name: "Product Category Name 1", id: 1 },
    { name: "Product Category Name 2", id: 2 },
    { name: "Product Category Name 3", id: 3 },
    { name: "Product Category Name 4", id: 4 },
    { name: "Product Category Name 5", id: 5 },
    { name: "Product Category Name 6", id: 6 },
    { name: "Product Category Name 7", id: 7 },
    { name: "Product Category Name 8", id: 8 },
    { name: "Product Category Name 9", id: 9 },
    { name: "Product Category Name 10", id: 10 },
    { name: "Product Category Name 11", id: 11 }
  ]

  uploadIconHtml = "<i class='fa fa-upload'></i>";
  removeHtml = "<i class='fa fa-times'></i>";
  uploaded = [];

  constructor(private ng2FileInputService: Ng2FileInputService) { }

  ngOnInit() {
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
      lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
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

    this.isNew = isNew;
    this.showProductForm = true;
    if (isNew)
      this.product = {};
  }

  closeProductForm() {
    this.showProductForm = false;
  }

  SaveProduct() {
    if (!this.formValidation.validate())
      return;
    this.loading = 'Saving Product';
    setTimeout(() => {
      this.showProductForm = false;
      this.loading = undefined;
    }, 1000)
  }

  formLoaded() {
    this.formValidation = $('#productForm').parsley({ trigger: "change keyup" });
  }

  validatefield(fieldId) {
    $("#" + fieldId).parsley().validate();
  }

  categoryChanged(e) {
    this.validatefield('category')
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
