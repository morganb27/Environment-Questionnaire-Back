import { Controller, Get, Post, Body } from '@nestjs/common';
import { EnvironmentQuestionsService, PayloadType } from './environmentQuestionsService';  
import { MitigationQuestionsService } from './mitigationQuestionsService';

@Controller()
export class AppController {
  constructor(
    private readonly environmentQuestionsService: EnvironmentQuestionsService,
    private readonly mitigationQuestionsService: MitigationQuestionsService,
  ) {}

  @Get('environment_questions')
  getEnvironmentQuestions(): any {
    return this.environmentQuestionsService.getQuestions();
  }

  @Get('mitigation_questions')
  getMitigationQuestions(): any {
    return this.mitigationQuestionsService.getQuestions();
  }

  @Post('/submit_environment_answers')
submitEnvironmentAnswers(@Body() req: any): any {
  const answers = req.answers;
  const score = this.environmentQuestionsService.checkAnswers(answers);
  return { score: score };
}

@Post('/submit_mitigation_answers')
submitMitigationAnswers(@Body() req: any): any {
  const answers = req.answers;
  const score = this.mitigationQuestionsService.checkAnswers(answers);
  return { score: score };
}




}
