import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { TestComponent } from './test.component';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Result } from '../../common/models/result.model';

const mockRoute = {
  paramMap: of({ quizId: '1' }),
};

fdescribe('TestComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: [
        importProvidersFrom([BrowserAnimationsModule]),
        provideHttpClient(),
        {
          provide: ActivatedRoute,
          useValue: mockRoute,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('calculatePoint should return correct', () => {
    component.result = mockResult;
    component.submit();
    expect(component.result.correctListeningPoint).toEqual(9);
    expect(component.result.totalListeningPoint).toEqual(14);

    expect(component.result.correctReadingPoint).toEqual(5);
    expect(component.result.totalReadingPoint).toEqual(12);
  });
});

const mockResult = {
  id: '6679ad28dbd096e6d321',
  name: 'Test 1',
  listeningParts: [
    {
      id: '66799f2d97874c34fe6d',
      name: 'Part 1',
      content: '',
      questions: [
        {
          id: '66799f38927423feb5d7',
          content: '1. Multiple choice questions',
          type: 0,
          choices: [
            {
              id: '66799f3844206055ccf9',
              content: 'correct',
            },
            {
              id: '66799f3814bb64cc862d',
              content: 'correct',
            },
            {
              id: '66799f3883f2cade40ab',
              content: 'answer 3',
            },
            {
              id: '66799f3875d300263113',
              content: 'answer 3',
            },
          ],
          answer: [
            '66799f3844206055ccf9',
            '66799f3883f2cade40ab',
            '66799f3814bb64cc862d',
          ],
          correctAnswer: ['66799f3844206055ccf9', '66799f3814bb64cc862d'],
        },
        {
          id: '6679a02a1265569e1599',
          content: 'Short answer',
          type: 1,
          choices: [
            {
              id: '6679a0319db762c6529b',
              content: '',
              index: '2',
              correctAnswer: 'correct/Correct',
              answer: 'correct',
            },
            {
              id: '6679a04cc47c57c2a481',
              content: '',
              index: '3',
              correctAnswer: 'correct',
              answer: 'wrong',
            },
            {
              id: '6679a05b10fc72f9731e',
              content: '',
              index: '4',
              correctAnswer: 'correct/Correct',
              answer: 'Correct',
            },
            {
              id: '6679a061ba3ff8356d02',
              content: '',
              index: '5',
              correctAnswer: 'correct',
            },
          ],
          answer: [],
          correctAnswer: [],
        },
        {
          id: '6679a06b6a61c3bfe8c3',
          content: 'Dropdown choice',
          type: 3,
          choices: [
            {
              id: '6679a06b2af859d90eaa',
              content: 'correct',
            },
            {
              id: '6679a06be9757cabc6c7',
              content: 'answer 1',
            },
            {
              id: '6679a06ba0d821344880',
              content: 'answer 2',
            },
          ],
          answer: '6679a06b2af859d90eaa',
          correctAnswer: '6679a06b2af859d90eaa',
        },
        {
          id: '6679a5de2ea19f5275c',
          content: 'Label on map',
          type: 4,
          choices: [
            {
              id: '6679a5dea5e75f29821b',
              content: '',
            },
            {
              id: '6679a5de7927cd8ba3ad',
              content: '',
            },
            {
              id: '6679a5de5537bf82ac16',
              content: '',
            },
            {
              id: '6679a5de4c314b5b9d85',
              content: '',
            },
          ],
          answer: [],
          correctAnswer: [],
          subQuestions: [
            {
              id: '6679a72c1ce51ca48f3d',
              content: '1. Abrahame',
              type: 1,
              choices: [
                {
                  id: '6679a757ad7abd1ddc7c',
                  content: '',
                },
                {
                  id: '6679a758f4843024f51f',
                  content: '',
                },
                {
                  id: '6679a758a36ea290bc8e',
                  content: '',
                },
                {
                  id: '6679a759425d307e2af',
                  content: '',
                },
              ],
              answer: ['6679a757ad7abd1ddc7c'],
              correctAnswer: ['6679a757ad7abd1ddc7c'],
            },
            {
              id: '6679a739bd05ccfd9adb',
              content: '2. Lincol',
              type: 1,
              choices: [
                {
                  id: '6679a757ad7abd1ddc7c',
                  content: '',
                },
                {
                  id: '6679a758f4843024f51f',
                  content: '',
                },
                {
                  id: '6679a758a36ea290bc8e',
                  content: '',
                },
                {
                  id: '6679a759425d307e2af',
                  content: '',
                },
              ],
              answer: ['6679a758f4843024f51f'],
              correctAnswer: ['6679a757ad7abd1ddc7c'],
            },
            {
              id: '6679a754a727d7eea0c1',
              content: '3. David',
              type: 1,
              choices: [
                {
                  id: '6679a757ad7abd1ddc7c',
                  content: '',
                },
                {
                  id: '6679a758f4843024f51f',
                  content: '',
                },
                {
                  id: '6679a758a36ea290bc8e',
                  content: '',
                },
                {
                  id: '6679a759425d307e2af',
                  content: '',
                },
              ],
              answer: ['6679a757ad7abd1ddc7c'],
              correctAnswer: ['6679a757ad7abd1ddc7c'],
            },
          ],
        },
        {
          id: '6679a7d64679704d7226',
          content: 'Fill in the gap',
          arrayContent: [
            ['Line 1', '<6679a95c99c0a15b7e75>'],
            ['Line 2', '<6679a97e2afacd53ab8>'],
            ['Line 3', '<6679a9cf93a29734cc97>'],
          ],
          type: 5,
          choices: [
            {
              id: '6679a95c99c0a15b7e75',
              content: '',
              correctAnswer: 'answer 1',
              answer: 'answer 1',
            },
            {
              id: '6679a97e2afacd53ab8',
              content: '',
              correctAnswer: 'answer 2',
              answer: 'wrong',
            },
            {
              id: '6679a9cf93a29734cc97',
              content: '',
              correctAnswer: 'answer 3',
            },
          ],
          answer: [],
          correctAnswer: [],
          subQuestions: [],
        },
      ],
      audioName: '',
      wordCount: 0,
    },
    {
      id: '66799f32c8ddae906cf4',
      name: '',
      content: '',
      questions: [
        {
          id: '6679a9e0158015f0383b',
          content: 'Multiple choice',
          type: 0,
          choices: [
            {
              id: '6679a9e04b513d97b6e2',
              content: 'correct',
            },
            {
              id: '6679a9e0265921872e82',
              content: 'answer 2',
            },
            {
              id: '6679a9e093702adfe3e7',
              content: 'answer 3',
            },
            {
              id: '6679a9e02584e8dc04f6',
              content: 'answer 4',
            },
          ],
          answer: ['6679a9e04b513d97b6e2'],
          correctAnswer: ['6679a9e04b513d97b6e2'],
        },
      ],
      audioName: '',
      wordCount: 0,
    },
  ],
  readingParts: [
    {
      id: '6679a9ff248ea1938556',
      content: '',
      questions: [
        {
          id: '6679aa0145e2cb6b66b1',
          content: '',
          type: 2,
          choices: [],
          answer: [],
          correctAnswer: [],
          subQuestions: [
            {
              id: '6679aa0e1c8fea739826',
              content: '1. Multiple choice questions',
              type: 0,
              choices: [
                {
                  id: '6679aa0e2c864066c73e',
                  content: 'correct',
                },
                {
                  id: '6679aa0ef8570346b5a5',
                  content: 'answer 2',
                },
                {
                  id: '6679aa0e1544afea1331',
                  content: 'answer 3',
                },
                {
                  id: '6679aa0ec87aee7c9c88',
                  content: 'answer 4',
                },
              ],
              answer: ['6679aa0e2c864066c73e', '6679aa0ef8570346b5a5'],
              correctAnswer: ['6679aa0e2c864066c73e', '6679aa0ef8570346b5a5'],
            },
            {
              id: '6679ab8fed6fe1886b02',
              content: '2. Short answer',
              type: 1,
              choices: [
                {
                  id: '6679ab96d1245b370daa',
                  content: '',
                  index: '2',
                  correctAnswer: 'correct',
                  answer: 'correct',
                },
                {
                  id: '6679aba723b989da97cd',
                  content: '',
                  index: '3',
                  correctAnswer: 'correct',
                  answer: 'wrong',
                },
                {
                  id: '6679abab7fb483e93354',
                  content: '',
                  index: '4',
                  correctAnswer: 'correct/Correct',
                  answer: 'Correct',
                },
              ],
              answer: [],
              correctAnswer: [],
            },
            {
              id: '6679abb1a5cbbe8c55bb',
              content: '3. Dropdown',
              type: 3,
              choices: [
                {
                  id: '6679abb1bff0f115ac8e',
                  content: 'correct',
                },
                {
                  id: '6679abb180ab544fe0b7',
                  content: 'answer 2',
                },
                {
                  id: '6679abb1d48b1e9d8eba',
                  content: 'answer 3',
                },
              ],
              answer: '6679abb180ab544fe0b7',
              correctAnswer: '6679abb1bff0f115ac8e',
            },
            {
              id: '6679abc76c47749485dc',
              content: '4. Dropdown not select',
              type: 3,
              choices: [
                {
                  id: '6679abc78f3d008ce739',
                  content: 'correct',
                },
                {
                  id: '6679abc715de6054930f',
                  content: 'answer 2',
                },
                {
                  id: '6679abc7b0d6eda11ce8',
                  content: 'answer 3',
                },
              ],
              answer: [],
              correctAnswer: '6679abc78f3d008ce739',
            },
            {
              id: '6679abd5de6ae3479418',
              content: '5. Fill in the gap',
              arrayContent: [
                [
                  'This is a very long text that this line cannot contain',
                  '<6679abe4f00636d5b0b>',
                ],
                ['Line 2', '<6679ac537cb3d3eadd29>'],
                ['Line 3', '<6679ac5a12c511781c1>'],
              ],
              type: 5,
              choices: [
                {
                  id: '6679abe4f00636d5b0b',
                  content: '',
                  correctAnswer: 'answer 1',
                  answer: 'answer 1',
                },
                {
                  id: '6679ac4245f25f921dc9',
                  content: '',
                  correctAnswer: 'answer 2',
                },
                {
                  id: '6679ac4ae99da4121cc8',
                  content: '',
                },
                {
                  id: '6679ac537cb3d3eadd29',
                  content: '',
                  correctAnswer: 'answer 2',
                  answer: 'wrong',
                },
                {
                  id: '6679ac5a12c511781c1',
                  content: '',
                  correctAnswer: 'answer 3',
                },
              ],
              answer: [],
              correctAnswer: [],
              subQuestions: [],
            },
          ],
          name: 'Question 1-5',
        },
      ],
      wordCount: 0,
    },
    {
      id: '6679ac756774525a873a',
      content: '',
      questions: [
        {
          id: '6679ac778831dfde0f5e',
          content: '',
          type: 2,
          choices: [],
          answer: [],
          correctAnswer: [],
          subQuestions: [
            {
              id: '6679acd56b192c798da5',
              content: '6. Multiple choices',
              type: 0,
              choices: [
                {
                  id: '6679acd55e1592b55fbf',
                  content: 'correct answer 1',
                },
                {
                  id: '6679acd5758f2b9dab62',
                  content: 'answer 2',
                },
                {
                  id: '6679acd5b4fd58a3ed97',
                  content: 'answer 3',
                },
                {
                  id: '6679acd5a622699cd78b',
                  content: 'answer 4',
                },
              ],
              answer: ['6679acd55e1592b55fbf'],
              correctAnswer: ['6679acd55e1592b55fbf'],
            },
          ],
          name: 'Question  6',
        },
      ],
      wordCount: 0,
    },
  ],
  writingParts: [
    {
      id: '6679acf2ce55d774dffa',
      content: 'Writing part 1',
      questions: [],
      answer:
        "<div>Nowadays, a vast amount of parents prefer to fill up their children free time with extra classes and other activites. Though there are some parents think that normal curriculum at school is enough for their children. In my opinion, even though the standard schedule at school is important and well-organized,&#160; it isn't enough for the children to develop their potential skills and make them spend their time efficiently.</div><div>Firstly, investing in education is never a loss for every individuals, parents are seeking for successful people and expecting their children to be like one in the future, and with that belief, they need to explore what is their children's talents and interests as they want to invest wisely and efficiently. Children can develop their skills, learn new things when they come to extra classes and they can enhance their talents by attending these classes. For example, a child who loves math can go to math extra classes to learn and use the knowledge that school barely teach them.&#160;</div><div>Economically, knowledge from extra classes can let children accomplish their dream more easily compared to children who do not come to extra classes. Children who come to classes that is not in the standard curriculum are having specific plans to accomplish their goal, they want to fulfill the requirements of their dream schools and universities. For instance, while other students are struggling with the graduation exam, students that have crucial certificates can be accepted immediately and earn scholarship so their parents do not need to care about the education fees.</div><div>In conclusion, I think that children should go to extra classes that help them to develop their skills and accomplish their dreams.</div>",
      wordCount: 276,
    },
    {
      id: '6679ad17fc1175442b9',
      content: 'Writing part 2',
      questions: [],
      answer:
        "<div>Nowadays, a vast amount of parents prefer to fill up their children free time with extra classes and other activites. Though there are some parents think that normal curriculum at school is enough for their children. In my opinion, even though the standard schedule at school is important and well-organized,&#160; it isn't enough for the children to develop their potential skills and make them spend their time efficiently.</div><div>Firstly, investing in education is never a loss for every individuals, parents are seeking for successful people and expecting their children to be like one in the future, and with that belief, they need to explore what is their children's talents and interests as they want to invest wisely and efficiently. Children can develop their skills, learn new things when they come to extra classes and they can enhance their talents by attending these classes. For example, a child who loves math can go to math extra classes to learn and use the knowledge that school barely teach them.&#160;</div><div>Economically, knowledge from extra classes can let children accomplish their dream more easily compared to children who do not come to extra classes. Children who come to classes that is not in the standard curriculum are having specific plans to accomplish their goal, they want to fulfill the requirements of their dream schools and universities. For instance, while other students are struggling with the graduation exam, students that have crucial certificates can be accepted immediately and earn scholarship so their parents do not need to care about the education fees.</div><div>In conclusion, I think that children should go to extra classes that help them to develop their skills and accomplish their dreams.</div>",
      wordCount: 276,
    },
  ],
  listeningTimeout: 60,
  readingTimeout: 59.5,
  audioTime: 58,
  studentName: 'Tu',
  currentTab: 2,
  testDate: '25/06/2024',
  correctListeningPoint: 8,
  totalListeningPoint: 14,
  correctReadingPoint: 5,
  totalReadingPoint: 13,
  isSubmit: true,
  writingTimeout: null,
} as unknown as Result;
