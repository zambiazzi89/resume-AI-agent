import { NextResponse } from 'next/server'
import { Document, Packer, Paragraph, TextRun } from 'docx'

import type { ResumeType } from '../data/resume'

export async function POST(req: Request) {
  try {
    const { resume, name, contact } = (await req.json()) as {
      resume: ResumeType
      name?: string
      contact?: string
    }

    const doc = new Document({
      styles: {
        default: {
          document: {
            run: {
              font: 'Helvetica',
            },
            paragraph: {
              spacing: {
                after: 50,
              },
            },
          },
        },
      },
      sections: [
        {
          children: [
            // NAME
            new Paragraph({
              children: [
                new TextRun({
                  text: name || 'Diego Bez Zambiazzi',
                  bold: true,
                  size: 36,
                }),
              ],
              spacing: { after: 100 },
            }),

            // CONTACT LINE
            new Paragraph({
              children: [
                new TextRun({
                  text:
                    contact ||
                    'Brazil / United States | diego@zambiazzi.com | linkedin.com/in/zambiazzi/ | github.com/zambiazzi89',
                  size: 20,
                }),
              ],
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: resume.title,
                  bold: true,
                  size: 24,
                }),
              ],
              spacing: { before: 150, after: 150 },
            }),

            // SUMMARY
            new Paragraph({
              children: [
                new TextRun({
                  text: resume.summary,
                  size: 22,
                }),
              ],
              spacing: { after: 200 },
            }),

            // SKILLS
            new Paragraph({
              children: [
                new TextRun({
                  text: 'SKILLS',
                  bold: true,
                  size: 24,
                }),
              ],
              spacing: { after: 100 },
            }),

            // Languages & Tools
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Languages & Tools: ',
                  bold: true,
                  size: 22,
                }),
                new TextRun({
                  text: resume.skills.languagesAndTools?.join(', ') || '',
                  size: 22,
                }),
              ],
            }),

            // Certifications
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Certifications: ',
                  bold: true,
                  size: 22,
                }),
                new TextRun({
                  text: resume.skills.certifications?.join(', ') || '',
                  size: 22,
                }),
              ],
            }),
            // Exposure
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Exposure to: ',
                  bold: true,
                  size: 22,
                }),
                new TextRun({
                  text: resume.skills.exposure?.join(', ') || '',
                  size: 22,
                }),
              ],
              spacing: { after: 200 },
            }),

            // EDUCATION
            new Paragraph({
              children: [
                new TextRun({
                  text: 'EDUCATION',
                  bold: true,
                  size: 24,
                }),
              ],
              spacing: { after: 100 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Southern New Hampshire University',
                  bold: true,
                  size: 22,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'BS in Computer Science (Software Engineering Concentration)',
                  bold: true,
                  size: 22,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "May 2022 | GPA: 3.99 | President's List (2019-2022) | Alpha Sigma Lambda Honor Society",
                  size: 22,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Core Concepts: ',
                  bold: true,
                  size: 22,
                }),
                new TextRun({
                  text: 'Data Structures and Algorithms, Applied Statistics for STEM, Discrete Mathematics, Software Development Lifecycle (SDLC), Object Oriented Programing (OOP), Software Testing, Automation and QA, Mobile Development, Machine Learning, Full-Stack Development',
                  size: 22,
                }),
              ],
              spacing: { after: 200 },
            }),

            // EXPERIENCE
            new Paragraph({
              children: [
                new TextRun({
                  text: 'PROFESSIONAL EXPERIENCE',
                  bold: true,
                  size: 24,
                }),
              ],
              spacing: { after: 100 },
            }),

            ...resume.experience.flatMap((job) => [
              // Role + Company
              new Paragraph({
                children: [
                  new TextRun({
                    text: job.role,
                    bold: true,
                    size: 22,
                  }),
                ],
                spacing: { after: 50 },
              }),

              new Paragraph({
                children: [
                  new TextRun({
                    text: job.company + ', ' + job.location,
                    italics: true,
                    size: 22,
                  }),
                ],
                spacing: { after: 50 },
              }),

              // Bullets
              ...job.bullets.map(
                (b: string) =>
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: b,
                        size: 22,
                      }),
                    ],
                  }),
              ),

              // spacing between jobs
              new Paragraph({
                text: '',
              }),
            ]),

            // PROJECTS
            new Paragraph({
              children: [
                new TextRun({
                  text: 'PROJECTS',
                  bold: true,
                  size: 24,
                }),
              ],
              spacing: { after: 100 },
            }),

            ...(resume.projects?.flatMap((proj) => [
              new Paragraph({
                children: [
                  new TextRun({
                    text: proj.name,
                    bold: true,
                    size: 22,
                  }),
                ],
              }),

              new Paragraph({
                children: [
                  new TextRun({
                    text: proj.tech.join(', '),
                    italics: true,
                    size: 20,
                  }),
                ],
              }),

              new Paragraph({
                children: [
                  new TextRun({
                    text: proj.description,
                    size: 22,
                  }),
                ],
                spacing: { after: 150 },
              }),
            ]) || []),
          ],
        },
      ],
    })

    const buffer = await Packer.toBuffer(doc)

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': 'attachment; filename=resume.docx',
      },
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Error generating document' },
      { status: 500 },
    )
  }
}
