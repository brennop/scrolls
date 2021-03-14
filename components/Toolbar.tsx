export default function Toolbar({ children }) {
  return (
    <div
      css={{
        position: 'absolute',
        bottom: 0,
        padding: '32px 16px',
        opacity: 0,
        width: '100%',
        transition: '0.2s ease-out',
        display: 'flex',
        justifyContent: 'flex-end',
        '&:hover': {
          opacity: 1,
        },
        button: {
          margin: '4px',
          fontSize: '16px',
          background: 'none',
          border: 'none',
          textDecoration: 'underline',
          fontWeight: 'bold',
          cursor: 'pointer',
        },
      }}
    >
      {children}
    </div>
  );
}
