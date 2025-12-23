// src/app/(normal)/downloads/page.tsx

import React from 'react';
import DownloadsClientPage from './DownloadsClientPage'; // 引入客户端组件

export const metadata = {
  title: 'Downloads | sheenbot∞ Software & Tools',
  description: 'Download Mind+, sheenbot∞ extensions, and mobile apps to start your robotics coding journey.',
};

export default function DownloadsPage() {
  return <DownloadsClientPage />;
}