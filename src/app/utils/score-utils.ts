import { each, intersection } from 'lodash-es';
import { QuestionType } from '../shared/enums/question-type.enum';
import { Question } from '../shared/models/question.model';
import { CorrectAnswerPipe } from '../pipes/correct-answer.pipe';
import { CorrectChoicesPipe } from '../pipes/correct-choices.pipe';
import { CorrectDropdownPipe } from '../pipes/correct-dropdown.pipe';

interface ScoreResult {
  correct: number;
  total: number;
}

export class ScoreUtils {
  static calculateQuestionPoint(question: Question) {
    switch (question.type) {
      case QuestionType.MULTIPLE_CHOICE:
        return ScoreUtils.forMultiplePointChoices(question);
      case QuestionType.SHORT_ANSWER:
      case QuestionType.FILL_IN_THE_GAP:
      case QuestionType.FILL_IN_THE_TABLE:
        return ScoreUtils.forAnswer(question);
      case QuestionType.DROPDOWN_ANSWER:
        return ScoreUtils.forDropdown(question);
      case QuestionType.LABEL_ON_MAP:
        return ScoreUtils.forMapLabel(question);
      case QuestionType.DRAG_AND_DROP_ANSWER:
      case QuestionType.DRAG_IN_TABLE:
        return ScoreUtils.forAnswer(question);
      default:
        return this.getResult(0, 0);
    }
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
