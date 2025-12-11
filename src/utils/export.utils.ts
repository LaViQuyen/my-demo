import { saveAs } from 'file-saver';
import { asBlob } from 'html-docx-js-typescript';
import { each, isEmpty } from 'lodash-es';
import { QuestionType } from '../common/enums/question-type.enum';
import { Question } from '../common/models/question.model';
import { Result } from '../common/models/result.model';
import { AnswerChoicePipe } from '../common/pipes/answer-choice.pipe';
import { CommonUtils } from './common-utils';
import { CHOICE_INDEX, INPUT_PATTERN } from './constant';
import { IsInputPipe } from '../app/fill-in-the-gap/is-input.pipe';
import { ChoiceContentPipe } from '../app/matching-header/choice-content.pipe';

export class ExportUtils {
  private static pdfStyle() {
    return `
      table,
      tr,
      td {
        border: 1px solid black;
        height: 30px;
        text-align: center;
      }
      .choice {
        display: flex;
        margin: 0.5rem 0;
      }
      .choice-index {
        height: 3rem;
        width: 3rem;
        border-radius: 50%;
        text-align: center;
      }
      .choice-index.selected {
        border: 1px solid black;
      }
      .choice-content {
        margin-left: 0.5rem;
      }
      .answer-container {
        margin: 1rem 0;
      }
      .answer-input {
        border: 1px solid black;
        padding: 0 .5rem;
        margin: 0 .5rem;
      }
      .text-container {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin: .5rem 10px 0 0;
      }
    `;
  }

  private static startHTML() {
    return `
      <html>
      <head>
        <style>
          ${this.pdfStyle()}
        </style>
      </head>
      <body>
    `;
  }

  private static endHTML() {
    return `
      </body>
    </html>
    `;
  }

  static exportQuestion(question: Question): string {
    let htmlString = '';
    htmlString += `<p><b>${question.content ? question.content : ''}</b></p>`;
    switch (question.type) {
      case QuestionType.MULTIPLE_CHOICE:
        htmlString += this.exportMultipleChoices(question);
        break;
      case QuestionType.SHORT_ANSWER:
        htmlString += this.exportShortAnswer(question);
        break;
      case QuestionType.DROPDOWN_ANSWER:
        htmlString += this.exportDropDownChoice(question);
        break;
      case QuestionType.LABEL_ON_MAP:
        htmlString += this.exportLabelOnMap(question);
        break;
      case QuestionType.FILL_IN_THE_GAP:
        htmlString += this.exportFillInTheGap(question);
        break;
      default:
        break;
    }
    return htmlString;
  }

  static exportListening(result: Result) {
    let htmlString = `${this.startHTML()}<h1>${result.name} - Listening</h1><h2>Name: ${result.studentName}</h2><h2>Point: </h2>`;
    each(result.listeningParts, (part, index) => {
      htmlString += `<h3>Part ${index + 1}</h3>`;
      each(part.questions, (question) => {
        htmlString += this.exportQuestion(question);
      });
      htmlString += '<hr>';
    });
    // this.exportFile(result, htmlString, 'Listening');
    return (htmlString += this.endHTML());
  }

  static exportReading(result: Result) {
    let htmlString = `${this.startHTML()}<h1>${result.name} - Reading</h1><h2>Name: ${result.studentName}</h2><h2>Point: </h2>`;
    each(result.readingParts, (part, index) => {
      htmlString += `<h3>Part ${index + 1}</h3>`;
      if (part.isMatchHeader) {
        each(part.questions, (question) => {
          if (isEmpty(question.answer)) {
            htmlString += `<h2>❌</h2> ${question.content}`;
          } else {
            htmlString += `<h2>${
              ChoiceContentPipe.prototype.transform(
                question.answer,
                part.answers!,
              )?.content
            }</h2> ${question.content}`;
          }
        });
      } else {
        htmlString += `<p>${part.content}</p>`;
        each(part.questions, (question) => {
          htmlString += `<b>${question.name ? question.name : ''}</b>`;
          each(question.subQuestions, (subQuestion) => {
            htmlString += this.exportQuestion(subQuestion);
          });
          htmlString += '<hr>';
        });
      }
    });
    return (htmlString += this.endHTML());
  }

  static exportWriting(result: Result) {
    let htmlString = `<h1>${result.name} - Writing</h1><h2>Name: ${result.studentName}</h2><h2>Point: </h2>`;
    each(result.writingParts, (part) => {
      htmlString += `<div>${part.content}</div> <div>${part.answer}</div><hr><br>`;
    });
    return (htmlString += this.endHTML());
  }

  static exportLabelOnMap(question: Question) {
    let htmlString = '<table class="table">';
    htmlString += '<tr><th></th>';
    each(question.subQuestions![0].choices, (choice, index) => {
      htmlString += `<th>${CHOICE_INDEX[index]}</th>`;
    });
    htmlString += '</tr>';
    each(question.subQuestions, (question) => {
      htmlString += `<tr>
        <td>${question.content}</td>
      `;

      each(question.choices, (choice) => {
        htmlString += `
          <td>${question.answer.includes(choice.id) ? '✅' : ''}</td>
        `;
      });
    });
    htmlString += '</table>';
    return htmlString;
  }

  static exportMultipleChoices(question: Question) {
    let htmlString = '';
    each(question.choices, (choice, index) => {
      if (question.answer?.includes(choice.id!)) {
        htmlString += `
        <div class="choice">
          <div class="choice-index selected">
            <p>${CHOICE_INDEX[index]}</p>
          </div>
          <div class="choice-content">
            <p class="question-text">
              ${choice.content ? choice.content : ''}
            </p>
          </div>
        </div>
        `;
      } else {
        htmlString += `
         <div class="choice">
          <div class="choice-index">
            <p>${CHOICE_INDEX[index]}</p>
          </div>
          <div class="choice-content">
            <p class="question-text">
              ${choice.content ? choice.content : ''}
            </p>
          </div>
        </div>
        `;
      }
    });
    return htmlString;
  }

  static exportShortAnswer(question: Question) {
    let htmlString = '';
    each(question.choices, (choice) => {
      htmlString += `<div class="answer-container"><b>${choice.index ? choice.index : ''}</b> <span class="answer-input">${choice.answer ? choice.answer : ''}</span></div>`;
    });
    return htmlString;
  }

  static exportDropDownChoice(question: Question) {
    return `<b>Answer</b>: ${AnswerChoicePipe.prototype.transform(question)}`;
  }

  static exportFillInTheGap(question: Question) {
    let htmlString = '';
    const inputPattern = new RegExp(INPUT_PATTERN);
    each(question.arrayContent, (line) => {
      htmlString += '<div class="answer-container">';
      each(line, (content) => {
        if (IsInputPipe.prototype.transform(content)) {
          const answer = question.choices.find(
            (choice) => choice.id! === inputPattern.exec(content)![1],
          )?.answer;
          htmlString += `
            <span class="answer-input">${answer ?? ''}</span>
          `;
        } else {
          htmlString += `${content}`;
        }
      });
      htmlString += '</div>';
    });
    return htmlString;
  }

  static exportFeedback(result: Result) {
    let htmlString = `<h1>Bảng đánh giá</h1>
                        <div>
                          <b>Tên học viên:</b> ${result.studentName}
                        </div>
                        <div>
                          <b>Đánh giá:</b>${result.feedback?.rating.toString()}/5
                        </div>
                        ${
                          result.feedback?.rating! < 4
                            ? `
                        <div>
                          <b>Góp ý:</b> ${result.feedback?.content}
                        </div>`
                            : ''
                        }
                   `;
    return htmlString;
  }

  static exportFile(result: Result, htmlString: string, part: string) {
    if (!isEmpty(htmlString)) {
      asBlob(htmlString).then((data: any) => {
        saveAs(
          data,
          `${result.studentName}_${part}_${result.name}_${CommonUtils.getCurrentDate()}`,
        );
      });
    }
  }
}
