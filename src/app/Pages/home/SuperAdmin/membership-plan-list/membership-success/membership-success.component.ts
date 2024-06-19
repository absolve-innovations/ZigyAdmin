import { Component, NgZone, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from 'src/app/Shared/service/content.service';
import { ActivatedRoute, Router } from '@angular/router';
import html2canvas from 'html2canvas';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-membership-success',
  templateUrl: './membership-success.component.html',
  styleUrls: ['./membership-success.component.css']
})
export class MembershipSuccessComponent implements OnInit {
  @ViewChild('htmlElement') htmlElementRef!: ElementRef;
  @ViewChild('htmlContainer') htmlContainer!: ElementRef;
  merchantTransactionId:any;
  data: any;
  printWindow!: any;
  role = localStorage.getItem('role');
  datePart: string = '';
  timePart: string = '';
  constructor(private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getPaymentStatus();
  }

  downloadDesign() {
    const htmlElement = this.htmlElementRef.nativeElement;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Set the canvas dimensions to match the HTML element size
    canvas.width = htmlElement.offsetWidth;
    canvas.height = htmlElement.offsetHeight;

    // Convert the HTML element to an image
    html2canvas(htmlElement).then((canvas: HTMLCanvasElement) => {
      // Convert the canvas to a data URL
      const dataUrl = canvas.toDataURL('image/png');
      // Create a link element and trigger the download
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'element.png';
      link.click();
    });

  }
  // Check Payment Status 
  getPaymentStatus() {
     this.merchantTransactionId = localStorage.getItem('merchantId');
    this.content.getCheckPayment(this.merchantTransactionId).subscribe(response => {
      if (response.isSuccess) {
        this.data = response.data
        const dateObject = new Date(this.data.createDate);
        this.datePart = dateObject.toLocaleDateString();
        this.timePart = dateObject.toLocaleTimeString();
        localStorage.setItem('transactionId',this.data.transactionId);
        this.toaster.success(response.messages);
      } else {
        this.toaster.error(response.messages);
        this.router.navigateByUrl('/membership-error')
      }
    });
  }

  separateDateTime() {
    // Convert the input string to a JavaScript Date object
    const dateTime = new Date(this.datePart);
    // Format the date as "dd/mm/yyyy"
    const formattedDate = this.datePipe.transform(dateTime, 'dd/MM/yyyy');
    // Extract the time (HH:mm:ss)
    const formattedTime = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    return {
      date: formattedDate,
      time: formattedTime,
    };
  }

}
