import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchHighlight',
})
export class SearchHighlightPipe implements PipeTransform {
  transform(value: string, args: string[]): any {
    if (!args) return { value };

    for (const searchTerm of args) {
      let regexText = new RegExp(searchTerm, 'gi');
      value = value.replace(
        regexText,
        "<span class='search-text-highlight'>$&</span>"
      );
    }

    let count = (value.match(new RegExp(args.toString(), 'gi')) || []).length;

    return { value, count };
  }
}
