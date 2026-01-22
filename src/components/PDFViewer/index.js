import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

const PDFViewerContent = ({ fileUrl }) => {
  // ייבוא הספריות רק בצד לקוח (Browser)
  const { Worker, Viewer } = require('@react-pdf-viewer/core');
  const { defaultLayoutPlugin } = require('@react-pdf-viewer/default-layout');

  // ייבוא קבצי ה-CSS של הנגן
  require('@react-pdf-viewer/core/lib/styles/index.css');
  require('@react-pdf-viewer/default-layout/lib/styles/index.css');

  // יצירת הפלאגין שנותן את הסרגל העליון (זום, הורדה וכו')
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div style={{ height: '750px', border: '1px solid rgba(0, 0, 0, 0.3)' }}>
      {/* הגדרת ה-Worker - משתמשים בגרסה תואמת למה שהתקנו */}
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Viewer
          fileUrl={fileUrl}
          plugins={[defaultLayoutPluginInstance]}
          theme="dark" // נראה מעולה באתרים חשוכים
        />
      </Worker>
    </div>
  );
};

export default function PDFViewer(props) {
  return (
    <BrowserOnly fallback={<div>Loading PDF Viewer...</div>}>
      {() => <PDFViewerContent {...props} />}
    </BrowserOnly>
  );
}