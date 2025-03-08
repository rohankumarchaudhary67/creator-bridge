import PendingRequestComponent from './pending-request';
import YoutubeEnvironmentComponent from './youtube-environment';
import EditorRequestVideosDashboardComponent from './request-videos';
import EditorHeaderComponent from './editor-header';
import EditorDataComponent from './editor-data';

export default function EditorDashboardComponent({
    accessToken,
}: {
    accessToken: string;
}) {
    return (
        <>
            <div className="flex flex-col space-y-2">
                <EditorHeaderComponent />

                <EditorDataComponent accessToken={accessToken as string} />

                <PendingRequestComponent accessToken={accessToken as string} />

                <YoutubeEnvironmentComponent
                    accessToken={accessToken as string}
                />

                <EditorRequestVideosDashboardComponent
                    accessToken={accessToken as string}
                />
            </div>
        </>
    );
}
