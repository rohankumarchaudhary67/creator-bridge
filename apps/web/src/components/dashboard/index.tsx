import CreatorDashboardComponent from './creator/creator';
import EditorDashboardComponent from './editor/editor';

export default function DashboardComponent() {
    return (
        <>
            <div className="2xl:px-72 md:px-36 px-6 py-6">
                <CreatorDashboardComponent />
                <EditorDashboardComponent />
            </div>
        </>
    );
}
