'use client'
import contentData from '@/services/contentData.json';
import { usePathname } from 'next/navigation';
import { Box, Container, Typography } from '@mui/material';
import DocsLayout from '@/components/layouts/DocsLayout';
import Image from "next/legacy/image";

type ContentDataKeys = keyof typeof contentData;

interface Section {
  content?: string | string[];
  image?: string;
  list?: string[];
}

interface Content {
  title: string;
  subtitle?: string;
  sections: Section[];
  image?: string;
}

export default function DocTabPage() {
  const pathname = usePathname();
  const tabKey = (pathname.split('/').pop() || 'not-found') as ContentDataKeys;

  const content: Content = contentData[tabKey] || {
    title: 'Not Found',
    sections: [],
  };

  const renderContent = () => {
    return (
      <>
        <Typography
          variant="h3"
          maxWidth={650}
          sx={{
            background: 'linear-gradient(to right,#D40075,#4340FF 30%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
          }}
        >
          {content.title}
        </Typography>
        {content.subtitle && (
          <Typography variant="subtitle1" mb={4} gutterBottom>
            {content.subtitle}
          </Typography>
        )}
        {content.sections.map((section, index) => (
          <Box key={index} sx={{ my: 2 }}>
            {Array.isArray(section.content) ? (
              <ul>
                {section.content.map((item, idx) => (
                  <ul key={idx}>
                    <Typography fontWeight="light" variant="subtitle2" >{item}</Typography>
                  </ul>
                ))}
              </ul>
            ) : (
              section.content && <Typography fontWeight="light" variant="subtitle2">{section.content}</Typography>
            )}
            {section.image && (
              <Box sx={{ my: 4, display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ width:'80%' }}>
                  <Image src={section.image} alt={`Section image ${index + 1}`} layout="responsive" width={600} height={400} />
                </Box>
              </Box>
            )}
            {section.list && (
              <ul>
                {section.list.map((item, idx) => (
                  <li key={idx}>
                    <Typography fontWeight="light" variant="subtitle2">{item}</Typography>
                  </li>
                ))}
              </ul>
            )}
          </Box>
        ))}
      </>
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        color: '#fff',
        mt: 12,
      }}
    >
      <Container>
        <DocsLayout>
          {renderContent()}
        </DocsLayout>
      </Container>
    </Box>
  );
}