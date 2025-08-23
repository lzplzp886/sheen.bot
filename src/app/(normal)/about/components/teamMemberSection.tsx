// src/app/(normal)/about/components/teamMembersSection.tsx
'use client';

import Image from 'next/image';
import SectionContainer from './sectionContainer';

interface Member {
  id: string;
  name: string;
  role: string;
  img: string;    // 1500 × 1500 原图，放 /public
  bio: string;    // ≈ 50 words
}

const TEAM: Member[] = [
  {
    id: 'm1',
    name: 'Adam Lin',
    role: 'Founder & Director',
    img: '/images/about/our-staff/adam.png',
    bio: `I have spent the past years turning bleeding-edge AI research into real-world products. At Sheen Robotics I lead vision, strategy and a growing team of engineers and educators who share a passion for making coding & robotics fun and accessible for young generations.`,
  },
  {
    id: 'm2',
    name: 'Theresa Ely-Felino',
    role: 'Co-Founder & Head of Education',
    img: '/images/about/our-staff/theresa.png',
    bio: `With experience in the corporate field, project management, and non-profit education across Africa, I design coding and robotics programmes that empower learners and teachers. My work focuses on building impactful initiatives and partnerships that make tech education inclusive, practical, and accessible for all.`,
  },
  {
    id: 'm3',
    name: 'Bafo Nathan Yoti',
    role: 'Educator: Explorer Class',
    img: '/images/about/our-staff/bafo.png',
    bio: `With over five years of experience teaching coding and robotics, my passion is to empower students to be creators. My goal is to show them how technology gives them the power to innovate and bring ideas to life, preparing them for the digital world.`,
  },
  {
    id: 'm4',
    name: 'Tara-Ann Diederiks',
    role: 'Educator: Junior Class',
    img: '/images/about/our-staff/tara.png',
    bio: `With a background in Medical Biosciences and a passion for STEM education, I strive to spark curiosity and creativity in every learner. I teach coding and robotics through engaging, hands-on experiences that make learning meaningful. By connecting everyday concepts to technology, I encourage learners to explore, experiment, and build the confidence and skills needed to thrive in a digital world—preparing them not just to keep up with the future, but to shape it.`,
  },
  {
    id: 'm5',
    name: 'Bulelwa Dyasi',
    role: 'Educator: Intro Class',
    img: '/images/about/our-staff/bulelwa.png',
    bio: `I love seeing that moment when something “clicks,” whether it's a robot completing its first programmed turn or a learner proudly sharing a game they created. With an IT and teaching qualification, and experience that spans classrooms across countries, I design learning experiences that are both playful and purposeful. My goal is to make tech fun, meaningful, and accessible to every learner, helping them grow as thinkers, builders, and future innovators.`,
  },
  {
    id: 'm6',
    name: 'Nonkululeko Maseko',
    role: 'Office Administrator',
    img: '/images/about/our-staff/nkule.png',
    bio: `I'm passionate about empowering the next generation through hands-on robotics and coding education. With a strong background in Information Systems/IT, I bring expertise in software development, digital tools, and systems management. By combining technical and administrative skills, I support a team dedicated to inspiring creativity, problem-solving, and technological exploration in children.`,
  },
  {
    id: 'm7',
    name: 'Isra Rinquest',
    role: 'Sales Representative',
    img: '/images/about/our-staff/isra.png',
    bio: `My role is to inspire and recruit young minds to explore the exciting world of robotics and coding. I'm passionate about creating opportunities for kids to learn, grow, and build future ready skills. Helping them discover Sheen Academy's potential truly drives my mission every day.`,
  },
];

export default function TeamMembersSection() {
  return (
    <SectionContainer>
      <h3 className="text-2xl font-semibold mb-6">Meet the Team</h3>

      {/* 3 列栅格（≥ md），移动端自动 1 列 */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {TEAM.map((m) => (
          <div key={m.id} className="flex flex-col items-center text-center space-y-4">
            {/* 正方形头像：自动裁剪/缩放 */}
            <div className="relative w-40 h-40 md:w-48 md:h-48">
              <Image
                src={m.img}
                alt={m.name}
                fill
                sizes="(max-width: 768px) 160px, 192px"
                className="object-cover rounded-full shadow"
                priority
              />
            </div>

            <div>
              <h4 className="text-lg font-semibold">{m.name}</h4>
              <p className="text-sm text-blue-600">{m.role}</p>
            </div>

            {/* 简短 bio */}
            <p className="text-sm text-gray-700 px-2">{m.bio}</p>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}