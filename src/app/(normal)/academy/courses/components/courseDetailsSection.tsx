// src/app/(normal)/academy/courses/components/courseDetailsSection.tsx
import React from 'react';
import Link from 'next/link';

interface Course {
  title: string;
  age: string;
  lessons: number;
  features: string[];
}

const courses: Course[] = [
  {
    title: 'Intro Class',
    age: '6-8',
    lessons: 12,
    features: [
      'Simple structure designs (levers, etc.)',
      'Learning basic logic structures',
      'Learning various robot movement control methods',
      'Applying simple physics and maths principles',
      'Programming using plug-and-play technologies',
    ],
  },
  {
    title: 'Junior Class',
    age: '9-11',
    lessons: 24,
    features: [
      'Intermediate structure design',
      'Combined use of various conditional logics',
      'Introduction to AI recognition applications',
      'Learning to apply physics and maths knowledge to problem-solve',
      'Programming using block-based coding',
    ],
  },
  {
    title: 'Explorer Class',
    age: '12-15',
    lessons: 48,
    features: [
      'Advanced and composite structure design',
      'Industrial design logic simulating real world scenarios',
      'Diverse and flexible application of AI program structure knowledge',
      'Learn automation through data processing',
      'Programming using block-based coding and modern coding languages',
    ],
  },
];

export default function CourseDetailsSection() {
  return (
    <section className="bg-white shadow rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">Step 2: Check Our Plan & Pricing</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.title} className="border rounded-lg p-4 flex flex-col">
            <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
            <div className="flex flex-wrap gap-2 text-xs mb-4">
              <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                👧 Ages: {course.age}
              </span>
              <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                ⏳ 60 mins
              </span>
              <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                👨‍👨‍👧 Max 8 Learners
              </span>
              <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                📚 {course.lessons} Lessons
              </span>
              <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                💰 R280/Lesson
              </span>
            </div>
            <ul className="list-disc list-outside ml-6 mb-4 text-sm">
              {course.features.map((feat, idx) => (
                <li key={idx} className="mb-1">{feat}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col items-center space-y-4 lg:flex-row lg:items-start lg:space-y-0 lg:space-x-4">
        <Link href="/enrollment">
          <button className="btn">Enroll Now</button>
        </Link>
      </div>
    </section>
  );
}