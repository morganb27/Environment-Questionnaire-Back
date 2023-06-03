import { Injectable } from '@nestjs/common';
import * as mitigationQuestions from './data/questions_mitigation.json';

export interface PayloadType {  
  questionId: number;
  answerId: number;
}

@Injectable()
export class MitigationQuestionsService {
  questions = mitigationQuestions;

  #getFiveQuestions(): any {
    return this.questions.slice(0, 5).map((question) => {
      const randomQuestion = JSON.parse(JSON.stringify(question));

      randomQuestion.answers.forEach((answer) => {
        delete answer.isCorrect;
      });

      return randomQuestion;
    });
  }

  getQuestions(): any {
    return this.#getFiveQuestions();
  }

  checkAnswers(payload: PayloadType[]): number {
    let correctAnswerCount = 0;
    payload.forEach(item => {
      const question = this.questions.find(question => question.id === item.questionId);
      if (question) {
        const answer = question.answers.find(answer => answer.id === item.answerId);
        if (answer && answer.isCorrect) {
          correctAnswerCount++;
        }
      }
    });
    return correctAnswerCount;
  }
  
}
