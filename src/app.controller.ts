import { Controller, Get, Post, Body } from '@nestjs/common';
import { EnvironmentQuestionsService, PayloadType } from './environmentQuestionsService';  

@Controller()
export class AppController {
  constructor(
    private readonly environmentQuestionsService: EnvironmentQuestionsService,
  ) {}

  @Get('environment_questions')
  getEnvironmentQuestions(): any {
    return this.environmentQuestionsService.getQuestions();
  }

  @Post('environment_answers')
  getEnvironmentAnswers(@Body() payload: PayloadType[]): Object {  
    return this.environmentQuestionsService.checkAnswers(payload)
  }

  @Post('/submit_answers')
  submitAnswers(@Body() req: any): any {
    const answers = req.answers; 
    let score = this.environmentQuestionsService.checkAnswers(answers);
    return {score: score};
  }



}
