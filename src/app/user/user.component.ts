import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { UserService } from "../user.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
  id: number;
  vat: boolean | any = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
    });
  }
  onActivate() {
    // this.userService.activatedEmitter.emit(true);

    if (this.vat === true) {
      this.vat = false;
    } else {
      this.vat = true;
    }
    this.userService.activatedEmitter.next(this.vat);
    // alert(this.vat);
  }
}
