import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../api.service';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-produit-edit',
  templateUrl: './produit-edit.component.html',
  styleUrls: ['./produit-edit.component.scss']
})
export class ProduitEditComponent implements OnInit {

  produitForm: FormGroup;
  _id: number = null;
  prod_name = '';
  prod_desc = '';
  prod_price: number = null;
  isLoadingResults = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.getProduit(this.route.snapshot.params['id']);
    this.produitForm = this.formBuilder.group({
      'prod_name': [null, Validators.required],
      'prod_desc': [null, Validators.required],
      'prod_price': [null, Validators.required],
    });
  }

  getProduit(id) {
    this.api.getProduit(id).subscribe(data => {
      this._id = data.id;
      this.produitForm.setValue({
        prod_name: data.prod_name,
        prod_desc: data.prod_desc,
        prod_price: data.prod_price,
      });
    });
  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.api.updateProduit(this._id, form)
      .subscribe(res => {
          const id = res['_id'];
          this.isLoadingResults = false;
          this.router.navigate(['/produit-details', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  produitDetails() {
    this.router.navigate(['/produit-details', this._id]);
  }

}
