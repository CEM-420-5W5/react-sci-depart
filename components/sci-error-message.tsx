

function SCIErrorMessage(props: {errorMessage: string, errorMessageDetails: string | null}) {
  return (
    <div style={{
                marginTop: '24px',
                padding: '12px',
                backgroundColor: '#fee2e2',
                border: '1px solid #fca5a5',
                borderRadius: '6px',
                color: '#991b1b',
                fontWeight: '500',
                wordWrap: 'break-word',
                overflow: 'hidden',
              }}>
                <p style={{ margin: '0 0 8px 0' }}><b>{props.errorMessage}</b></p>
                {props.errorMessageDetails && <p style={{ margin: 0 }}>{props.errorMessageDetails}</p>}
              </div>
  )
}

export { SCIErrorMessage}
