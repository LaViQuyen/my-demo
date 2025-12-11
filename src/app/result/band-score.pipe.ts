import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'bandScore',
})
export class BandScorePipe implements PipeTransform {
  transform(value: number): number {
    return this.getBandScore(value);
  }

  getBandScore(value: number) {
    const bandData = [
      { answerRange: '39-40', bandScore: 9.0 },
      { answerRange: '37-38', bandScore: 8.5 },
      { answerRange: '35-36', bandScore: 8.0 },
      { answerRange: '33-34', bandScore: 7.5 },
      { answerRange: '30-32', bandScore: 7.0 },
      { answerRange: '27-29', bandScore: 6.5 },
      { answerRange: '23-26', bandScore: 6.0 },
      { answerRange: '20-22', bandScore: 5.5 },
      { answerRange: '16-19', bandScore: 5.0 },
      { answerRange: '13-15', bandScore: 4.5 },
      { answerRange: '10-12', bandScore: 4.0 },
      { answerRange: '7-9', bandScore: 3.5 },
    ];

    // Loop through the band data
    for (const band of bandData) {
      const rangeParts = band.answerRange.split('-');
      const lowerBound = parseInt(rangeParts[0]);
      const upperBound = parseInt(rangeParts[1]);

      // Check if answer is within the current range
      if (value >= lowerBound && value <= upperBound) {
        return band.bandScore;
      }
    }

    return 0;
  }
}
