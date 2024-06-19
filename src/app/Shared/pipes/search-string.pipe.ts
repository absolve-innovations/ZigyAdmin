import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchString'
})
export class SearchStringPipe implements PipeTransform {

  transform(parm: any, items: any, term: any): any {
    if (term === undefined) {
      return items;
    }
    if (parm) {
      return items.filter((item: any) =>

        item[parm] != null &&
        item[parm]
          .toString()
          .toLowerCase()
          .includes(term.toLowerCase())
      );
    } else {
      return items.filter((item: any) =>

        Object.keys(item).some(
          k =>
            item[k] != null &&
            item[k]
              .toString()
              .toLowerCase()
              .includes(term.toLowerCase())
        )
      );
    }
  }
  
  /** Coustom Pipe Two parm */
  transform2(parm: any, parm2: any, items: any, term: any, term2: any): any {
    if (term === undefined) {
      return items;
    }
    if (parm && parm2) {
      return items.filter((obj: any) => obj[parm] == term && obj[parm2] == term2)

    }
  }

  /** Third Param */
  transform3(parm: any, parm2: any, parm3: any, items: any, term: any, term2: any, term3: any): any {
    if (term === undefined) {
      return items;
    }
    if (parm && parm2 && parm3) {
      return items.filter((obj: any) => obj[parm] == term && obj[parm2] == term2 && obj[parm3] == term3)
    }

  }

  /** Four Param */
  transform4(parm: any, parm2: any, parm3: any, parm4: any, items: any, term: any, term2: any, term3: any, term4: any): any {
    if (term === undefined) {
      return items;
    }
    if (parm && parm2 && parm3) {
      return items.filter((obj: any) => obj[parm] == term && obj[parm2] == term2 && obj[parm3] == term3 && obj[parm4] == term4)
    }

  }

}
