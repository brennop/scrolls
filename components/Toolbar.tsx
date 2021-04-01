export default function Toolbar({ children }) {
  return (
    <div
      css={{
        position: 'absolute',
        bottom: '16px',
        right: 0,
        padding: '16px',
        opacity: 0,
        width: '50%',
        transition: '0.2s ease-out',
        display: 'flex',
        justifyContent: 'flex-end',
        '&:hover': {
          opacity: 1,
        },
        button: {
          margin: '8px',
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
