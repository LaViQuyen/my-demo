import { each, intersection } from 'lodash-es';
import { QuestionType } from '../common/enums/question-type.enum';
import { Question } from '../common/models/question.model';
import { CorrectAnswerPipe } from '../common/pipes/correct-answer.pipe';
import { CorrectChoicesPipe } from '../common/pipes/correct-choices.pipe';
import { CorrectDropdownPipe } from '../common/pipes/correct-dropdown.pipe';

interface ScoreResult {
  correct: number;
  total: number;
}

export class ScoreUtils {
  static calculateQuestionPoint(
    question: Question,
  ) {
    switch (question.type) {
      case QuestionType.MULTIPLE_CHOICE:
        return ScoreUtils.forMultiplePointChoices(question);

      case QuestionType.SHORT_ANSWER:
      case QuestionType.FILL_IN_THE_GAP:
        return ScoreUtils.forAnswer(question);

      case QuestionType.DROPDOWN_ANSWER:
        return ScoreUtils.forDropdown(question);

      case QuestionType.LABEL_ON_MAP:
        return ScoreUtils.forMapLabel(question);

      default:
        return this.getResult(0, 0);
    }
  }

  static forSinglePointChoices(question: Question): ScoreResult {
    let totalPoint = 0;
    let correctPoint = 0;
    totalPoint++;
    if (CorrectChoicesPipe.prototype.transform(question)) {
      correctPoint++;
    }

    return this.getResult(correctPoint, totalPoint);
  }

  static forMultiplePointChoices(question: Question): ScoreResult {
    let totalPoint = 0;
    let correctPoint = 0;
    totalPoint += question.correctAnswer.length;

    correctPoint += intersection(
      question.correctAnswer,
      question.answer,
    ).length;

    return this.getResult(correctPoint, totalPoint);
  }

  static forDropdown(question: Question) {
    let totalPoint = 0;
    let correctPoint = 0;
    totalPoint++;
    if (CorrectDropdownPipe.prototype.transform(question)) {
      correctPoint++;
    }
    return this.getResult(correctPoint, totalPoint);
  }

  static forAnswer(question: Question) {
    let correctPoint = 0;
    let totalPoint = 0;
    each(question.choices, (choice) => {
      totalPoint++;
      if (CorrectAnswerPipe.prototype.transform(choice)) {
        correctPoint++;
      }
    });
    return this.getResult(correctPoint, totalPoint);
  }

  static forMapLabel(question: Question) {
    let correctPoint = 0;
    let totalPoint = 0;
    each(question.subQuestions, (question) => {
      totalPoint++;
      if (CorrectChoicesPipe.prototype.transform(question)) {
        correctPoint++;
      }
    });
    return this.getResult(correctPoint, totalPoint);
  }

  static getResult(correctPoint: number, totalPoint: number) {
    return { correct: correctPoint, total: totalPoint };
  }
}
