// page example @ /sample
export const SamplePage = (props: { text?: string }) => {
    return <div>
        {`This is a sample page of ${props.text}`}
    </div>;
};