import { useState } from 'react';
import AriaModal from 'react-aria-modal';
import { publish } from 'services/firebase';

export default function Publish({ data, name }) {
  const [show, setShow] = useState(false);
  const [path, setPath] = useState<string>(null);
  const origin = window.location.origin;
  const fullPath = `${origin}/view/${path}`;

  const handlePublish = () => {
    publish(data, name)
      .then(setPath)
      .then(() => setShow(true));
  };

  return (
    <>
      <button onClick={handlePublish}>
        <span className="emoji">🚀</span>
        Publish
      </button>
      {show && (
        <AriaModal
          onExit={() => setShow(false)}
          titleText="Published"
          verticallyCenter={true}
          underlayStyle={{ cursor: 'default' }}
        >
          <div
            css={{
              background: '#212121',
              borderRadius: '8px',
              width: '320px',
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <h1
              css={{
                color: '#fff',
                margin: '0',
              }}
            >
              <span className="emoji">🚀 </span>
              Published to
            </h1>
            <a
              href={`/view/${path}`}
              target="_blank"
              rel="noreferrer noopener"
              css={{
                color: '#fff',
                fontSize: '18px',
              }}
            >
              {fullPath}
            </a>
          </div>
        </AriaModal>
      )}
    </>
  );
}
