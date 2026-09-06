import { SCIErrorMessage } from "./sci-error-message";

export function SCIForm(props: { title: string; children: any; onSubmit: React.FormEventHandler<HTMLFormElement>; errorMessage: string; errorMessageDetails: string | null; }) {
  const {
    title = "",
    children,
    onSubmit,
    errorMessage,
    errorMessageDetails
  } = props;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <div className="text-center" style={{ width: '100%', maxWidth: '400px' }}>
            <h1 className="text-4xl font-bold">{title}</h1>

            <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
                {children}
            </form>
            {errorMessage && <SCIErrorMessage errorMessage={errorMessage} errorMessageDetails={errorMessageDetails} />}
        </div>
    </div>
  )
}