import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { map } from "rxjs/operators";
import { User } from "src/app/shared/types/user";

@Component({
  selector: 'app-user',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  public user: User | null;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.user = null;
  }

  ngOnInit(): void {
    this.route.data.pipe(map((data) => data.user)).subscribe((user) => {
      if (user) {
        this.user = user;
      } else {
        this.router.navigate(['/users']);
      }
    });
  }
}
