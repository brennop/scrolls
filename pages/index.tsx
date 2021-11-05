import React, { useRef } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const input = useRef(null!);

  const redirect = () => {
    router.push(`/${input.current.value}`);
  };

  return (
    <div
      css={{ padding: '120px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h1 css={{ fontSize: 36, margin: 24 }}>scrolls</h1>
      <form onSubmit={redirect}>
        <label>
          <span>scroll.vercel.app/</span>
          <input ref={input} name="path" />
        </label>
        <button>Go</button>
      </form>
    </div>
  );
}
