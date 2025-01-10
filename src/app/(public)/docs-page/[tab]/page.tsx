'use client'
import contentData from '@/services/contentData.json';
import { usePathname } from 'next/navigation';
import { Box, Container, Typography } from '@mui/material';
import DocsLayout from '@/components/layouts/DocsLayout';
import Image from 'next/image';

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
          <Typography variant="body1" gutterBottom>
            {content.subtitle}
          </Typography>
        )}
        {content.image && (
          <Box sx={{ textAlign: 'center', my: 4 }}>
            <Image src={content.image} alt={content.title} layout="responsive" width={600} height={400} />
          </Box>
        )}
        {content.sections.map((section, index) => (
          <Box key={index} sx={{ my: 2 }}>
            {Array.isArray(section.content) ? (
              <ul>
                {section.content.map((item, idx) => (
                  <ul key={idx}>
                    <Typography variant="body2">{item}</Typography>
                  </ul>
                ))}
              </ul>
            ) : (
              section.content && <Typography variant="body2">{section.content}</Typography>
            )}
            {section.image && (
              <Box sx={{ textAlign: 'center', my: 4 }}>
                <Image src={section.image} alt={`Section image ${index + 1}`} layout="responsive" width={600} height={400} />
              </Box>
            )}
            {section.list && (
              <ul>
                {section.list.map((item, idx) => (
                  <li key={idx}>
                    <Typography variant="body2" my={2}>{item}</Typography>
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