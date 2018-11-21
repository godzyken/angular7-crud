import {Component, OnInit} from '@angular/core';

import {Router} from '@angular/router';
import {ApiService} from '../api.service';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-produit-ajout',
  templateUrl: './produit-ajout.component.html',
  styleUrls: ['./produit-ajout.component.scss']
})
export class ProduitAjoutComponent implements OnInit {

  produitForm: FormGroup;
  prod_name = '';
  prod_desc = '';
  prod_price: number = null;
  updated_at: Date = null;
  isLoadingResults = false;

  constructor(
    private router: Router,
    private api: ApiService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.produitForm = this.formBuilder.group({
      'prod_name' : [null, Validators.required],
      'prod_desc' : [null, Validators.required],
      'prod_price' : [null, Validators.required],
      'updated_at' : [null, Validators.required],
    });
  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.api.addProduit(form)
      .subscribe(res => {
        const id = res['_id'];
        this.isLoadingResults = false;
        this.router.navigate(['/produit-details', id]);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }}
