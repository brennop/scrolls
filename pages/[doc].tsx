import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { db } from '../services/firebase';
import ThemeLoader from '../components/ThemeLoader';
import Presentation from '../components/Presentation';
import { useFrontmatter } from '../utils/frontmatter';
import { EditLayout, LoadingWrapper } from '../styles';
import Toolbar from 'components/Toolbar';
import Publish from 'components/Publish';

const CodeEditor = dynamic(() => import('../components/Editor'), {
  ssr: false,
});

function Slides(): React.ReactElement {
  const router = useRouter();
  const doc = router.query.doc as string;

  const [value, setValue] = useState(null);
  const [markdown, setMarkdown] = useState('');
  const [loading, setLoading] = useState(true);

  const { content, data } = useFrontmatter(markdown);

  useEffect(() => {
    if (doc) {
      db.ref(doc)
        .once('value')
        .then((snapshot) => {
          setLoading(false);
          const value = snapshot.val();

          if (value == null) return;

          setValue(value);
        });
      document.title = `${doc} - Scrolls`;
    }
  }, [doc]);

  const commit = (value: any) => db.ref(doc).set(value);

  return loading === false ? (
    <EditLayout>
      <ThemeLoader theme={data?.theme} />
      <CodeEditor initialValue={value} roomName={doc} commit={commit} onChange={setMarkdown} />
      <Presentation theme={data?.theme} content={content} />
      <Toolbar>
        <Publish data={markdown} name={doc} />
      </Toolbar>
    </EditLayout>
  ) : (
    <LoadingWrapper>
      <img src="tail-spin.svg" alt="loading indicator" />
    </LoadingWrapper>
  );
}

export default Slides;
