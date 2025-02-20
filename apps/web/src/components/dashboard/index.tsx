import CreatorDashboardComponent from './creator/creator';
import EditorDashboardComponent from './editor/editor';

export default function DashboardComponent() {
    return (
        <>
            <div className="md:px-16 py-6">
                {/* <CreatorDashboardComponent /> */}
                <EditorDashboardComponent />
            </div>
        </>
    );
}
