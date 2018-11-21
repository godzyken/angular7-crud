import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Produit} from '../produit';

@Component({
  selector: 'app-produit-detail',
  templateUrl: './produit-detail.component.html',
  styleUrls: ['./produit-detail.component.scss']
})
export class ProduitDetailComponent implements OnInit {

  produit: Produit = {id: null, prod_name: '', prod_desc: '', prod_price: null, updated_at: null };
  isLoadingResults = true;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) { }



  getProduitDetail(id) {
    this.api.getProduit(id)
      .subscribe(data => {
        this.produit = data;
        console.log(this.produit);
        this.isLoadingResults = false;
      });
  }


  deleteProduit(id) {
    this.isLoadingResults = true;
    this.api.deleteProduit(id)
      .subscribe(res => {
        this.isLoadingResults = false;
        this.router.navigate(['/produits']);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  ngOnInit() {
    this.getProduitDetail(this.route.snapshot.params['id']);
  }
}
