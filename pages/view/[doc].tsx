import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ThemeLoader from 'components/ThemeLoader';
import Presentation from 'components/Presentation';
import { useFrontmatter } from 'utils/frontmatter';
import { getPublished } from 'services/firebase';
import { EditLayout } from 'styles';

export default function View(): React.ReactElement {
  const router = useRouter();
  const doc = router.query.doc as string;
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    if (doc) {
      getPublished(doc).then((snapshot) => {
        if (snapshot.exists) {
          const { value } = snapshot.data();
          if (value == null) return;
          setMarkdown(value);
        }
      });
    }
  }, [doc]);

  const { content, data } = useFrontmatter(markdown);

  return (
    <EditLayout>
      <ThemeLoader theme={data?.theme} />
      <Presentation theme={data?.theme} content={content} />
    </EditLayout>
  );
}
