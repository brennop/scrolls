import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { getDocument, setDocument } from '../services/firebase';
import ThemeLoader from '../components/ThemeLoader';
import Presentation from '../components/Presentation';
import { useFrontmatter } from '../utils/frontmatter';
import { EditLayout, LoadingWrapper } from '../styles';
import Publish from 'components/Publish';

const Editor = dynamic(() => import('../components/Editor'), {
  ssr: false,
});

function Slides(): React.ReactElement {
  const router = useRouter();
  const doc = router.query.doc as string;

  const [value, setValue] = useState<Uint8Array>(null);
  const [loading, setLoading] = useState(true);
  const [markdown, setMarkdown] = useState('');
  const [line, setLine] = useState(0);

  const { content, config } = useFrontmatter(markdown);

  useEffect(() => {
    if (doc) {
      getDocument(doc)
        .then(setValue)
        .finally(() => setLoading(false));
    }
  }, [doc]);

  const commit = (value: any) => setDocument(doc, value);

  return loading === false ? (
    <EditLayout>
      <ThemeLoader theme={config.theme} />
      <Editor
        initialValue={value}
        roomName={doc}
        commit={commit}
        onChange={setMarkdown}
        onLineChange={setLine}
      />
      <Presentation
        line={line}
        config={config}
        content={content}
        toolbar={<Publish data={markdown} name={doc} />}
      />
    </EditLayout>
  ) : (
    <LoadingWrapper>
      <img src="tail-spin.svg" alt="loading indicator" />
    </LoadingWrapper>
  );
}

export default Slides;
