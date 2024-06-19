import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
declare var $: any;
@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.css'],
})
export class PlanListComponent implements OnInit {
  planList: any;
  public searchText: any = '';
  membershipPlanId: any;
  form: any;
  search: any;
  itemToDelete: any;
  constructor(
    private toasterService: ToastrService,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getPlanList();
    this.filterListForm();
  }

  filterListForm() {
    this.form = this.formBuilder.group({
      planType: ['', [Validators.required]],
    });
  }

  /*** Plan List ***/
  getPlanList() {
    this.spinner.show();
    this.content.getPlansList().subscribe((response) => {
      if (response.isSuccess) {
        this.planList = response.data;
        this.spinner.hide();
      }
    });
  }

  performSearch() {
    // Your existing search logic...
    // Clear query parameters
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: null },
      queryParamsHandling: 'merge',
    });
  }

  getPlanListFilter() {
    this.spinner.show();
    this.content
      .getPlansListFilter(this.form.value.planType)
      .subscribe((response) => {
        if (response.isSuccess) {
          this.planList = response.data;
          this.spinner.hide();
        }
      });
  }

  backClickedreload() {
    this.router.navigateByUrl('/plan-list').then(() => {
      window.location.reload();
    });
  }

  delet(data: any) {
    this.itemToDelete = data;
    $('#list-cross-mess').modal('show');
  }

  deleteAddedPlan() {
    this.spinner.show();
    if (this.itemToDelete) {
      debugger;
      const itemId = this.itemToDelete.membershipPlanId;
      return this.content.deletePlan(itemId).subscribe((response) => {
        if (response.isSuccess) {
          this.spinner.hide();
          // Remove the deleted item from the local list
          this.planList = this.planList.filter(
            (item: { membershipPlanId: any }) =>
              item.membershipPlanId !== itemId
          );
          // Close the modal
          $('#list-cross-mess').modal('hide');
          this.toasterService.success(response.messages);
        } else {
          this.spinner.hide();
          this.toasterService.error(response.messages);
        }
      });
    }
  }

  editPlan(data: any) {
    this.router.navigate(['/plan-list/add-edit-plan'], {
      queryParams: {
        id: data.membershipPlanId,
      },
    });
  }

  onSearch(searchTerm: string): void {
    // Update query parameters for search
    this.router.navigate([], {
      queryParams: { search: searchTerm, page: 1 }, // Reset to the first page when searching
      queryParamsHandling: 'merge',
    });
  }

  addSpaceAfterText() {
    this.searchText = this.searchText.trim();
  }


}
