import { Component, OnDestroy, OnInit } from "@angular/core";
import { interval, Observable, Subscription } from "rxjs";
import { map, filter } from "rxjs/operators";
// import { timeout } from "rxjs-compat/operator/timeout";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;
  count: number | any;
  constructor() {}

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe((count) => {
    //   console.log(count);
    // });
    const customIntervalObservable = new Observable((observer) => {
      this.count = 0;
      setInterval(() => {
        observer.next(this.count);
        if (this.count === 2) {
          observer.complete();
          this.count = 0;
        }
        if (this.count > 3) {
          observer.error(new Error("Count is greater than 3!!!!!"));
          this.count = 0;
        }
        this.count++;
      }, 3000);
    });

    this.firstObsSubscription = customIntervalObservable
      .pipe(
        filter((data) => {
          return data > 0;
        }),
        map((data: number) => {
          return "Round: " + (data + 200);
        })
      )
      .subscribe(
        (data) => {
          // console.log("Round : " + data);
          console.log(data);
        },
        (error) => {
          alert(error.message);
        },
        () => {
          console.log("Completed!!!!");
        }
      );
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
}
